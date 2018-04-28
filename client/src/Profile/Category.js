import React, { Component, Fragment } from 'react';
import {Link } from "react-router-dom";
import EditCategory from './EditCategory';
import {AppConsumer} from '../StateContext';
import { Card, Icon, Modal, Button } from 'antd';
const { Meta } = Card;
const ButtonGroup = Button.Group;

class Category extends Component {

    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false,
            renderLearning: false,
            category: [],
            flashcards: [],
       }
    }

    componentWillMount(){
            const flash = this.props.flashCardsVal.filter(flashcard => flashcard.category ===  this.props.category)
            const good = flash.filter(bad => bad.repetition === 0).length;
            const notBad = flash.filter(notBad => notBad.repetition === 1).length;
            const bad = flash.filter(bad => bad.repetition === 2).length;
            const category = ({ key: this.props.category, value: this.props.category, good, notBad, bad, total: good + notBad + bad });
            this.setState({category, flashcards: flash});
    }

    handleStartLearning = () => {
      
        this.setState(prevState => ({ renderLearning: !prevState.renderLearning }))
        
    }
    handleChoice = ({target}) => {
         this.props.updateChoiceFun(target.name);
         this.props.setCurrentGroupFun(this.props.category, true);
    }

    handleEditGroup = () =>{
        this.props.setCurrentGroupFun(this.props.category);
        this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))
    }

    handleCloseModal = () =>{
        this.setState({isModalOpen: false})
        this.props.resetCurrentGroupFun()
    }
    render() {
        
        const {total, bad, notBad, value, good} = this.props;
        const {isModalOpen, category, renderLearning } = this.state;
        return (
            <Fragment>
                {renderLearning ? <Modal
                    wrapClassName="vertical-center-modal"
                    visible={true}
                    onCancel={this.handleStartLearning}
                    footer={null}
                    >
                    <h3>How to display flashcards ?</h3>
                    <ButtonGroup onClick={e=>this.handleChoice(e)}>
                        <Link to="/learning"><Button name="original">by Original</Button></Link>
                        <Link to="/learning"><Button name="translaton">by Translation</Button></Link>
                        <Link to="/learning"><Button name="random">by Random</Button></Link>
                    </ButtonGroup>
                </Modal> : null}
                
               { isModalOpen ? <EditCategory onCancel={this.handleCloseModal}/> : null }
                
               <Card
                 title={category.value}
                actions={[<span onClick={this.handleEditGroup}>Edit  <Icon type="edit" /></span>, <span onClick={this.handleStartLearning}>Start  <Icon type="play-circle-o" /></span>]}
                 extra={`total ${category.total}`}
                 style={{color: '#000'}}
                 >
                 <div className="stats-wrapper">
                    <div className="stats-box good">
                            <label>{category.good}</label>
                            <p>Good</p>
                    </div>
                    <div className="stats-box notbad">
                            <label>{category.notBad}</label>
                            <p>Not bad</p>
                    </div>
                    <div className="stats-box bad">
                            <label>{category.bad}</label>
                            <p>Bad</p>
                    </div>
                </div>
                 
                 </Card>
            </Fragment>
        )
    }
}

export default props => (
    <AppConsumer>
      {({setCurrentGroupFun, updateChoiceFun, flashCardsVal,  resetCurrentGroupFun, currentGroupVal}) => <Category  flashCardsVal={flashCardsVal} currentGroupVal={currentGroupVal} {...props} updateChoiceFun={updateChoiceFun} resetCurrentGroupFun={resetCurrentGroupFun} setCurrentGroupFun={setCurrentGroupFun}/>}
    </AppConsumer>
  )

  /**
<EditCategory reset={this.props.resetCurrentGroupFun} modalOpen={isModalOpen} onClose={this.handleCloseModal} />
                    <Label color="teal" attached='top left'>{this.state.category}</Label>
                    <Segment inverted>
                        <Statistic inverted size="small">
                            <Statistic.Value>{total}</Statistic.Value>
                            <Statistic.Label>Total</Statistic.Label>
                        </Statistic>
                        <Statistic color='green' inverted size="tiny">
                            <Statistic.Value>{good}</Statistic.Value>
                            <Statistic.Label>Good</Statistic.Label>
                        </Statistic>
                        <Statistic color='blue' inverted size="tiny">
                            <Statistic.Value>{notBad}</Statistic.Value>
                            <Statistic.Label>Not bad</Statistic.Label>
                        </Statistic>
                        <Statistic color='red' inverted size="tiny">
                            <Statistic.Value>{bad}</Statistic.Value>
                            <Statistic.Label>Bad</Statistic.Label>
                        </Statistic>
                    </Segment>
                    <Segment inverted compact>
                        <Button onClick={this.handleEditGroup} inverted color="blue">Edit this group</Button>
                        <Modal
                            trigger={<Button color='green' inverted onClick={this.handleStartLearning}>Start learning</Button>}
                            open={this.state.renderLearning}
                            basic
                            size='small'
                        >
                            <Header icon='browser' content='Displaying flashcards:' />
                            <Modal.Content>
                            <Button.Group onClick={e=>this.handleChoice(e)}>
                                <Link to="/learning"><Button basic inverted name="original">Original</Button></Link>
                                <Link to="/learning"><Button basic inverted name="translation">Translation</Button></Link>
                                <Link to="/learning"><Button basic inverted name="random">Random</Button></Link>
                            </Button.Group>
                            </Modal.Content>
                            <Modal.Actions>
                            <Button color='red' onClick={this.handleStartLearning} inverted>
                                <Icon name='cancel' /> Cancel
                            </Button>
                            </Modal.Actions>
                         </Modal>

                    </Segment>
   */