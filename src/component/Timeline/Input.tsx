import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { BiPlus, BiUpArrowAlt, BiCamera } from 'react-icons/bi';

import { useAppDispatch } from '../../hooks/redux';
import { addCard } from '../../redux/reducers/cardListSlice';

import { format } from 'date-fns';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';
import useWindowWidth from '../../hooks/layout';

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
        height: 5rem;
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
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border-radius: 50%;
    
    ${(props) => props.active && css`
        animation: ${circleToBox} 0.3s 0s linear alternate forwards;
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
            width: calc(100% - 5rem);
            height: 3.25rem;
            margin: 0.75rem;
            margin-right: 0;
            border: none;
    
            font-size: 1.25rem;
        }
        .upBtn {
            border: 3px solid black;
            font-size: 2rem;
            margin: 0.75rem;
            color: white;
            background: black;
            border-radius: 50%;
        }
    }
`;

const Input = () => {
    const dispatch = useAppDispatch();
    const [isActive,setActive] = useState<boolean>(false);
    const [typedText, setText] = useState<string>('');
    const textArea = useRef<HTMLTextAreaElement>(null);
    const fileuploader = useRef<HTMLInputElement>(null);
    const windowWidth = useWindowWidth();

    const activeToggle = () => {
        setActive(!isActive);
        setText('');
    };
    useEffect(() => {
        isActive && textArea.current?.focus();
    }, [isActive]);

    const onTyped = useCallback((e:any) => {
        setText(e.target.value);
        console.log(e.target.value);
    },[]);

    const onUploadFile = () => {
        fileuploader.current?.click();
    };

    const onSubmit = () => {
        const date = new Date();
        console.log(format(date,'Y LLLL d HH mm ss'));
        dispatch(addCard({
            text: typedText,
            date: date.toString()
        }))
        setText('');
    }

    useEffect(() => {
        function elemCheck(e:any) {
            // console.log(e.target.tagName);
            if (isActive && e.target.id !== 'textInput' ) {
                if (e.target.tagName !== 'path') {
                    activeToggle();
                }
            }
        }
        window.addEventListener('click', elemCheck);
        return () => {
            window.removeEventListener('click', elemCheck);
        }
    }, [isActive])

    return (
        <Wrapper active={isActive}>
            <Container id="textInput">
                {isActive && windowWidth < mediaQuery.tablet ? 
                    <div className="textInput" id="textInput">
                        <textarea 
                            className="textInput" 
                            id="textInput"
                            ref={textArea} 
                            value={typedText}
                            onChange={onTyped} 
                            placeholder="Input your moment"
                        />
                        <BiCamera className="upBtn" id="textInput" style={{ marginRight: 0 }} onClick={onUploadFile}/>
                        <input type="file" id="textInput" ref={fileuploader} hidden />
                        <BiUpArrowAlt className="upBtn" id="textInput" onClick={onSubmit}/>
                    </div>:
                    <BiPlus className="fab" onClick={activeToggle} />
                }   
            </Container>
        </Wrapper>
    );
};

export default Input;