import React, { Component } from 'react';
import axios from 'axios';
export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

class MyProvider extends Component {

    state = {
        user: false,
        flashcards: [],
        category: [],
        editGroupAllItem: false,
        currentGroup: [],
        choice: 'original',
        statusAdd: false,
        isAdded: false
    }

    async componentDidMount() {
        const res = await axios.get('/api/current_user');
        const flashcards = await axios.get(`/api/flashcards/${res.data._id}`);
        const category = []
        res.data.category.forEach((cat, i) =>
            category.push({ key: cat, value: cat, text: cat })
        );
        const { _id, username } = res.data
        this.setState({ user: { _id, username }, category, flashcards: flashcards.data });
    }


    handleAddFlashCard = async data => {
        const userId = this.state.user._id;
        const payload = Object.assign({}, data, { userId });
        const flashcard = await axios.post(`/api/flashcards/add`, payload);
        console.log(flashcard);
        if (flashcard.status === 200) {
            const payloadCard = Object.assign({}, data, { _id: flashcard.data })
            this.setState({ flashcards: [payloadCard, ...this.state.flashcards],  statusAdd: true, isAdded: true})
            console.log('odpalam ok')
        } else {
            this.setState({statusAdd: false, isAdded: true})
            console.log('odpalam blad')
        }
        this.setState({isAdded: false, statusAdd: false})
    }

    handleUpdateFlashCard = async (id, data) => {
        const flashcard = await axios.patch(`/api/flashcards/${id}`, data);
        if (flashcard.status === 200) {
            const { translation, original, category } = flashcard.data;
            const updateFlashcards = this.state.flashcards.map(flashcard => {
                if (flashcard._id === id) {
                    return { ...flashcard, translation, original, category }
                } else return flashcard
            });
            this.setState({ flashcards: updateFlashcards });
        }
    }

    handleRemoveFlasCard = async id => {
        const flashcard = await axios.delete(`/api/flashcards/${id}`);
        if (flashcard.status === 200) {
            let othersFlashCards = this.state.flashcards.filter(flashcard => flashcard._id !== id);
            this.setState({ flashcards: othersFlashCards });
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

    handleSetCurrentGroup = (categoryName, choice) => {
        const { currentGroup, flashcards } = this.state;
        const learning = flashcards.filter(flashcard => flashcard.category === categoryName);
        this.setState({ currentGroup: learning, choice });

    }

    handleResetCurrentGroup = () => {
        this.setState({currentGroup: []})
    }

    handleUpdateChoice = choice => {
        this.setState({ choice });
    }

    handleUpdateStatusFlashCard = async (id, status) => {
        const { flashcards } = this.state;
        const res = await axios.put(`/api/flashcards/${id}/status`, { status });
        const updateFlashcards = flashcards.map(flashcard => {
            if (flashcard._id === id) {
                return { ...flashcard, repetition: +status }
            } else return flashcard
        })

        this.setState({flashcards: updateFlashcards})
    }


    render() {
        return (
            <AppContext.Provider value={{
                stateVal: this.state,
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
                removeFlasCardFun: this.handleRemoveFlasCard,
                setCurrentGroupFun: this.handleSetCurrentGroup,
                updateChoiceFun: this.handleUpdateChoice,
                updateStatusFlashCardFun: this.handleUpdateStatusFlashCard,
                resetCurrentGroupFun: this.handleResetCurrentGroup

            }}>
                {this.props.children}
            </AppContext.Provider>

        )
    }

}

export default MyProvider;