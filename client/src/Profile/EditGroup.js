import { Button,  Icon,  Modal, Checkbox, Table } from 'semantic-ui-react'
import React, { Component } from 'react'
import EditGroupRow from './EditGroupRow'
import {AppConsumer} from '../StateContext';
const headers = ['Status', 'Original', 'Translation']

class EditGroup extends Component {

  render() {
    const {flashcards, updateFlashCardFun} = this.props
    const header = headers.map((name, i) => <Table.HeaderCell key={i}>{name}</Table.HeaderCell>);
    const rows = flashcards.map( (row,  i) => <EditGroupRow updateFlashCardFun={updateFlashCardFun} key={i} {...row}/>);
    return (
      <Modal size="fullscreen" defaultOpen={true} onClose={this.props.onClose}>
        <Modal.Header>Group name</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Table celled compact definition>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell><Checkbox toggle name="checkall"/></Table.HeaderCell>
                  {header}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                    {rows}
              </Table.Body>

              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell colSpan='4'>
                    <Button size='small'>Delete selected</Button>
                    <Button onClick={this.handleEdit} size='small'>Save All</Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>

          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}


export default props => (
  <AppConsumer>
    {({updateFlashCardFun}) => <EditGroup {...props} updateFlashCardFun={updateFlashCardFun}/>}
  </AppConsumer>
)