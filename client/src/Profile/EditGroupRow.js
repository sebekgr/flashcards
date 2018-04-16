import React, { Component } from 'react'
import { Input, Select,Checkbox, Table } from 'semantic-ui-react'
import {AppConsumer} from '../StateContext';
const statusData = [
    {key: 'Good', text: 'Good', value: 'Good'},
    {key: 'Not Bad', text: 'Not Bad', value: 'Not Bad'},
    {key: 'Bad', text: 'Bad', value: 'Bad'},
]

class EditGroupRow extends Component {


        state = {
            isEdit: false,
            status: '',
            original: '',
            translation: '',
            _id: null
        }

    componentDidMount(){
        const { _id, repetition, original, translation } = this.props;
        let status;
        if(repetition === 0) status = 'Good'
        if(repetition === 1) status = 'Not bad'
        if(repetition === 2) status = 'Bad'
        this.setState({_id, status, original, translation});
       
    }

    handleEdit = () => {
        const {_id, isEdit, original, translation} = this.state
        const { original: originalProp, translation: translationProp, category, updateFlashCardFun} = this.props
        this.setState(prevState => ({ isEdit: !prevState.isEdit }))

        if(isEdit) {
            if(original !== originalProp || translation !== translationProp) {
                updateFlashCardFun({_id, original, translation, category})
            } else {
                console.log('wszystko to samo nie aktualizuje')
            }
        }
        


        
        // if(isEdit) {
        //     this.props.currentEdit({_id, status, original, translation})
        // }
        
    }

    handleChange(event, {name, value}) {
        this.setState({ [name]: value });
    }

    handleCancel = () => {
        this.setState(prevState => ({isEdit: !prevState.isEdit}))
    }



    renderEdit(_id, status, original, translation){
        return (
            <Table.Row>
                <Table.Cell collapsing>
                    <Checkbox checked={this.state.isEdit} onClick={this.handleEdit} toggle name={_id} />
                </Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell> <Input color="green" onChange={(e, value) => this.handleChange(e, value)} size="tiny" type="text" name="original" required value={original} /></Table.Cell>
                <Table.Cell><Input onChange={(e, value) => this.handleChange(e, value)} size="tiny" type="text" name="translation" required value={translation} /></Table.Cell>
                
            </Table.Row>
        )
    }

    renderCancel(_id, status, original, translation){
        return (
            <Table.Row>
                <Table.Cell collapsing>
                    <Checkbox onClick={this.handleEdit} toggle name={_id} />
                </Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                <Table.Cell>{original}</Table.Cell>
                <Table.Cell>{translation}</Table.Cell>
            </Table.Row>
        )
    }


    render() {
        const { _id, status, original, translation } = this.state;
        const {isEdit} = this.state;
        return isEdit ? this.renderEdit(_id, status, original, translation) : this.renderCancel(_id, status, original, translation)

    }

}

export default  EditGroupRow
