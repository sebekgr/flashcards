import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Profile from './Profile/Profile'
import LearningCard from './Learning/LearningCard';
import ProfileEdit from './Profile/ProfileEdit';
import AddNew from './flashcards/AddNew';
import CategoryList from './Profile/CategoryList';
import FlashCardList from './flashcards/FlashCardList';

class App extends Component {
  render() {
    return (
        <Router>
          <div className="main-wrapper">
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/profile/edit" component={ProfileEdit} />
                <Route path="/profile/add" component={AddNew} />
                <Route path="/profile/categorylist" component={CategoryList} />
                <Route path="/profile/latestflashcards" component={FlashCardList} />
                <Route exact path="/learning" component={LearningCard} />
          </div>
        </Router>
    );
  }
}

export default App;
