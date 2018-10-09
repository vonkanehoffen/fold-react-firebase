import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import styled from 'styled-components'
import TextInput from '../components/TextInput'
import Tag from '../components/Tag'
import CircularProgress from '@material-ui/core/CircularProgress'
import { db } from '../firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import colors from '../colors'

// See https://material-ui-next.com/demos/autocomplete/

const renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) =>
  <SuggestionTag
    {...itemProps}
    key={suggestion}
    isHighlighted={highlightedIndex === index}
    isSelected={(selectedItem || '').indexOf(suggestion) > -1}>
    {suggestion}
  </SuggestionTag>

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
    if((keycode(event) === 'space' || keycode(event) === 'tab') && inputValue.trim().length > 0) {
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
    const { selectedTags } = this.props;
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
          <div style={{display: 'flex', width: '100%', position: 'relative', alignItems: 'center'}}>
            {selectedTags.map(item => (
              <Tag
                key={item}
                tabIndex={-1}
                onClick={this.handleDelete(item)}
                removeIcon
              >{item}</Tag>
            ))}
            <div style={{flex: 1}}>
              <TextInput {...getInputProps({
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
              })}/>
              {isOpen ? (
                <Suggestions>
                  {getSuggestions(inputValue, userTags).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem,
                    }),
                  )}
                </Suggestions>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>
    )
  }
}

const Suggestions = styled.div`
  background: ${colors.primary};
  z-index: 2;
  position: absolute;
  top: 2rem;
  box-shadow: 0 5px 20px rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
`

const SuggestionTag = styled.div`
  background: none;
  padding: .5rem 1rem;
  cursor: pointer;
  text-transform: capitalize;
  ${props => props.isHighlighted && `
    color: ${colors.primary};
    background: black;
  `}
  ${props => props.isSelected && `font-weight:bold;`}
`

TagSelect.propTypes = {
  setTags: PropTypes.func.isRequired,
  selectedTags: PropTypes.array.isRequired,
};

export default TagSelect
