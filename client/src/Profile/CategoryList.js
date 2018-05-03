import React, {Component, Fragment} from 'react';
import Category from './Category';
import {AppConsumer} from '../StateContext';
import { List, Row, Col } from 'antd';
import {gridConfig} from '../gridConfig';
class Categorylist extends Component {
    render(){
       return (
            <Row className="row-main-wrapper">
              <Col {...gridConfig}>
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md:3, lg: 3, xl: 4, xxl: 6 }}
                    dataSource={this.props.categoryVal}
                    renderItem={item => (
                      <List.Item key={item}>
                        <Category category={item} />
                      </List.Item>
                    )}
                  />
                  </Col>
               </Row>
        )
    }
}

export default props => (
    <AppConsumer>
      {({categoryVal}) => <Categorylist {...props} categoryVal={categoryVal} />}
    </AppConsumer>
  )