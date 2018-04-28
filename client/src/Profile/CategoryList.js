import React, {Component, Fragment} from 'react';
import Category from './Category';
import {AppConsumer} from '../StateContext';
import { List } from 'antd';
class Categorylist extends Component {
    render(){
       return (
            <Fragment>
                <List className="category-list"
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
                  style={{width: '100%', textAlign: 'center'}}
                    dataSource={this.props.categoryVal}
                    renderItem={item => (
                      <List.Item style={{display: 'flex', justifyContent:'space-around'}} key={item}>
                        <Category category={item} />
                      </List.Item>
                    )}
                  />
               </Fragment>
        )
    }
}

export default props => (
    <AppConsumer>
      {({categoryVal}) => <Categorylist {...props} categoryVal={categoryVal} />}
    </AppConsumer>
  )