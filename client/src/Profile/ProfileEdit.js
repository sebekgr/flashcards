import React, { Component } from 'react';
import { Button, Card, Icon, Label, Form, Message, Select } from 'semantic-ui-react'
import { AppConsumer } from '../StateContext';
const names = [{ key: 'good', text: 'Good', color: 'green' }, { key: 'notBad', text: 'Not bad', color: 'blue' }, { key: 'bad', text: 'Bad', color: 'red' }]
const options = [
    { key: '3600', text: '1 h', value: '1 h' },
    { key: '86400', text: '1 day', value: '1 day' },
    { key: '604800', text: '1 week', value: '1 week' },
    { key: '2628000', text: '1 month', value: '1 month' },
    { key: '7884000', text: '3 months', value: '3 months' },
]

class ProfileEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            good: null,
            notBad: null,
            bad: null,
            notification: false
        }
    }

    componentWillReceiveProps({userVal}){
        const {good, notBad, bad} = userVal;
        if(userVal) {
            this.setState({good, notBad, bad})
        }
    }

    componentDidMount(){
        const {good, notBad, bad} = this.props.userVal;
        if(good) {
            this.setState({good, notBad, bad})
        }
    }

    renderRepetitions() {
        let elem = names.map(({text, key, color}) => {
            return(
                <div key={key}>
                    <Select className="profile-select-options" value={this.state[key]} onChange={(e) => this.handleChange(e, key)} options={options} />
                    <Label color={color}>{text}</Label>
                </div>
            )
        })

        return elem;
    }

    handleChange = (e, key) => {
        this.setState({ [key]: e })
    }

    handleSave = e => {
        e.preventDefault();
        this.setState({ notification: true })
        this.timeOut = setTimeout(() => this.setState({ notification: false }), 1500)
        const { good, notBad, bad } = this.state;
        this.props.handleUpdateRepetitionsFun({ good, notBad, bad});
    }

    render() {
        const { userVal } = this.props;
        const { notification } = this.state;
        return (
            <div className="profile-wrapper">
                <div className="profile-card">
                {notification ?
                             <Message positive>Your profile has been updated</Message>
                        : null}
                        <div className="profile-heading">
                            {userVal.username}
                            <Button floated="right" size="mini" basic color='red'>Delete account</Button>
                        </div>
                        <p>Repetitions settings <Icon name="setting" /></p>
                        <Form className="profile-form" onSubmit={e => this.handleSave(e)}>
                            {this.renderRepetitions(userVal)}
                            <Form.Button fluid color="green">Save</Form.Button>
                        </Form>
                </div>
            </div>
        )
    }
}

export default props => (
    <AppConsumer>
        {({ userVal, handleUpdateRepetitionsFun }) => <ProfileEdit {...props} handleUpdateRepetitionsFun={handleUpdateRepetitionsFun} userVal={userVal} />}
    </AppConsumer>
)