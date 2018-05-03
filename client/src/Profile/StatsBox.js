import {  Progress } from 'antd';
import React from 'react';

const StatsBox = ({nr, status, percent}) => {
    return (
        <div className="stats-box">
            <Progress status={status} type="circle" percent={percent} format={percent => `${percent} %`}/>
            <span className="total-nr-stats">Total: {nr}</span>
        </div>
    )
}

export default StatsBox;