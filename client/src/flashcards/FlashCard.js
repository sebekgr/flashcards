import React, { Component } from 'react';
import { Button, Card, Form, Input, Select, message, Popconfirm } from 'antd'
import { AppConsumer } from '../StateContext';
const Option = Select.Option;

class FlashCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            translation: props.translation,
            original: props.original,
            category: props.category,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.statusAddVal) {
            message.success('Flashcard has been updated', 1);
            this.setState({ isEdit: false });
        }
    }

    handleEdit = e => {
        e.target ? this.setState({ [e.target.id]: e.target.value }) : this.setState({ category: e })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = Object.assign({}, values, { _id: this.props._id })
                this.props.updateFlashCardFun(data);
            }
        });

    }

    handleDelete = () => {
        this.props.removeFlashCardFun(this.props._id);
        this.props.delete(this.props._id);
    }

    toggle = () => {
        this.setState(prevState => ({ isEdit: !prevState.isEdit }));
    }

    renderIsEdit() {
        const { categoryVal } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card
                title="Cancel editing"
                extra={<Button icon="close" onClick={this.toggle} />}
            >
                <Form onChange={this.handleEdit} onSubmit={this.handleSubmit} style={{ width: '100%' }} className="login-form">
                    <Form.Item label="Original">
                        {getFieldDecorator('original', {
                            initialValue: this.state.original,
                            rules: [{ required: true, message: 'Please fill in this field!' }],
                            valuePropName: 'value'
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Translation">

                        {getFieldDecorator('translation', {
                            initialValue: this.state.translation,
                            rules: [{ required: true, message: 'Please fill in this field!' }],
                            valuePropName: 'value'
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="Category" extra="If you want add new category just start typing">
                        {getFieldDecorator('category', {
                            initialValue: this.state.category,
                            rules: [{ required: true, message: 'Please fill in this field!' }],
                        })(
                            <Select onSelect={this.handleFormChange} mode="combobox" >
                                {
                                    categoryVal.map((value, i) => <Option key={i} value={value}>{value}</Option>)
                                }
                            </Select>
                        )}

                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">Update</Button>
                        <Popconfirm onConfirm={this.handleDelete} title="Are you sure？" okText="Yes" cancelText="No">
                            <Button className="login-form-button">Delete</Button>
                        </Popconfirm>
                    </Form.Item>
                </Form>

            </Card>
        )
    }

    renderFlashcard(category, original, translation) {
        return (
            <Card hoverable={true} title={this.props.text} extra={<Button icon="edit" onClick={this.toggle} />}>
                <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                    <span className="flashcard-titles">Category: {category}</span>
                    <span className="flashcard-titles">Original: {original}</span>
                    <span className="flashcard-titles">Translation: {translation}</span>
                </div>
            </Card>
        )

    }

    render() {
        const { category, original, translation } = this.state;
        return this.state.isEdit ? this.renderIsEdit(category, original, translation) : this.renderFlashcard(category, original, translation);
    }


}

FlashCard = Form.create()(FlashCard);

export default props => (
    <AppConsumer>
        {({ updateFlashCardFun,
            categoryVal,
            removeFlashCardFun,
            statusAddVal
        }) =>
            <FlashCard
                updateFlashCardFun={updateFlashCardFun}
                removeFlashCardFun={removeFlashCardFun}
                categoryVal={categoryVal}
                statusAddVal={statusAddVal}
                {...props}
            />}
    </AppConsumer>
)

/*
import React, { Component } from 'react';
import { Button, Card, Form, Dropdown } from 'antd'
import { AppConsumer } from '../StateContext';
class FlashCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            translation: props.translation,
            category: props.category,
            original: props.original,
            _id: props._id

        }
    }

    handleEdit() {
        this.setState(prevState => ({ isEdit: !prevState.isEdit }));

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSave = (event, updateFlashCardFun) => {
        event.preventDefault();
        this.setState({ isEdit: !this.state.isEdit });
        const { translation, category, original, _id } = this.state;
        updateFlashCardFun({ _id, translation, category, original });
    }

    handleCategory = (e, { value }) => {
        this.setState({ category: value })
    }

    handleCancel = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }

    renderIsEdit(updateFlashCardFun, categoryVal, addCategoryFun) {
        return (
            <Form onSubmit={e => this.handleSave(e, updateFlashCardFun)} onChange={e => this.handleChange(e)}>
                <Card>


                    <Button htmlType="submit">Save</Button>
                    <Button onClick={this.handleCancel} >Cancel</Button>
                </Card>
            </Form>
        )
    }

    renderIsDone(removeFlasCardFun) {
        const { translation, category, original } = this.state;
        return (
            <Card>
                {original}
                {category}
                {translation}
                <Button onClick={() => this.handleEdit()} >Edit</Button>
                <Button onClick={() => removeFlasCardFun(this.state._id)} >Remove</Button>
            </Card>
        )
    }


    render() {
        return 
     (
           this.state.isEdit ? this.renderIsEdit(updateFlashCardFun, categoryVal, addCategoryFun) : this.renderIsDone(removeFlasCardFun)
        )
    }
}


*/