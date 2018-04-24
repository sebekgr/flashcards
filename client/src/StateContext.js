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
        isAdded: false,
    }

    async componentDidMount() {
        const res = await axios.get('/api/current_user');
        const flashcards = await axios.get(`/api/flashcards/${res.data._id}`);
        const category = []
        res.data.category.forEach((cat, i) =>
            category.push({ key: cat, value: cat, text: cat })
        );
        const { _id, username, good, notBad, bad } = res.data

        this.setState({ user: { _id, username, good, notBad, bad}, category, flashcards: flashcards.data });
    }

    handleUpdateRepetitions = async data => {
        const {user} = this.state
        const id = this.state.user._id;
        const {good, notBad, bad, countGood, countNotBad, countBad } = data;
        const repetitions = await axios.patch(`/api/${id}/repetitions`, data);
        if(repetitions.status === 200) {
            const updateRepetitions = Object.assign({}, user, {good, notBad, bad});
            this.setState({user: updateRepetitions, countGood, countNotBad, countBad });
        }
    }


    handleAddFlashCard = async data => {
        const flashcard = await axios.post(`/api/flashcards/add`, data);
        if (flashcard.status === 200) {
            this.setState({ flashcards: [flashcard.data, ...this.state.flashcards],  statusAdd: true, isAdded: true})
        } else {
            this.setState({statusAdd: false, isAdded: true})
        }
        this.setState({isAdded: false, statusAdd: false})
    }

    handleUpdateFlashCard = async data => {
        console.log(data)
        const flashcard = await axios.patch(`/api/flashcards/${data._id}`, data);
        if (flashcard.status === 200) {
            const { translation, original, category, _id } = flashcard.data;
            const updateFlashcards = this.state.flashcards.map(flashcard => {
                if (flashcard._id === _id) {
                    return { ...flashcard, translation, original, category }
                } else return flashcard
            });
            const currentGroup = updateFlashcards.filter(flash => flash.category === this.state.currentGroup[0].category);
            this.setState({ flashcards: updateFlashcards, currentGroup });
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

    handleAddCategory = async (event, { value }) => {
        const id = this.state.user._id;
        try {
            const reqCategory = await axios.put(`/api/${id}/add/category`, { newCategory: value.trim() });
            if (reqCategory.status === 200) {
                const newCategory = { key: value, text: value, value, icon: 'delete' };
                this.setState(prev => ({
                    category: [newCategory, ...prev.category]
                }))
            }
        } catch (err) {
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
            const countNotBad = +options.find(op => op.text === notBad).key
            const countBad = +options.find(op => op.text === bad).key
            let d = new Date().toLocaleString();
            let l = new Date(d).getTime();
            +l;            
            const isReady = currentGroup.filter(current => {
                if(current.repetition === 0) {
                   return current.modifyAt + countGood <= l
                }
                if(current.repetition === 1) {
                   return current.modifyAt + countNotBad <= l
                } 
                if(current.repetition === 2) {
                     return  current.modifyAt + countBad <= l
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
        +l;
        const res = await axios.put(`/api/flashcards/${id}/status`, {status, modifyAt: l});
        const updateFlashcards = flashcards.map(flashcard => {
            if (flashcard._id === id) {
                return res.data
            } else return flashcard
        })

        this.setState({flashcards: updateFlashcards})
    }

    


    render() {
        return (
            <AppContext.Provider value={{
                stateVal: this.state,
                currentEditedGroupVal: this.state.currentEditedGroup,
                statusAddVal: this.state.statusAdd,
                isAddedVal: this.state.isAdded,
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
                handleCurrentEditedGroupFun: this.handleCurrentEditedGroup

            }}>
                {this.props.children}
            </AppContext.Provider>

        )
    }

}

export default MyProvider;