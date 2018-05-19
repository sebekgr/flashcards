import React, { Component, Fragment } from 'react';
import { Card,  Button, Form, Message, Input } from 'semantic-ui-react'
import { AppConsumer } from '../StateContext';


class LearningCard extends Component {

    state = {
        currentIndex: 0,
        showTip: false,
        lastIndex: 0,
        answer: '',
        renderResult: false,
        disableCheck: false,
        result: false,
    }

    componentDidMount() {
        const { currentGroupVal } = this.props;
        this.setState({ lastIndex: currentGroupVal.length })
    }

    componentWillUnmount() {
        this.props.resetCurrentGroupFun();
    }

    handleShowTip = (e, { checked }) => {
        this.setState({ checked })
    }

    handleChoice = ({ target }) => {
        this.setState({ choice: target.name })
        this.props.updateChoiceFun(target.name);
    }


    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleAnswer = (e) => {
        e.preventDefault();
        const { currentIndex, answer } = this.state;
        const { currentGroupVal, choiceVal } = this.props;
        const choice = choiceVal === 'original' ? 'translation' : 'original'
        const currentWord = currentGroupVal[currentIndex][choice];

        if (currentWord.toLowerCase().replace(/\s/g, "") === answer.trim().toLowerCase().replace(/\s/g, "")) {
            this.setState({result: true})

        } else {
            this.setState({result: false})
        }

        this.setState(prevState => ({ renderResult: !prevState.renderResult, disableCheck: true }))

    }

    handleNext = ({target}) => {
        const { currentIndex} = this.state;
        const {currentGroupVal, updateStatusFlashCardFun} = this.props
        updateStatusFlashCardFun(currentGroupVal[currentIndex]._id, target.name)
        this.setState(prevState => ({currentIndex: prevState.currentIndex + 1, answer: '', renderResult:false, disableCheck:false}))
    }

    isCorrect(){
        const {result} = this.state;
        return result ? <Message color='green'>Correct</Message> : <Message color='red'>Incorrect</Message>
    }


    renderResult = () => {
        return (
            <Fragment>
                <Button.Group toggle onClick={this.handleNext}>
                    <Button name="0" color="green">Good</Button>
                    <Button name="1" color="blue">Not bad</Button>
                    <Button name="2" color="red">Bad</Button>
                </Button.Group>
            </Fragment>
        )
    }

    renderStart = (choice) => {
        const { currentIndex,  renderResult, disableCheck } = this.state;
        const { currentGroupVal, choiceVal } = this.props;
        return (
            <Fragment>
                <Card.Content textAlign="center" extra>
                {renderResult ? this.isCorrect() : null}
                    <h2 style={{ margin: '20px auto', color: 'black' }}>{currentGroupVal[currentIndex][choiceVal]}</h2>
                    {renderResult ? <h1 style={{ fontSize: '36px', color: 'black' }}>{currentGroupVal[currentIndex][choice]}</h1> : null}
                    <Form autoComplete="off" onSubmit={e => this.handleAnswer(e)} onChange={this.handleChange}>
                            <Form.Input autoComplete="off" disabled={disableCheck} value={this.state.answer} name="answer" placeholder='Provide answer' />
                            <Form.Button disabled={disableCheck}>Check</Form.Button>
                    </Form>
                </Card.Content>
                <Card.Content textAlign="center">
                    {renderResult ? this.renderResult() : null}
                </Card.Content>
                <Card.Content textAlign="center" extra>
                    <Button.Group toggle onClick={e => this.handleChoice(e)}>
                        <Button disabled={choiceVal === 'original'} name="original">Original</Button>
                        <Button disabled={choiceVal === 'translation'} name="translation">Translation</Button>
                        <Button disabled={choiceVal === 'random'} name="random">Random</Button>
                    </Button.Group>
                </Card.Content>
            </Fragment>
        )
    }

    renderFinish = () => {
        return (
            <Fragment>
                <Card.Content textAlign="center" extra>
                    <h3 style={{ margin: '30px' }}>There is no more flashcards in this group</h3>
                </Card.Content>

            </Fragment>
        )
    }

    render() {
        const { currentIndex, lastIndex } = this.state;
        const { currentGroupVal, choiceVal } = this.props;
        const choice = choiceVal === 'original' ? 'translation' : 'original'
        // //  ? window.location.pathname = '/profile' : null;
        return (
            <Card centered style={{ width: '400px' }}>
                {(currentIndex === lastIndex || currentGroupVal.length === 0) ? this.renderFinish() : this.renderStart(choice)}
            </Card>
        )
    }
}
export default () => (
    <AppConsumer>
        {({ updateStatusFlashCardFun, currentGroupVal, choiceVal, updateChoiceFun, resetCurrentGroupFun }) => (
            
            <LearningCard
                updateChoiceFun={updateChoiceFun}
                choiceVal={choiceVal}
                currentGroupVal={currentGroupVal}
                updateStatusFlashCardFun={updateStatusFlashCardFun}
                resetCurrentGroupFun={resetCurrentGroupFun}
        />)}
    </AppConsumer>
)