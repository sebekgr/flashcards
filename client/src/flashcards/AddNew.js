import React, {Component} from 'react';
import { Form, Input, Button, Select, message, Alert   } from 'antd';
import {AppConsumer} from '../StateContext';
import ExistFlashcard from './ExistFlashcard';
const FormItem = Form.Item;
const Option = Select.Option;
class AddNew extends Component {

    componentWillReceiveProps(nextProps){
        if(nextProps.statusAddVal === true && this.state.original !== '') {
            message.success('Flashcard has been added', 1);
        this.props.form.resetFields();
        this.setState({original: '', translation: '', show: false});
        }
    }

    state = {
        original: '',
        translation: '',
        category: '',
        show: false,
        isExist: null
   }

    handleFormChange = (e) => {
        e.target ? this.setState({[e.target.id]: e.target.value}) : this.setState({category: e})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const {addFlashCardFun, userVal, flashCardsVal, updateFlashCardFun} = this.props;
            const {original, translation, category} = this.state;
            const isExistTranslation = flashCardsVal.find(flashcard => flashcard.translation === translation);
            if(isExistTranslation) {
               this.setState({isExist: isExistTranslation, show: true })
            } else {
                const localDate = new Date().toLocaleString();
                const dateToMs = new Date(localDate).getTime();
                addFlashCardFun({original, translation, category, _user: userVal._id, createAt: dateToMs});
            }            
          }
        });
      }

      handleUpdate = (e) => {
        e.preventDefault();
        this.props.updateFlashCardFun(this.state.isExist);

      }

      handleChangeUpdating = (e) => {
          const isExist = Object.assign({}, this.state.isExist, {[e.target.id]: e.target.value});
        this.setState({isExist})  

      }

      handleCancel = () => {
          this.setState({show: false});
      }


    render(){
        const {categoryVal} = this.props;
        const {category, original, translation, show, isExist} = this.state;
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="add-flashcard-wrapper">
               {show ?
                <Alert
                    message="Duplicate detection"
                    description={<ExistFlashcard change={this.handleChangeUpdating} update={this.handleUpdate} {...this.state} cancel={this.handleCancel} categoryList={categoryVal}/>}
                    type="warning"
                    showIcon
                    /> : null} 
                <Form onChange={this.handleFormChange} onSubmit={this.handleSubmit}  style={{ width: '100%'}}  className="login-form">
                    <FormItem label="Original">
                        {getFieldDecorator('original', {initialValue: original,
                            rules: [{ required: true, message: 'Please fill in this field!'}],
                            valuePropName: 'value'
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Translation">

                        {   getFieldDecorator('translation', { initialValue: translation,
                            rules: [{ required: true, message: 'Please fill in this field!'}],
                            valuePropName: 'value'
                        })(
                            <Input  />
                        )}
                    </FormItem>
                    <FormItem label="Category" extra="If you want add new category just start typing">
                    {getFieldDecorator('category', { initialValue: category,
                            rules: [{ required: true, message: 'Please fill in this field!'}],
                        })(
                            <Select onSelect={this.handleFormChange} mode="combobox" >
                            {
                                categoryVal.map((value, i) => <Option key={i} value={value}>{value}</Option>)
                            }
                            </Select>
                        )}
                        
                    </FormItem>
                    <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                       Add
                    </Button>
                    </FormItem>
                </Form>
             
            </div>
          
        )
    }
}





AddNew = Form.create()(AddNew);

export default props => (
    <AppConsumer>
      {({addFlashCardFun,statusAddVal, updateFlashCardFun,userVal, state, addCategoryFun, categoryVal, flashCardsVal}) =>(
          <AddNew {...props}
            addFlashCardFun={addFlashCardFun} 
            userVal={userVal}
            state={state}
            addCategoryFun={addCategoryFun}
            categoryVal={categoryVal}
            statusAddVal={statusAddVal}
            flashCardsVal={flashCardsVal}
            updateFlashCardFun={updateFlashCardFun}
        />
      ) }
    </AppConsumer>
  )