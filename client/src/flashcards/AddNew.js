import React, {Component} from 'react';
import { Button, Form, Dropdown, Message } from 'semantic-ui-react'
import {AppConsumer} from '../StateContext';

class AddNew extends Component {

    state = {
        original: '',
        translation: '',
        category: '',
        status: false,
        notification: false       
    }

    componentDidUpdate(nextProps, nextState){
        const {isAddedVal, statusAddVal} = nextProps;
        if(isAddedVal) {
            this.setState({status: statusAddVal, notification: true})
            this.timeOut = setTimeout( () => this.setState({notification: false}), 1500)
        }
        
    } 

    handleChange = event =>{
         this.setState({[event.target.name]: event.target.value})
    }

     handleSubmit = e =>{
        const {addFlashCardFun, userVal} = this.props;
        const {original, translation, category} = this.state;
        e.preventDefault();
        const localDate = new Date().toLocaleString();
        const dateToMs = new Date(localDate).getTime();
        addFlashCardFun({original, translation, category, _user: userVal._id, createAt: dateToMs});

        this.setState({original: '', translation: ''})
    }

    handleCategory = (e, {value}) =>{
        this.setState({category: value})
    }

    renderStatus(){
        const {status} = this.state;
        return status ? <Message color='green'>Successfully added</Message> : <Message color='red'>Somethink went wrong, please try again :)</Message>
    }

    componentWillUnmount(){
        clearTimeout(this.timeOut);
    }

    render(){
        const {notification, original, translation, category} = this.state;
        const {addCategoryFun, categoryVal} = this.props;
        return(
                <Form onSubmit={e => this.handleSubmit(e)} onChange={this.handleChange}>
                {notification ? this.renderStatus() : null}
                <Form.Input required  label="Original" type="text" name="original" value={original}/>
                <Form.Input required  label="Translation" type="text" name="translation" value={translation}/>
                    <Dropdown
                        options={categoryVal}
                        placeholder='Choose Category'
                        search
                        selection
                        fluid
                        allowAdditions
                        value={category}
                        onAddItem={addCategoryFun}
                        onChange={this.handleCategory}
                    />
                    <Button type='submit' color="green">Add</Button>
                </Form> 
          
        )
    }
}

export default props => (
    <AppConsumer>
      {({addFlashCardFun,statusAddVal,isAddedVal, userVal, state, addCategoryFun, categoryVal}) =>(
          <AddNew {...props}
            statusAddVal={statusAddVal}
            addFlashCardFun={addFlashCardFun} 
            userVal={userVal}
            state={state}
            isAddedVal={isAddedVal}
            addCategoryFun={addCategoryFun}
            categoryVal={categoryVal}
        />
      ) }
    </AppConsumer>
  )
  

