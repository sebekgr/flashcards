import React, { Component } from 'react';
import { AppConsumer } from '../StateContext';
import { Select,  Form, Input, Button, message } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const names = [{ key: 'good', text: 'Good', color: 'green' }, { key: 'notBad', text: 'Not bad', color: 'blue' }, { key: 'bad', text: 'Bad', color: 'red' }]
const options = [
    { key: '3600', text: '1 h', value: '1 h' },
    { key: '86400', text: '1 day', value: '1 day' },
    { key: '604800', text: '1 week', value: '1 week' },
    { key: '2628000', text: '1 month', value: '1 month' },
    { key: '7884000', text: '3 months', value: '3 months' },
]


class ProfileEdit extends Component {

    componentWillReceiveProps({statusAddVal}){
        if(statusAddVal) message.success('Profile has been updated', 1);
    }

    renderRepetitions(formItemLayout, getFieldDecorator, userVal) {
        let elem = names.map(({text, key, color}) => {
            return(
                <FormItem {...formItemLayout} label={text} key={key}>
                {getFieldDecorator(key, {setFieldsValue: userVal[key], initialValue: userVal[key],
                    rules: [
                    { required: true, message: 'Select options' },
                    ],
                }, )(
                    <Select className="profile-select-options" >
                        {options.map(({value}) => <Option key={value} value={value}>{value}</Option>)}
                    </Select>
                )}
                    
                </FormItem>
            )
        })

        return elem;
    }

    handleSave = e => {

       e.preventDefault();
       this.props.form.validateFields((err, values) => {
           const { good, notBad, bad} = values
           console.log(values)
        if (!err) {
          this.props.handleUpdateRepetitionsFun({ good, notBad, bad});
        }
      });

        
    }

    render() {
        const { userVal } = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
          };
        return (
            <div className="profile-wrapper">
            <p>Here you can define frequently of flashcards repetitions</p>
            <Form style={{ width: '100%'}} layout="vertical" onSubmit={this.handleSave}>
                {this.renderRepetitions(formItemLayout, getFieldDecorator, userVal)}
                <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                
                <Button  type="primary" htmlType="submit">
                    Save
                </Button>
                </FormItem>
            </Form>
            </div>
        )
    }
}

ProfileEdit = Form.create()(ProfileEdit)

export default props => (
    <AppConsumer>
        {({ userVal, handleUpdateRepetitionsFun, statusAddVal }) => <ProfileEdit {...props} statusAddVal={statusAddVal} handleUpdateRepetitionsFun={handleUpdateRepetitionsFun} userVal={userVal} />}
    </AppConsumer>
)
