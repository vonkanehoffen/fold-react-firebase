import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress'
import { db } from '../firebase'
import firebase from 'firebase'

// See https://material-ui-next.com/demos/autocomplete/

const renderInput = (inputProps) => {
  const { InputProps, classes, ref, ...other } = inputProps;
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

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
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedTags.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: 'Select tags',
              }),
            })}
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

TagSelect.propTypes = {
  setTags: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    textTransform: 'capitalize',
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

export default withStyles(styles)(TagSelect);
