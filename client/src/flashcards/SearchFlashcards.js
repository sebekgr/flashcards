import React,{Component} from 'react';
import FlashCard from './FlashCard';
import {Form, Input} from 'antd';
import { AppConsumer } from '../StateContext';
const Search = Input.Search;

class SearchFlashcards extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: null,
            filtered: []
        }
    }

    handleChange = ({target}) => {
        const {filtered, searchText} = this.state;
        const {flashCardsVal} = this.props;
        let found = flashCardsVal.filter(flashcard => flashcard.original.toLowerCase().includes(target.value.toLowerCase()) || flashcard.translation.toLowerCase().includes(target.value.toLowerCase()));
        this.setState({searchText: target.value, filtered: found});
        if(target.value === '') {
            this.setState({filtered: [], searchText: null})
        }
    }

    renderResults = (searchText, filtered) => {
        return this.state.filtered.map(flaschcard => <FlashCard delete={this.isDelete} text={searchText} key={flaschcard._id} {...flaschcard}/>);
    }

    isDelete = id => {
        const deleteFlashcard = this.state.filtered.filter(flashcard => flashcard._id !== id);
        this.setState({filtered: deleteFlashcard});
    }

    render(){
        const {searchText, filtered} = this.state;
        return (
            <div>
                <Search
                    onChange={this.handleChange}
                    placeholder="Search flashcards"
                    enterButton
                    value={searchText}
                    />
                    {this.renderResults(searchText, filtered)}
            </div>
        )
    }
}

export default props => (
    <AppConsumer>
      {({flashCardsVal}) => <SearchFlashcards flashCardsVal={flashCardsVal}/>}
    </AppConsumer>
  )