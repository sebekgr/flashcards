import { Button,  Modal, Checkbox, Table } from 'semantic-ui-react'
import React, { Component, Fragment } from 'react'
import EditCategoryRow from './EditCategoryRow'
import {AppConsumer} from '../StateContext';
const headers = ['Status', 'Original', 'Translation']

class EditCategory extends Component {

  render() {
    const { currentGroupVal, resetCurrentGroupFun, updateFlashCardFun} = this.props
      const header = headers.map((name, i) => <Table.HeaderCell key={i}>{name}</Table.HeaderCell>);
      const rows = currentGroupVal.map( (row,  i) => {
      return <EditCategoryRow updateFlashCardFun={updateFlashCardFun} key={i} {...row}/>});
    return (
      <Fragment>
      <Modal size="fullscreen" open={this.props.modalOpen} onClose={resetCurrentGroupFun}>
        <Button onClick={this.props.onClose}>Close</Button>
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
      </Fragment>
    )
  }
}


export default props => (
  <AppConsumer>
    {({currentGroupVal, updateFlashCardFun}) => <EditCategory {...props} updateFlashCardFun={updateFlashCardFun}  currentGroupVal={currentGroupVal}/>}
  </AppConsumer>
)