import React, { useState } from 'react';
import styled from 'styled-components';
import FAB from '../common/FAB';

const HabitAdder = () => {
    const [isFabActive,setFabToggle] = useState(false);
    return (
        <div>
            <FAB pos="right" moveTo="down" toggle={()=>{setFabToggle(!isFabActive)}} active={isFabActive}></FAB>
        </div>
    );
};

export default HabitAdder;