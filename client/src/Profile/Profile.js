import React from 'react';
import CategoryList from './CategoryList';
import AddNew from '../flashcards/AddNew';
import FlashCardList from '../flashcards/FlashCardList';
import ProfileEdit from './ProfileEdit';
import { Tab} from 'semantic-ui-react'

const panes = [
    { menuItem: 'Profile', render: () => <Tab.Pane><ProfileEdit /></Tab.Pane> },
    { menuItem: 'Add new', render: () => <Tab.Pane><AddNew /></Tab.Pane> },
    { menuItem: 'The latest flashcards', render: () => <Tab.Pane><FlashCardList /></Tab.Pane> },
    { menuItem: 'Flashcards list', render: () => <Tab.Pane><CategoryList /></Tab.Pane> },
  ]


const Profile = () => <Tab panes={panes} />



export default Profile;