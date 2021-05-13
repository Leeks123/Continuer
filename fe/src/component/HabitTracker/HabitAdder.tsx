import React, { useState } from 'react';
import styled from 'styled-components';
import mediaQuery from '../../utils/mediaQuery';
import palette from '../../utils/palette';
import FAB from '../common/FAB';
import HabitForm from './HabitForm';

export type ToastProps = {
    active?: boolean,
}
export const Toast = styled.div<ToastProps>`
    width: 100%;
    max-width: ${mediaQuery.tablet}px;
    height: 150vh;

    background: ${palette[0]};
    border-radius: 50px 50px 0 0;
    padding: 2rem;
    padding-top: .5rem;
    box-sizing: border-box;
    
    position: fixed;
    top: 100vh;
    left: 0;
    z-index: 20;

    transition: transform 0.5s cubic-bezier(.06,.66,.56,1.69) 0.5s;
    ${(props) => props.active ? `
        transform: translateY(-50vh);
        box-shadow: 0 0 100px rgba(0,0,0,0.4);
    `:''}

    @media (min-width: ${mediaQuery.tablet}px) {
        left: calc(50% - ${mediaQuery.tablet / 2}px);
    }
`;
const HabitAdder = () => {
    const [isToastActive,setFabToggle] = useState(false);
    return (
        <div>
            <FAB 
                pos="right" 
                moveTo="down" 
                toggle={()=>{setFabToggle(!isToastActive)}} 
                active={isToastActive}
            ></FAB>
            <Toast active={isToastActive}>
                <HabitForm toggle={setFabToggle} active={isToastActive}/>
            </Toast>
        </div>
    );
};

export default HabitAdder;