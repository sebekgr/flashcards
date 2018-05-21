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
            <div className="learning-wrapper">
                <Card className="learning-card" extra={<Link to="/profile"> X </Link>} >
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