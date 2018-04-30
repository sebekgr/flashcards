import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";


const routeList = [
  { key: '', name: 'Statistics' },
  { key: '/edit', name: 'Settings' },
  { key: '/add', name: 'Add flashcard' },
  { key: '/categorylist', name: 'Category list' },
  { key: '/search', name: 'Search flashcards' }
]

const Stats = () => <div> some stats</div>

const Profile = ({ location, match }) => {
  return (
    <div className="menu-wrapper">
      <Menu mode="horizontal">
      <Menu.Item><Link to='/'>Home</Link></Menu.Item>
        {
          routeList.map(({ key, name }) => <Menu.Item active={location.pathname === `${match.path}${key}`} key={name} name={name}> <Link to={`${match.path}${key}`}> {name}</Link> </Menu.Item>)
        }
      </Menu>

      {location.pathname === '/profile' ? <Stats /> : null}
    </div>
  )
}
export default Profile;
