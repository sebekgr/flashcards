import React from 'react';

import {Button} from 'antd'
const ButtonGroup = Button.Group;

const ChoiceGroup = ({handleChoice, active}) => (
    <ButtonGroup onClick={handleChoice}>
        <Button disabled={active === 'original'} name="original">by Original</Button>
        <Button disabled={active === 'translation'}  name="translation">by Translation</Button>
        <Button disabled={active === 'random'} name="random">by Random</Button>
    </ButtonGroup>
)

export default ChoiceGroup;