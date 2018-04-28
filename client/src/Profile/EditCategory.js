import React, { Component, Fragment } from 'react'
import { AppConsumer } from '../StateContext';
import { Table, Popconfirm, Select, Input, Modal, Button  } from 'antd';
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
          {categories.map((value, i) => <Option key={i} value={value}>{value}</Option>)}
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
      data: [],
      filtered: false,
      searchText: '',
      filteredData: [],
    }
    this.cacheData = this.state.data.map(item => ({ ...item }));

    this.columns = [{
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
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

  componentWillMount(){
    const data = this.props.currentGroupVal.map(({_id, original, repetition, translation, category}) => {
      let status;
      if(repetition === 0) status = 'Good';
      else if(repetition === 1) status = 'Not Bad';
      else status = 'Bad';
      return {key: _id, status, category, original, translation}
    });
    this.setState({data, filteredData: data});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currentGroupVal !== this.props.currentGroupVal) {
      const data = nextProps.currentGroupVal.map(({_id, original, repetition, translation, category}) => {
        let status;
        if(repetition === 0) status = 'Good';
        else if(repetition === 1) status = 'Not Bad';
        else status = 'Bad';
        return {key: _id, status, category, original, translation}
      });
      this.setState({data, filteredData: data});
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
    const {visible, onCancel} = this.props;
    let {data, filteredData, searchText, sortedInfo, filteredInfo} = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    return (
      <Fragment>
        <Modal
                    wrapClassName="vertical-center-modal"
                    visible={true}
                    onCancel={onCancel}
                    footer={null}
                    width="90vw"
                    >
         <div className="custom-filter">
            <Input
              placeholder="Search..."
              value={this.state.searchText}
              onChange={this.onSearch}
            />
          </div>
            <Table size="large" scroll={{ y: '45vh' }} columns={this.columns} dataSource={searchText === '' ? data : filteredData} pagination={{ pageSize: 10 }} />
            </Modal>
      </Fragment>
    )
  }
}


export default props => (
  <AppConsumer>
    {({ updateFlashCardFun, currentGroupVal, categoryVal, removeFlashCardFun}) => <EditCategory currentGroupVal={currentGroupVal} {...props} removeFlashCardFun={removeFlashCardFun} categoryVal={categoryVal} updateFlashCardFun={updateFlashCardFun} />}
  </AppConsumer>
)