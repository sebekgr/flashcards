import React, { Component, Fragment } from 'react'
import { AppConsumer } from '../StateContext';
import { Table, Popconfirm, Select, Input, Modal, Button, Form, Icon  } from 'antd';
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
      categoryNameEdit: false,
      categoryName: props.category,
      selectedRowKeys: [],
      isEditing: false,
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
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
    if(selectedRowKeys.length === 0) {
      this.componentWillMount();
      this.setState({isEditing: false});
      
    } //jesli zero to od edytowac i zmienic przycisk
  }

  toggleCategoryName = () =>{
    this.setState(prevState => ({categoryNameEdit: !prevState.categoryNameEdit}))
  }

  handleEditCategoryName = () => {

  }
  handleChangeCategoryName = ({target}) => {
    this.setState({categoryName: target.value})
  }

  renderEditCategoryName(){
    return (
      <Form onSubmit={this.handleEditCategoryname} onChange={this.handleChangeCategoryName}>
        <Form.Item>
        <Input value={this.state.categoryName} />
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit">Save</Button>
        </Form.Item>
        <Form.Item>
        <Button onClick={this.toggleCategoryName}>Cancel</Button>
        </Form.Item>
      </Form>
    )      
  }

  massiveEdit = who => {
    
    const {selectedRowKeys} = this.state;
    this.setState(prevState => ({isEditing: !prevState.isEditing}))
    for(let i = 0; i < selectedRowKeys.length; i++) {
      this[who](selectedRowKeys[i]);
    }
  }

  renderEditing = () => {
      const {isEditing, selectedRowKeys} = this.state;
      let disabled = selectedRowKeys.length === 0 ? true : false;
    return !isEditing ? <Button disabled={disabled} onClick={(edit) =>this.massiveEdit('edit')}>Edit</Button> : <Button onClick={(cancel) => this.massiveEdit('cancel')}>Cancel</Button>
  }

  renderNotEdit(categoryNameEdit, categoryName){
    return (
      <div className="custom-filter">
            {categoryNameEdit ? this.renderEditCategoryName() : <p>{categoryName} <Button onClick={this.toggleCategoryName} icon="edit" /></p> }
            <Input
              placeholder="Search..."
              value={this.state.searchText}
              onChange={this.onSearch}
            />
            <Popconfirm title="This category with all flashcards ${<br>} will be delete, are you sure ?" okText="Yes" cancelText="No">
              <Button icon="delete">Delete this category</Button>
            </Popconfirm>
            {this.renderEditing()}
          </div>
    )
  }

  render() {
    const {visible, onCancel} = this.props;
    let {data, filteredData, searchText, sortedInfo, filteredInfo,categoryName, categoryNameEdit, selectedRowKeys} = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <Fragment>
        <Modal
          title={this.renderNotEdit(categoryNameEdit, categoryName)}
          wrapClassName="vertical-center-modal"
          visible={true}
          onCancel={onCancel}
          footer={null}
          width="90vw"
          >
         
            <Table rowSelection={rowSelection} size="large" scroll={{ y: '45vh' }} columns={this.columns} dataSource={searchText === '' ? data : filteredData} pagination={{ pageSize: 10 }} />
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