import React, { Component } from 'react';
import { Button, Card,Icon,  Select } from 'semantic-ui-react'

const repetitions = ['1 day', '1 week', '2 weeks', '1 months', '3 months', '6 months', '1 year']
const names = [{ key: 'good', text: 'Good', color: 'green' }, { key: 'notbad', text: 'Not bad', color: 'blue' }, { key: 'bad', text: 'Bad', color: 'red' }]

class ProfileEdit extends Component {

    renderRepetitions() {

        let options = repetitions.map((rep, i) => (
            Object.assign({}, rep, {key: i, value: rep, text: rep})
        ))
        
        return names.map(({color, text}, i)=> (


                <div key={i} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', margin: '10px 0'}}>
                <Select action={{ color: 'teal', labelPosition: 'left', icon: 'cart', content: 'Checkout' }} value="1 day" placeholder='Select interval' options={options} />
                </div>
        ))
    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                <Card style={{margin: 'auto'}}>
                    <Card.Content>
                        <Button floated="right" size="mini" basic color='red'>Delete account</Button>
                        <Card.Header>
                            Szachgr
                        </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Description>
                            Repetitions settings <Icon name="setting" />
                        </Card.Description>

                        
                            {this.renderRepetitions()}
                            
                        
                        <Button fluid color="green">Save</Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default ProfileEdit;