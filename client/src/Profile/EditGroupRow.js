import React, { Component } from 'react'
import { Input, Select,Checkbox, Table } from 'semantic-ui-react'

const statusData = [
    {key: 'Good', text: 'Good', value: 'Good'},
    {key: 'Not Bad', text: 'Not Bad', value: 'Not Bad'},
    {key: 'Bad', text: 'Bad', value: 'Bad'},
]

export default class EditGroupRow extends Component {

    state = {
        isEdit: false,
        status: '',
        original: '',
        translation: '',
        id: null
    }

    componentDidMount(){
        const { id, repetition, original, translation } = this.props;
        let status;
        if(repetition === 0) status = 'Good'
        if(repetition === 1) status = 'Not bad'
        if(repetition === 2) status = 'Bad'
        this.setState({id, status, original, translation});
        
    }

    handleEdit(id) {
        this.setState(prevState => ({ isEdit: !prevState.isEdit }))
    }

    handleChange(event, {name, value}) {
        this.setState({ [name]: value });
    }

    handleCancel = () => {
        this.setState(prevState => ({isEdit: !prevState.isEdit}))
    }


    renderEdit(id, status, original, translation){
        return (
            <Table.Row>
                
                <Table.Cell collapsing>
                    <Checkbox checked={this.state.isEdit} onClick={() => this.handleEdit(id)} toggle name={id} />
                </Table.Cell>
                <Table.Cell><Select onChange={(e, value) => this.handleChange(e, value)} name="status" placeholder={status} value={status} options={statusData} /></Table.Cell>
                <Table.Cell><Input onChange={(e, value) => this.handleChange(e, value)} size="tiny" type="text" name="original" required value={original} /></Table.Cell>
                <Table.Cell><Input onChange={(e, value) => this.handleChange(e, value)} size="tiny" type="text" name="translation" required value={translation} /></Table.Cell>
                
            </Table.Row>
        )
    }

    renderCancel(id, status, original, translation){
        return (
            <Table.Row>
                <Table.Cell collapsing>
                    <Checkbox onClick={() => this.handleEdit(id)} toggle name={id} />
                </Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>{original}</Table.Cell>
                <Table.Cell>{translation}</Table.Cell>
            </Table.Row>
        )
    }


    render() {
        const { id, status, original, translation } = this.state;
        const {isEdit} = this.state;
        return isEdit ? this.renderEdit(id, status, original, translation) : this.renderCancel(id, status, original, translation)

    }

}