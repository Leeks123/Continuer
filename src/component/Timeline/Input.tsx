import React, { useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { BiPlus, BiUpArrowAlt } from 'react-icons/bi';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';

type WrapperProps = {
    active: boolean,
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
        width: calc(100% - 2rem);
        height: 4rem;
        background: ${palette[1]};
    }
`;
const Wrapper = styled.div<WrapperProps>`
    width: 3rem;
    height: 3rem;

    position: absolute;
    bottom: 1rem;
    right: 1rem;

    background: ${palette[6]};
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
    border-radius: 50%;
    
    ${(props) => props.active && css`
        animation: ${circleToBox} 0.5s 0s linear alternate forwards;
    `}


    @media (min-width: ${mediaQuery.mobile}px) {
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        right: calc(50% - 1.5rem);
        animation: none; // make leafs
    }
    @media (min-width: ${mediaQuery.laptop}px) {
    }
`;
const Container = styled.div`
    width: 100%;
    .fab {
        color: ${palette[2]};
        margin: 0.5rem;
        font-size: 2rem;
    }
    & > div {
        display: flex;
        .textInput {
            width: calc(100% - 3rem);
            margin: 0.75rem;
            margin-right: 0;
            border: none;
    
            font-size: 1.25rem;
        }
        .upBtn {
            font-size: 2rem;
            margin: 0.75rem;
            color: white;
            background: black;
            border-radius: 50%;
        }
    }
`;

const Input = () => {
    const [isActive,setActive] = useState<boolean>(false);
    const [textInputed,setTextInputed] = useState<boolean>(false);
    const [textAreaHeight, setTextAreaHeight] = useState<number>(64);
    const textArea = useRef<HTMLTextAreaElement>(null);
    const onClick = () => {
        setActive(!isActive);
    }
    const onTyped = (e:any) => {
        console.log(e.target.value);
        console.log(textArea.current?.clientHeight, textArea.current?.scrollHeight);
        setTextInputed(true);
        if (textArea.current) {
            setTextAreaHeight(+(textArea.current?.scrollHeight)+24);
        }
    }
    console.log('rendered',textAreaHeight);
    return (
        <Wrapper active={isActive} style={{ height: `${textAreaHeight}px`}}>
            <Container>
                {isActive ? 
                    <div>
                        <textarea 
                            className="textInput" 
                            ref={textArea} 
                            onKeyDown={onTyped} 
                            placeholder="Input your moment"
                        />
                        <BiUpArrowAlt className="upBtn"/>
                    </div>:
                    <BiPlus className="fab" onClick={onClick} />
                }   
            </Container>
        </Wrapper>
    );
};

export default Input;