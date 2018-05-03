import React,{Component} from 'react';
import FlashCard from './FlashCard';
import {Input, Row, Col} from 'antd';
import { AppConsumer } from '../StateContext';
import {gridConfigContent} from '../gridConfigContent';
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
        const {flashCardsVal} = this.props;
        if(this.state.searchText.length < 3) {
            this.setState({searchText: target.value});
        } else {
            let found = flashCardsVal.filter(flashcard => flashcard.original.toLowerCase().includes(target.value.toLowerCase()) || flashcard.translation.toLowerCase().includes(target.value.toLowerCase()));
            this.setState({searchText: target.value, filtered: found});
        }        
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
            <Row className="row-main-wrapper">
                <Col {...gridConfigContent}>
                <label htmlFor="search-input">At least 3 characters</label>
                <Search style={{margin: '10px auto'}} id="search-input"
                    onChange={this.handleChange}
                    placeholder="Search flashcards"
                    enterButton
                    value={searchText}
                    />
                    {this.renderResults(searchText, filtered)}
                </Col>
            </Row>
        )
    }
}

export default props => (
    <AppConsumer>
      {({flashCardsVal}) => <SearchFlashcards flashCardsVal={flashCardsVal}/>}
    </AppConsumer>
  )