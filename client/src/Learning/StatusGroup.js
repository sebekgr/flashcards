import React from 'react';

import {Button} from 'antd'
const ButtonGroup = Button.Group;

const StatusGroup = ({setStatus}) => (
    <ButtonGroup onClick={setStatus}>
        <Button icon="smile-o" style={{color: 'green'}} name="good">Good</Button>
        <Button icon="meh-o" style={{color: 'blue'}} name="notbad">Bad</Button>
        <Button icon="frown-o" style={{color: 'red'}} name="bad">Not bad</Button>
    </ButtonGroup>
)

export default StatusGroup;