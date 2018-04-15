import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './Home';
import Profile from './Profile/Profile'
import LearningCard from './Learning/LearningCard';

const EditFlashcards = () => <div>EditFlashcards</div>


class App extends Component {
  render() {
    return (
        <Router>
          <div>
          <h1>Flash cards</h1>
            <ul style={{display: 'flex', width: '30vw', listStyle: 'none', justifyContent:'space-around'}}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/flashcards/edit">Edit flashcards</Link>
              </li>

            </ul>

                <Route exact path="/" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/learning" component={LearningCard} />
                <Route exact path="/flashcards/edit" component={EditFlashcards} />

          </div>
        </Router>
    );
  }
}

export default App;
