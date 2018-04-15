import { Button,  Icon,  Modal, Checkbox, Table } from 'semantic-ui-react'
import React, { Component } from 'react'
import EditGroupRow from './EditGroupRow'

const data = [
  { id: '435454453445', status: 'Good', original: 'Isc', translation: 'go' },
  { id: '435454653445', status: 'Good', original: 'Isc', translation: 'go' },
  { id: '43545t543445', status: 'Not bad', original: 'Isc', translation: 'go' },
  { id: '43545876543445', status: 'Good', original: 'Isc', translation: 'go' },
  { id: '43545434323445', status: 'Bad', original: 'Isc', translation: 'go' },
  { id: '4354543445', status: 'Bad', original: 'Isc', translation: 'go' }
]

const headers = ['Status', 'Original', 'Translation']




export default class EditGroup extends Component {



  render() {
    const {flashcards} = this.props
    const header = headers.map((name, i) => <Table.HeaderCell key={i}>{name}</Table.HeaderCell>);
    const rows = flashcards.map( (row,  i) => <EditGroupRow key={i} {...row}/>);
    return (
      <Modal size="fullscreen" defaultOpen={true} onClose={this.props.onClose}>
        <Modal.Header>Group name</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Table celled compact definition>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell><Checkbox onClick={() => this.handleCheckAll()} toggle name="checkall"/></Table.HeaderCell>
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
                    <Button disabled size='small'>Delete All</Button>
                    <Button size='small'>Edit</Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>

          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
