import React, { Component, Fragment } from 'react';
import { Segment, Statistic, Header, Button, Label, Modal, Icon} from 'semantic-ui-react'
import {Link } from "react-router-dom";
import EditCategory from './EditCategory';
import {AppConsumer} from '../StateContext';

class Category extends Component {

    constructor(props){
        super(props)
        this.state = {
            isModalOpen: false,
            category: props.category,
            renderLearning: false,
            good: props.good,
            notBad: props.notBad,
            bad: props.bad,
            total: props.good + props.notBad + props.bad,
        }
    }

    handleStartLearning = () => {
        this.setState(prevState => ({ renderLearning: !prevState.renderLearning }))
        this.props.setCurrentGroupFun(this.state.category, true);
    }

    handleChoice = ({target}) => {
         this.props.updateChoiceFun(target.name)
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
        const {total, good, notBad, bad, isModalOpen } = this.state;
        return (
            <Fragment>
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
            </Fragment>
        )
    }
}

export default props => (
    <AppConsumer>
      {({setCurrentGroupFun, updateChoiceFun, resetCurrentGroupFun}) => <Category {...props} updateChoiceFun={updateChoiceFun} resetCurrentGroupFun={resetCurrentGroupFun} setCurrentGroupFun={setCurrentGroupFun}/>}
    </AppConsumer>
  )