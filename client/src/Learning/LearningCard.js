import React, {Component, Fragment} from 'react';
import { AppConsumer } from '../StateContext';
import { Card,  Button, Form, Alert, Icon, Input } from 'antd'
import {Link} from 'react-router-dom';
import ChoiceGroup from './ChoiceGroup';
import StatusGroup from './StatusGroup';

class LearningComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            choice: props.choiceVal,
            index: 0,
            answer: '',
            isCorrect: false,
            isChecking: false,
            lastIndex: props.currentGroupVal.length,
            choiceAnswer: null,
            choiceShow: null,
        }
        this.random = ['translation', 'original'];

    }

    componentWillMount() {
        const {choiceVal} = this.props;
        if(choiceVal === 'original') {
            this.setState({choiceShow: 'original', choiceAnswer: 'translation'})
        } else if (choiceVal === 'translation') {
            this.setState({choiceShow: 'translation', choiceAnswer: 'original'})
        } else {
            this.setState({choiceShow: 'translation', choiceAnswer: 'original'})
        }
    }

    componentWillUnmount() {
        this.props.resetCurrentGroupFun();
    }

    handleChoice = ({target}) =>{
        this.setState({ choice: target.name })
        this.props.updateChoiceFun(target.name)
    }

    handleCheck = e =>{
        e.preventDefault();
        const { index, answer, choiceAnswer } = this.state;
        const { currentGroupVal } = this.props;
        const currentWord = currentGroupVal[index][choiceAnswer];
        const isCorrect = (currentWord.toLowerCase().replace(/\s/g, "") === answer.trim().toLowerCase().replace(/\s/g, ""))
        this.setState({isCorrect,  isChecking: true});
    }

    handleChange = ({target}) => {
        this.setState({answer: target.value})
    }

    setStatus = ({target}) => {
        const { updateStatusFlashCardFun, currentGroupVal} = this.props;
        const { index, choice} = this.state;
        updateStatusFlashCardFun(currentGroupVal[index]._id, target.name)
        if(choice === 'random') {
            let randomIndex = Math.round(Math.random());
            let setToShow = this.random[randomIndex];
            let setToAnswer =  randomIndex !== 0 ? this.random[0] : this.random[1];
            this.setState(prevState => ({index: prevState.index + 1, answer: '', isChecking:false, isCorrect:false, choiceShow: setToShow, choiceAnswer: setToAnswer}));
        } else {
            this.setState(prevState => ({index: prevState.index + 1, answer: '', isChecking:false, isCorrect:false}));
        }  
    }

    renderAnswer(){
       return this.state.isCorrect ?  <Alert message="Correct :)" type="success" showIcon /> : <Alert message="Wrong !" type="error" showIcon />;
    }

    renderStart(){
        const {index, choice, answer, isChecking, choiceAnswer, choiceShow} = this.state;
        const {currentGroupVal} = this.props;
        return (
            <Fragment>
                {isChecking ? <span className="correct-answer">{currentGroupVal[index][choiceAnswer]}</span> : null}
                {!isChecking ? <h2>{currentGroupVal[index][choiceShow]}</h2> : null }
                <Form autoComplete="off" onSubmit={this.handleCheck} onChange={this.handleChange}>
                    <Form.Item>
                        <Input disabled={isChecking}  autoComplete="off" prefix={<Icon type="edit" />} value={answer} placeholder="Provide answer" />
                    </Form.Item>
                    {isChecking ? this.renderAnswer() : null}
                    {!isChecking ? <Form.Item><Button type="primary" htmlType="submit">Check</Button></Form.Item> : null}
                </Form>
                {isChecking ? <Card.Meta className="learning-meta" title="Set status" description={<StatusGroup setStatus={this.setStatus}/>} /> : null}
               <Card.Meta  className="learning-meta" title="Display: " description={<ChoiceGroup active={choice} handleChoice={this.handleChoice}/>} />
            </Fragment>
        )
    }

    renderFinish() {
        return (
            <Fragment>
                <h3> No more flashcard for today </h3>
                <Link to="/profile">Take me back</Link>
            </Fragment>
        )
    }

    render(){
        const {index, lastIndex} = this.state;
        const {currentGroupVal} = this.props;
        return(
            <div>
                <Card className="learning-card">
                    {(index === lastIndex || currentGroupVal.length === 0) ? this.renderFinish() : this.renderStart()}
                </Card>
            </div>
        )
    }
}

export default () => (
    <AppConsumer>
        {({ updateStatusFlashCardFun, currentGroupVal, choiceVal, updateChoiceFun, resetCurrentGroupFun }) => (
            
            <LearningComponent
                updateChoiceFun={updateChoiceFun}
                choiceVal={choiceVal}
                currentGroupVal={currentGroupVal}
                updateStatusFlashCardFun={updateStatusFlashCardFun}
                resetCurrentGroupFun={resetCurrentGroupFun}
        />)}
    </AppConsumer>
)

/*
import React, { Component, Fragment } from 'react';
import { Card,  Button, Form, Alert } from 'antd'
import { AppConsumer } from '../StateContext';
const ButtonGroup = Button.Group;

class LearningCard extends Component {

    state = {
        currentIndex: 0,
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
        return result ? <Alert message="Correct" type="success" showIcon /> : <Alert message="Wrong" type="error" showIcon />
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
                <div textAlign="center">
                    <h3 style={{ margin: '30px' }}>There is no more flashcards in this group</h3>
                </div>

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
*/