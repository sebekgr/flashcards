import React from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";


const routeList = [
  { key: '', name: 'Statistics' },
  { key: '/edit', name: 'Settings' },
  { key: '/add', name: 'Add flashcard' },
  { key: '/categorylist', name: 'Category list' },
  { key: '/latestflashcards', name: 'Latest flashcards' }
]

const Stats = () => <div> some stats</div>

const Profile = ({ location, match }) => {
  return (
    <div>
      <Segment inverted>
        <Menu inverted secondary>
          {
            routeList.map(({ key, name }) => <Menu.Item active={location.pathname === `${match.path}${key}`} key={name} name={name}> <Link to={`${match.path}${key}`}> {name}</Link> </Menu.Item>)
          }
        </Menu>
      </Segment>
      {location.pathname === '/profile' ? <Stats /> : null}
    </div>
  )
}
export default Profile;