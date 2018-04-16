import React, { Component } from 'react';
import { Button, Card, Icon, Label, Form, Message } from 'semantic-ui-react'
import { AppConsumer } from '../StateContext';
const names = [{ key: 'good', text: 'Good', color: 'green' }, { key: 'notBad', text: 'Not bad', color: 'blue' }, { key: 'bad', text: 'Bad', color: 'red' }]
const options = [
    { key: '1 h', text: '1 h', value: '1 h' },
    { key: '1 day', text: '1 day', value: '1 day' },
    { key: '1 week', text: '1 week', value: '1 week' },
    { key: '1 month', text: '1 month', value: '1 month' },
    { key: '3 month', text: '3 month', value: '3 month' },
]

class ProfileEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            good: props.userVal.good,
            notBad: props.userVal.notBad,
            bad: props.userVal.bad,
            notification: false
        }
    }

    renderRepetitions() {
        return names.map(({ text, color, key }) => {
            return (
                <div key={key} style={{ display: 'flex' }}>
                    <Form.Select value={this.state[key]} name={key} onChange={this.handleChange} placeholder='Select interval' options={options} />
                    <Label color={color}>{text}</Label>
                </div>
            )

        })
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
    }

    handleSave = e => {
        e.preventDefault();
        this.setState({ notification: true })
        this.timeOut = setTimeout(() => this.setState({ notification: false }), 1500)
        const { good, notBad, bad } = this.state;
        this.props.handleUpdateRepetitionsFun({ good, notBad, bad });
    }

    render() {
        const { userVal } = this.props;
        const { notification } = this.state;
        return (
            <div style={{ display: 'flex' }}>

                <Card style={{ margin: 'auto' }}>
                    {notification ?
                        <Card.Header>
                             <Message positive>Your profile has been updated</Message>
                        </Card.Header>
                        : null}
                    <Card.Content>
                        <Button floated="right" size="mini" basic color='red'>Delete account</Button>
                        <Card.Header>
                            {userVal.username}
                        </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            Repetitions settings <Icon name="setting" />
                        </Card.Description>
                        <Form onSubmit={e => this.handleSave(e)}>
                            {this.renderRepetitions()}
                            <Form.Button fluid color="green">Save</Form.Button>
                        </Form>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default props => (
    <AppConsumer>
        {({ userVal, handleUpdateRepetitionsFun }) => <ProfileEdit {...props} handleUpdateRepetitionsFun={handleUpdateRepetitionsFun} userVal={userVal} />}
    </AppConsumer>
)