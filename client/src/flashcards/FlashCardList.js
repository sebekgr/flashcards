import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import FlashCard from './FlashCard';
import {AppConsumer} from '../StateContext';

class FlashCardList extends Component {

    render() {
        return (
            <AppConsumer>
                {({ flashCardsVal }) => (
                    <Card.Group>

                    {flashCardsVal.map( card => <FlashCard {...card} key={card._id} />).slice(0, 3)}


                    </Card.Group>
            )}</AppConsumer>
        )
    }

}







export default FlashCardList;