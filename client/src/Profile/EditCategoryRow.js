import React, { Component, Fragment } from 'react'
import { Input, Checkbox, Table } from 'semantic-ui-react'
class EditCategoryRow extends Component {

    constructor(props){
        super(props)
        this.state = {
            isEdit: false,
            original: props.original,
            translation: props.translation,
            _id: props._id
        }
    }

     handleEdit = () => {
         const {_id, isEdit, original, translation} = this.state
         const { original: originalProp, translation: translationProp, category, updateFlashCardFun} = this.props
         this.setState(prevState => ({ isEdit: !prevState.isEdit }))

         if(isEdit) {
             if(original !== originalProp || translation !== translationProp) {
                 updateFlashCardFun({_id, original, translation, category})
             } else {
                 return
             }
         }
    }

     handleChange(event, {name, value}) {
         this.setState({ [name]: value });
     }

     handleCancel = () => {
         this.setState(prevState => ({isEdit: !prevState.isEdit}))
     }

     renderEdit(original, translation){
            return (
                <Fragment>
                    <Table.Cell><Input fluid color="green" onChange={(e, value) => this.handleChange(e, value)} size="tiny" type="text" name="original" required value={original} /></Table.Cell>
                    <Table.Cell><Input fluid onChange={(e, value) => this.handleChange(e, value)} size="tiny" type="text" name="translation" required value={translation} /></Table.Cell>
                </Fragment>
         )
     }

    renderCancel(original, translation){
        return (
            <Fragment>
                <Table.Cell>{original}</Table.Cell>
                <Table.Cell>{translation}</Table.Cell>
            </Fragment>
        )
    }


    render() {
        const {isEdit, original, translation, _id} = this.state;
        const {repetition} = this.props;
        let status;
        if(repetition === 0) status = 'Good';
        if(repetition === 1) status = 'Not bad';
        if(repetition === 2) status = 'Bad';
        return (
            <Table.Row>
                <Table.Cell collapsing>
                <Checkbox onClick={this.handleEdit} toggle name={_id} />
                </Table.Cell>
                <Table.Cell>{status}</Table.Cell>
                {isEdit ? this.renderEdit(original, translation)  :  this.renderCancel(original, translation)}
            </Table.Row>
        )
    }

}

export default EditCategoryRow;