import React, {Component, Fragment} from 'react';
import { List, Segment  } from 'semantic-ui-react'
import Category from './Category';
import {AppConsumer} from '../StateContext';

class Categorylist extends Component {
    

    render(){



        //zobacz categorie jakie sa
        //oblicz dla kazde statystyki
        //renderuj

        //jesli start learning.. pobierz wszystkie fiszki dla danej kategorii
        //jesli edit pobierz wszystkie fiszki dla danej kategrii jako current group


        const {flashCardsVal, categoryVal} = this.props;
        let categoryGroup = categoryVal.map((cat, i) => {
        let flashcards = flashCardsVal.filter(flashcard => flashcard.category ===  cat.value)
        let good = flashcards.filter(bad => bad.repetition === 0).length;
        let notBad = flashcards.filter(bad => bad.repetition === 1).length;
        let bad = flashcards.filter(bad => bad.repetition === 2).length;
            return <List.Item key={i}><Category good={good} bad={bad} notBad={notBad} category={cat.value} flashcards={flashcards}/></List.Item>
        }) 
       
        return (
            <Fragment>
                <List.Item>
                    <Segment>
                    <h3>Your flashcards lessons</h3>
                        <List selection horizontal>
                            
                                {categoryGroup.reverse()}
                            
                         </List>
                </Segment>
               </List.Item>
               </Fragment>
        )
    }
}

export default props => (
    <AppConsumer>
      {({flashCardsVal, categoryVal}) => <Categorylist {...props} categoryVal={categoryVal} flashCardsVal={flashCardsVal}/>}
    </AppConsumer>
  )