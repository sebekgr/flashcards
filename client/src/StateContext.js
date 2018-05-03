import React, { Component } from 'react';
import axios from 'axios';
export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

const options = [
    { key: '360000', text: '1 h', value: '1 h' },
    { key: '8640000', text: '1 day', value: '1 day' },
    { key: '60480000', text: '1 week', value: '1 week' },
    { key: '262800000', text: '1 month', value: '1 month' },
    { key: '788400000', text: '3 months', value: '3 months' },
]

class MyProvider extends Component {

    state = {
        user: false,
        flashcards: [],
        category: [],
        currentGroup: [],
        choice: 'original',
        statusAdd: false,
    }

    async componentDidMount() {
        const res = await axios.get('/api/current_user');
        const flashcards = await axios.get(`/api/flashcards/${res.data._id}`);
        const { _id, username, good, notBad, bad, category } = res.data
        this.setState({ user: { _id, username, good, notBad, bad}, category, flashcards: flashcards.data });
    }

    handleUpdateRepetitions = async data => {
        const {user} = this.state
        const id = this.state.user._id;        
        const repetitions = await axios.patch(`/api/${id}/repetitions`, data);
        if(repetitions.status === 200) {
            const {good, notBad, bad} = data;            
            this.setState(
                {statusAdd: true,
                user: {...user, good, notBad, bad}
                }
            );
            this.helperChangeStatus();
        }
    }

    helperChangeStatus(){
       this.timeOut = setTimeout(() => this.setState({statusAdd: false }), 200);
    }

    handleAddFlashCard = async data => {
        const isCategory = this.state.category.find(category => category === data.category);
        if(!isCategory) await this.handleAddCategory(data.category);
        const flashcard = await axios.post(`/api/flashcards/add`, data);
        if (flashcard.status === 200) {
            
            this.setState({ flashcards: [flashcard.data, ...this.state.flashcards], statusAdd: true})
            this.helperChangeStatus();
        } 
    }

    handleUpdateFlashCard = async data => {
        const flashcard = await axios.patch(`/api/flashcards/${data._id}`, data);
        if (flashcard.status === 200) {            
            const { translation, original, category, _id } = flashcard.data;
            const updateFlashcards = this.state.flashcards.map(flashcard => {
                if (flashcard._id === _id) {
                    return { ...flashcard, translation, original, category }
                } else return flashcard
            });
            
            if(this.state.currentGroup.length !== 0) {
                const currentGroup = updateFlashcards.filter(flash => flash.category === this.state.currentGroup[0].category);
                this.setState({ flashcards: updateFlashcards, currentGroup, statusAdd: true});
            } else {
                this.setState({ flashcards: updateFlashcards, statusAdd: true});
            }
            this.helperChangeStatus();            
        }
    }

    handleRemoveFlashCard = async id => {
        const flashcard = await axios.delete(`/api/flashcards/${id}`);
        if (flashcard.status === 200) {
            const othersFlashCards = this.state.flashcards.filter(flashcard => flashcard._id !== id);
            if(this.state.currentGroup.length !== 0) {
                const currentGroup = this.state.currentGroup.filter(flashcard => flashcard._id !== id);
                this.setState({ flashcards: othersFlashCards, currentGroup });
            }
            this.setState({ flashcards: othersFlashCards});
        }
    }

    handleRemoveCategory = async name => {
        const id = this.state.user._id;
            try {
                const deletedCategory = await axios.delete(`/api/${id}/delete/category/${name}`);
                if (deletedCategory.status === 200) {
                    const {flashcards, category} = this.state;               
                   const categoryList = category.filter(cat => cat !== name);
                   const flashcardsList = flashcards.filter(flashcard => flashcard.category !== name);
                   this.setState({flashcards: flashcardsList, category: categoryList});
                }
            } catch (err) {
                console.log(err);
            }
    }

    handleAddCategory = async value => {
        const id = this.state.user._id;
            try {
                const reqCategory = await axios.put(`/api/${id}/add/category`, { newCategory: value.trim() });
                if (reqCategory.status === 200) {                
                    this.setState(prev => ({
                        category: [reqCategory.data, ...prev.category]
                    }))
                }
            } catch (err) {
                console.log(err);
            }
        
    }
    handleUpdateCategory = async value => {
        const id = this.state.user._id;
        try {
            const updateCategory = await axios.put(`/api/${id}/edit/category`, value);
            if(updateCategory.status === 200) {
                const {category, flashcards} = this.state;
                const catList = category.filter(cat => cat !== value.currentName);
                const flashcardsList = flashcards.map(flashcard => {
                    if(flashcard.category === value.currentName) {
                        return {...flashcard, category: value.newName}
                    } else {
                        return flashcard
                    }
                })
                this.setState({category: [value.newName, ...catList], currentGroup: [], flashcards: flashcardsList});
            }
        } catch(err) {
            console.log(err);
        }
    }

    handleSetCurrentGroup = (categoryName, isLearning = null) => {
        const {flashcards} = this.state;
        
        const currentGroup = flashcards.filter(flashcard => flashcard.category === categoryName);
        //handle for learning
        if(isLearning) {
            const {good, notBad, bad} = this.state.user;
            const countGood = +options.find(op => op.text === good).key
            console.log(countGood)
            const countNotBad = +options.find(op => op.text === notBad).key
            console.log(countNotBad)
            const countBad = +options.find(op => op.text === bad).key
            console.log(countBad)
            let d = new Date().toLocaleString();
            let l = new Date(d).getTime();
            const isReady = currentGroup.filter(current => {
                if(current.repetition === 0) {
                   return current.modifyAt + countGood <= +l
                }
                if(current.repetition === 1) {
                   return current.modifyAt + countNotBad <= +l
                } 
                if(current.repetition === 2) {
                     return  current.modifyAt + countBad <= +l
                }
            })
            const compare = (a , b) => {
                const aState = a.repetition
                const bState = b.repetition
                let comparison = 0;
                aState > bState ? comparison = 1 : comparison = -1;
                return comparison * -1
            }
            this.setState({currentGroup: isReady.sort(compare)})
        } else {
            //handle for edit groupe
            this.setState({currentGroup})
        }
    }

    handleResetCurrentGroup = () => {
        this.setState({currentGroup: []})
    }

    handleUpdateChoice = choice => {
        this.setState({ choice });
    }

    handleUpdateStatusFlashCard = async (id, status) => {
        const { flashcards } = this.state;  
        let d = new Date().toLocaleString();
        let l = new Date(d).getTime();
        if(status === 'good') {
            status = 0
        } else if (status === 'notbad') {
            status = 1
        } else if(status === 'bad'){
            status = 2
        }
        const res = await axios.put(`/api/flashcards/${id}/status`, {status, modifyAt: +l});
        const updateFlashcards = flashcards.map(flashcard => {
            if (flashcard._id === id) {
                return res.data
            } else return flashcard
        })
        
        this.setState({flashcards: updateFlashcards});
        
    }

    render() {
        return (
            <AppContext.Provider value={{
                stateVal: this.state,
                statusAddVal: this.state.statusAdd,
                currentEditedGroupVal: this.state.currentEditedGroup,
                userVal: this.state.user,
                choiceVal: this.state.choice,
                currentGroupVal: this.state.currentGroup,
                categoryVal: this.state.category,
                flashCardsVal: this.state.flashcards,
                editGroupAllItemVal: this.state.editGroupAllItem,
                addFlashCardFun: this.handleAddFlashCard,
                addCategoryFun: this.handleAddCategory,
                updateFlashCardFun: this.handleUpdateFlashCard,
                removeFlashCardFun: this.handleRemoveFlashCard,
                setCurrentGroupFun: this.handleSetCurrentGroup,
                updateChoiceFun: this.handleUpdateChoice,
                updateStatusFlashCardFun: this.handleUpdateStatusFlashCard,
                resetCurrentGroupFun: this.handleResetCurrentGroup,
                handleUpdateRepetitionsFun: this.handleUpdateRepetitions,
                handleCurrentEditedGroupFun: this.handleCurrentEditedGroup,
                handleUpdateCategoryFun: this.handleUpdateCategory,
                handleRemoveCategoryFun : this.handleRemoveCategory,

            }}>
                {this.props.children}
            </AppContext.Provider>

        )
    }

}

export default MyProvider;