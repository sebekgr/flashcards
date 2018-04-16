import React, { Component } from 'react';
import { Button, Card, Form, Dropdown } from 'semantic-ui-react'
import {AppConsumer} from '../StateContext';
class FlashCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            translation: '',
            category: '',
            original: '',
            _id: null

        }
    }

    componentDidMount() {
        const { translation, category, original, _id } = this.props;
        this.setState({ translation, category, original, _id });
    }


    handleEdit() {
        this.setState(prevState=>({ isEdit: !prevState.isEdit }));

    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSave = (event, updateFlashCardFun) => {
        event.preventDefault();
        this.setState({ isEdit: !this.state.isEdit });
        const { translation, category, original, _id } = this.state;
        updateFlashCardFun({_id, translation, category, original });
    }

    handleCategory = (e, {value}) =>{
        this.setState({category: value})
    }

    handleCancel = () => {
        this.setState({isEdit: !this.state.isEdit})
    }

    renderIsEdit(updateFlashCardFun, categoryVal, addCategoryFun) {
        return (
                    <Form onSubmit={e => this.handleSave(e, updateFlashCardFun)} onChange={e => this.handleChange(e)}>
                        <Card>

                            <Card.Content>
                                <Card.Header>
                                    <Form.Input type="text" label="Original" name="original" required value={this.state.original} />
                                </Card.Header>
                                <Card.Meta>
                                    <Form.Input type="text" label="Translation" name="translation" required value={this.state.translation} />

                                </Card.Meta>
                                <Card.Description>
                                <Dropdown
                                    options={categoryVal}
                                    placeholder='Choose Category'
                                    search
                                    selection
                                    fluid
                                    allowAdditions
                                    value={this.state.category}
                                    onAddItem={addCategoryFun}
                                    onChange={this.handleCategory}
                                />

                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    <Button type="submit" basic color='green'>Save</Button>
                                    <Button onClick={this.handleCancel} basic color='blue'>Cancel</Button>
                                </div>
                            </Card.Content>

                        </Card>
                    </Form>
        )
    }

    renderIsDone(removeFlasCardFun) {
        const { translation, category, original } = this.state;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {original}

                    </Card.Header>
                    <Card.Meta>
                        {category}
                    </Card.Meta>
                    <Card.Description>
                        {translation}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button onClick={() => this.handleEdit()} basic color='blue'>Edit</Button>
                        <Button onClick={() => removeFlasCardFun(this.state._id)} basic color='red'>Remove</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }


    render() {
        return (
            <AppConsumer>
            {({removeFlasCardFun, updateFlashCardFun, categoryVal, addCategoryFun}) => (

                this.state.isEdit ? this.renderIsEdit(updateFlashCardFun, categoryVal, addCategoryFun) : this.renderIsDone(removeFlasCardFun)
)}</AppConsumer>
        )
        
        
    }

}

export default FlashCard;