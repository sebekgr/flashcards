import React, {Component} from 'react';
import {  Progress, Row, Col } from 'antd';
import { AppConsumer } from '../StateContext';
import FlashCard from '../flashcards/FlashCard';
import StatsBox from './StatsBox';
import {gridConfig} from '../gridConfig';



class Stats extends Component {
    constructor(props){
        super(props);
        this.state = {
            bad: 0,
            notBad: 0,
            good: 0,
            total: 0,
            goodPercent: 0,
            badPercent: 0,
            notBadPercent: 0

        }
    }

    componentWillReceiveProps({flashCardsVal}) {
        const good = flashCardsVal.filter(flashCard => flashCard.repetition === 0).length;
        const notBad = flashCardsVal.filter(flashCard => flashCard.repetition === 1).length;
        const bad = flashCardsVal.filter(flashCard => flashCard.repetition === 2).length;
        const total = flashCardsVal.length
        const goodPercent = Math.trunc(good * 100 / total);
        const badPercent = Math.trunc(bad * 100 / total);
        const notBadPercent = Math.trunc(notBad * 100 / total);
        this.setState({goodPercent, badPercent, notBadPercent, good, bad, notBad});
    }

    componentWillMount() {
        const {flashCardsVal} = this.props;
        const good = flashCardsVal.filter(flashCard => flashCard.repetition === 0).length;
        const notBad = flashCardsVal.filter(flashCard => flashCard.repetition === 1).length;
        const bad = flashCardsVal.filter(flashCard => flashCard.repetition === 2).length;
        const total = flashCardsVal.length
        const goodPercent = Math.trunc(good * 100 / total);
        const badPercent = Math.trunc(bad * 100 / total);
        const notBadPercent = Math.trunc(notBad * 100 / total);
        this.setState({goodPercent, badPercent, notBadPercent, good, bad, notBad});
    }

    render() {
        const {goodPercent, notBadPercent, badPercent, good, bad, notBad} = this.state;
        return (
            <Row className="row-main-wrapper">
                <Col  {...gridConfig}>
                <h3 style={{textAlign: 'center'}}>Total flashcards progress:</h3>
                <div className="stats-group">
                <StatsBox nr={good} percent={goodPercent} status="success"/>
                <StatsBox nr={notBad} percent={notBadPercent} status="active"/>
                <StatsBox nr={bad} percent={badPercent} status="exception"/>
                </div>
                </Col>
            </Row>
        )
    }
}

export default props => (
    <AppConsumer>
      {({flashCardsVal}) => <Stats {...props} flashCardsVal={flashCardsVal} />}
    </AppConsumer>
  )