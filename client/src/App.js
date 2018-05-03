import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Profile from './Profile/Profile'
import LearningCard from './Learning/LearningCard';
import ProfileEdit from './Profile/ProfileEdit';
import AddNew from './flashcards/AddNew';
import CategoryList from './Profile/CategoryList';
import SearchFlashcards from './flashcards/SearchFlashcards';
import { Row, Col } from 'antd';


class App extends Component {
  render() {
    return (
      <Row>
      <Col>
       <Router>
         <Fragment>
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/profile/edit" component={ProfileEdit} />
                <Route path="/profile/add" component={AddNew} />
                <Route path="/profile/categorylist" component={CategoryList} />
                <Route path="/profile/search" component={SearchFlashcards} />
                <Route exact path="/learning" component={LearningCard} />
          </Fragment>
        </Router>
      </Col>
    </Row>
        
    );
  }
}

export default App;
