import React, { Component, Fragment } from 'react';
import { Segment, Statistic, Header, Button, Label, Modal, Icon} from 'semantic-ui-react'
import {Link } from "react-router-dom";
import EditGroup from './EditGroup';
import {AppConsumer} from '../StateContext';

class Category extends Component {

    state = {
        renderEdit: false,
        category: '',
        renderLearning: false,
        
    }

    componentDidMount() {
        const { category } = this.props;
        this.setState({ category })
    }

    handleRenderEdit = () => {
        this.setState(prevState => ({ renderEdit: !prevState.renderEdit }))
    }

    handleStartLearning = () => {
        this.setState(prevState => ({ renderLearning: !prevState.renderLearning }))
    }

    handleChoice = ({target}, setCurrentGroupFun) => {
        
        this.props.setCurrentGroupFun(this.state.category, target.name)
    }


    render() {
        const { good, notBad, bad, flashcards } = this.props;
        let total = good + notBad + bad;
        return (
            <Fragment>
                {this.state.renderEdit ? <EditGroup onClose={this.handleRenderEdit} flashcards={flashcards} /> : null}
                <Segment className="flashcardgroup" inverted compact>
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
                        <Button onClick={this.handleRenderEdit} inverted color="blue">Edit this group</Button>
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
                </Segment>
            </Fragment>
        )
    }
}

export default props => (
    <AppConsumer>
      {({setCurrentGroupFun}) => <Category {...props} setCurrentGroupFun={setCurrentGroupFun}/>}
    </AppConsumer>
  )