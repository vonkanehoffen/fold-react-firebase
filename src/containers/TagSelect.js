import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextInput from '../components/TextInput'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Tag from '../components/Tag'
import CircularProgress from '@material-ui/core/CircularProgress'
import { db } from '../firebase'
import firebase from 'firebase'

// See https://material-ui-next.com/demos/autocomplete/

const renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400, textTransform: 'capitalize'
      }}
    >
      {suggestion}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

const getSuggestions = (inputValue, suggestions) => {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.toLowerCase().indexOf(inputValue.toLowerCase().trim()) !== -1) &&
      count < 5;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class TagSelect extends React.Component {

  static propTypes = {
    selectedTags: PropTypes.array.isRequired,
    setTags: PropTypes.func.isRequired,
  }

  state = {
    inputValue: '',
    loading: true,
    userTags: [],
  }

  componentDidMount() {
    this.unsubscribe = db.collection('userTags').doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      this.setState({
        loading: false,
        userTags: doc.data() ? doc.data().tags : []
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleKeyDown = event => {
    const { inputValue } = this.state
    const { selectedTags, setTags } = this.props

    // Remove last entered tag if backspace is pressed:
    if (selectedTags.length && !inputValue.length && keycode(event) === 'backspace') {
      setTags(selectedTags.slice(0, selectedTags.length - 1))
    }

    // If space is pressed, add whatever we have as a new tag
    if(keycode(event) === 'space' && inputValue.trim().length > 0) {
      setTags([...selectedTags, inputValue.trim().toLowerCase()])
      this.setState({inputValue: ''})
      event.preventDefault()
    }
  }

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedTags } = this.props

    if (selectedTags.indexOf(item) === -1) {
      selectedTags = [...selectedTags, item];
    }

    this.setState({
      inputValue: '',
    });
    this.props.setTags(selectedTags)
  };

  handleDelete = item => () => {
    const selectedTags = [...this.props.selectedTags];
    selectedTags.splice(selectedTags.indexOf(item), 1);
    this.props.setTags(selectedTags)
  };

  render() {
    const { classes, selectedTags } = this.props;
    const { inputValue, loading, userTags } = this.state;

    if(loading) return (
      <CircularProgress/>
    )

    // TODO: Error condition

    return (
      <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedTags}>
        {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex,
          }) => (
          <div style={{display: 'flex'}}>
            {selectedTags.map(item => (
            <Tag
              key={item}
              tabIndex={-1}
              remove={this.handleDelete(item)}
            >{item}</Tag>
            ))}
            <TextInput {...getInputProps({
              onChange: this.handleInputChange,
              onKeyDown: this.handleKeyDown,
            })}/>
            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue, userTags).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion }),
                    highlightedIndex,
                    selectedItem,
                  }),
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

const Container = styled.div`
  display: flex;
`

TagSelect.propTypes = {
  setTags: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});

export default withStyles(styles)(TagSelect);
