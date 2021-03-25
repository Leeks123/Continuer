import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { BiPlus } from 'react-icons/bi';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';

enum FABposition {
    Right = 'right',
    Center = 'center',
    Left = 'left'
}
enum FABmove {
    Down = 'down',
    Right = 'right',
    Left = 'left'
}
type StyledProps = {
    pos: FABposition | string,
    active: boolean,
    toBox?: boolean,
    move?: FABmove | string,
}
const circleToBox = keyframes`
    from {
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
        background: ${palette[6]};
    }
    to {
        border-radius: 3%;
        max-width: ${mediaQuery.tablet}px;
        width: calc(100% - 2rem);
        background: ${palette[1]};
    }
`;
const Wrapper = styled.div<StyledProps>`
    width: 3rem;
    height: 3rem;

    position: absolute;
    bottom: 1rem;
    ${(props) => props.pos &&
        props.pos === FABposition.Right ? `right: 1rem;` :
        props.pos === FABposition.Center ? `left: calc(50% - 1.5rem);` : 
        `left: 1rem;`
    }

    background: ${palette[6]};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border-radius: 50%;

    .fab {
        color: ${palette[2]};
        margin: 0.5rem;
        font-size: 2rem;
    }

    ${(props) => props.active && props.toBox && css`
        animation: ${circleToBox} 0.3s 0s linear alternate forwards;
        ${props.pos === FABposition.Center ? `transform: translateX(calc(-50% + 1.5rem));`:''}
    `}
    ${(props) => props.active && props.move ?
        props.move === FABmove.Right ? `transform: translateX(20rem);transition: transform 0.5s ease-in;` :
        props.move === FABmove.Left ? `transform: translateX(-20rem);transition: transform 0.5s ease-in;` : 
        `transform: translateY(5rem);transition: transform 0.5s ease-in;`:''
    }
`;
const Toast = styled.div`
    max-width: 500px;
    width: 100vw;
    height: 200px;
    background: ${palette[6]};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    position: absolute;
    transform: translate(-45%,-90%);
    border-radius: 50px 50px 0 0;

`;

type FABProps = {
    pos: string,
    toBox?: boolean | false,
    moveTo?: string,
    children?: React.ReactNode
}
const FAB = ({ pos,toBox,moveTo, children }:FABProps) => {
    const [isActive,setActive] = useState<boolean>(false);
    const activeToggle = () => {
        setActive(!isActive);
    };
    console.log(isActive);
    return (
        <Wrapper pos={pos} active={isActive} toBox={toBox} move={moveTo}>
            {toBox && isActive && children ? (children) :<BiPlus className="fab" onClick={activeToggle}/>}
            {moveTo && children && <Toast >{children}</Toast>}
        </Wrapper>
    );
};

export default FAB;