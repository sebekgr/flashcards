import { Button, Modal} from 'semantic-ui-react'
import React, { Component, Fragment } from 'react'
import { AppConsumer } from '../StateContext';
import { Table, Popconfirm, Select, Input  } from 'antd';
const Option = Select.Option;
const EditableCell = ({ editable, value, onChange }) => {
  return (
    <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
  )
}

const EditableCellSelect = ({ editable, value, categories, onChange }) => {
  return (
    <div>
    {editable
      ? <Select style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e)}>
          {categories.map(({key, value}) => <Option key={key} value={value}>{value}</Option>)}
        </Select>
      : value
    }
  </div>
  )
}

class EditCategory extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.currentGroupVal,
      filtered: false,
      searchText: '',
      filteredData: this.props.currentGroupVal,
    }
    this.cacheData = this.state.data.map(item => ({ ...item }));

    this.columns = [{
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
      onFilter: (title, record) => record.status.indexOf(title) === 0,
      sorter: (a, b) => a.status.length - b.status.length,
    }, {
      title: 'Category',
      dataIndex: 'category',
      render: (text, record) => this.renderCategory(text, record, 'category'),
      width: '20%'
    },
    
    {
      title: 'Original',
      dataIndex: 'original',
      render: (text, record) => this.renderColumns(text, record, 'original'),
      width: '20%',
      key: 'original'      
    },
    {
      title: 'Translation',
      dataIndex: 'translation',
      render: (text, record) => this.renderColumns(text, record, 'translation'),
      width: '20%'
    }, {
      title: 'Operation',
      dataIndex: 'operation',
      width: '20%',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>Save</a>
                  <a onClick={() => this.cancel(record.key)}> Cancel</a>
                </span>
                : <div>
                    <a onClick={() => this.edit(record.key)}>Edit</a>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.key)}>
                      <a > Delete</a>
                    </Popconfirm>  
                  </div>
            }
          </div>
        );
      },
    }

    ]

  }

 componentWillReceiveProps(props){
    if(props.currentGroupVal !== null) {
      const data = props.currentGroupVal.map(({ _id, original, repetition, translation, category }) => {
        let status;
        if (repetition === 0) status = 'Good';
        if (repetition === 1) status = 'Not bad';
        if (repetition === 2) status = 'Bad';
        return { key: _id, status, category, original, translation}
      });
      this.setState({data, filteredData: data})
    }
  }

  renderCategory(text, record, column){
    return (
      <EditableCellSelect
        editable={record.editable}
        value={text}
        categories={this.props.categoryVal}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    )
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  delete(key){
    this.props.removeFlashCardFun(key);
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      const {key, original, translation, category} = target;
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
      this.props.updateFlashCardFun({_id: key, original, translation, category})
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  onSearch = ({target}) => {
    const {data} = this.state;
    const foundText = data.filter(data => data.original.toLowerCase().includes(target.value.toLowerCase()) || data.translation.toLowerCase().includes(target.value.toLowerCase()));
    this.setState({searchText: target.value, filteredData: foundText})
  }

  render() {
    const { resetCurrentGroupFun, modalOpen } = this.props;
    const {data, filteredData, searchText} = this.state;
    return (
      <Fragment>
        <Modal style={{background: '#444242'}} size="fullscreen" open={modalOpen} onClose={resetCurrentGroupFun}>
         <Modal.Header style={{background: '#444242'}}>
         <div className="custom-filter-dropdown">
          <Button onClick={this.props.onClose}>Close</Button>
            <Input
              placeholder="Search..."
              value={this.state.searchText}
              onChange={this.onSearch}
            />
          </div>
          </Modal.Header>
            <Table size="large" scroll={{ y: '45vh' }} columns={this.columns} dataSource={searchText === '' ? data : filteredData} pagination={{ pageSize: 10 }} />
        </Modal>
      </Fragment>
    )
  }
}


export default props => (
  <AppConsumer>
    {({ currentGroupVal, updateFlashCardFun,  categoryVal, removeFlashCardFun}) => <EditCategory {...props} removeFlashCardFun={removeFlashCardFun} categoryVal={categoryVal} updateFlashCardFun={updateFlashCardFun} currentGroupVal={currentGroupVal} />}
  </AppConsumer>
)