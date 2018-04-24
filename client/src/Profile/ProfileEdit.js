import React, { Component } from 'react';
import { Button, Card, Icon, Label, Form, Message } from 'semantic-ui-react'
import { AppConsumer } from '../StateContext';
import { Select } from 'antd';
const Option = Select.Option;
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
                <div key={key} style={{display: 'grid', gridTemplateColumns: '1fr 50px', gridGap: '10px'}}>
                    <Select value={this.state[key]} onChange={(e) => this.handleChange(e, key)}>
                        {options.map(({value}) => <Option key={value} value={value}>{value}</Option>)}
                    </Select>
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
                            {this.renderRepetitions(userVal)}
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