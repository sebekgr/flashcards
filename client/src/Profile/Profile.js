import React, {Component} from 'react';
import { Menu, Button } from 'antd';
import { Link } from "react-router-dom";
import Stats from './Stats';

const routeList = [
  { key: '', name: 'Statistics' },
  { key: '/edit', name: 'Settings' },
  { key: '/add', name: 'Add flashcard' },
  { key: '/categorylist', name: 'Category list' },
  { key: '/search', name: 'Search flashcards' }
]

class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {toggleBtn: false}
  }

  handleToggle = () => {
    this.setState(prevState=> ({toggleBtn: !prevState.toggleBtn}));
  }

  render() {
    let isSmall = window.innerWidth <= 670 ;
    const {match, location} = this.props;
    const {toggleBtn} = this.state;
    let isToogled = toggleBtn ? 'menu-responsive active' : 'menu-responsive';
    return (
      <div>
       {isSmall ? <Button onClick={this.handleToggle} icon={toggleBtn ? "menu-fold " : "menu-unfold"}>Menu </Button> : null}
        <Menu onClick={this.handleToggle} className={isSmall ? isToogled : null}  mode={isSmall ? 'inline' : 'horizontal'} >
        <Menu.Item><Link to='/'>Home</Link></Menu.Item>
          {
            routeList.map(({ key, name }) => <Menu.Item active={location.pathname === `${match.path}${key}`} key={name} name={name}> <Link to={`${match.path}${key}`}> {name}</Link> </Menu.Item>)
          }
        </Menu>
  
        {location.pathname === '/profile' ? <Stats /> : null}
      </div>
    )
}
}


export default Profile;