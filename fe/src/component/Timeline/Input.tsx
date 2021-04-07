import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { BiUpArrowAlt, BiCamera } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCard } from '../../redux/reducers/cardListSlice';

import { format } from 'date-fns';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';
import { useWindowWidth } from '../../hooks/layout';
import FAB from './FAB';

const TextInput = styled.div`
    z-index: 5;
    display: flex;
    textarea {
        width: calc(100% - 5rem);
        height: 3.25rem;
        margin: 0.75rem;
        margin-right: 0;
        border: none;

        font-size: 1.25rem;

        &:focus {
            outline: none;
        }
    }
    .upBtn {
        border: 3px solid black;
        font-size: 2rem;
        margin: 0.75rem;
        color: white;
        background: black;
        border-radius: 50%;
    }
`;

type ToastProps = {
    active?: boolean,
}
const Toast = styled.div<ToastProps>`
    z-index: 5;
    width: 100%;
    max-width: ${mediaQuery.tablet}px;
    height: 35vh;

    background: ${palette[0]};
    border-radius: 50px 50px 0 0;
    padding: 2rem;
    box-sizing: border-box;

    position: fixed;
    top: 100vh;
    left: calc(50% - ${mediaQuery.tablet / 2}px);

    transition: transform 0.5s cubic-bezier(.06,.66,.56,1.69) 0.5s;
    ${(props) => props.active ? `
        transform: translateY(-25vh);
        box-shadow: 0 0 100px rgba(0,0,0,0.4);
    `:''}
`;

const ToastInput = styled.div`
    display: flex;
    textarea {
        flex: 8;
        width: 100%;
        height: 8rem;
        margin: 0.75rem;
        margin-right: 0;
        border: none;

        font-size: 1.25rem;
        
        &:focus {
            outline: none;
        }
    }
    & > div {
        flex: 1;
        .upBtn {
            border: 3px solid black;
            font-size: 2.5rem;
            margin: 0.75rem 1rem;
            color: white;
            background: black;
            border-radius: 50%;
        }
    }
`;

const Input = () => {
    const dispatch = useAppDispatch();
    const lastID = useAppSelector(state => state.content.lastID);
    const [isActive,setActive] = useState<boolean>(false);
    const [typedText, setText] = useState<string>('');
    const textArea = useRef<HTMLTextAreaElement>(null);
    const fileuploader = useRef<HTMLInputElement>(null);
    const windowWidth = useWindowWidth();

    const activeToggle = () => {
        console.log(isActive);
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
        dispatch(addCard(typedText));
        setText('');
        activeToggle();
    }

    useEffect(() => {
        function elemCheck(e:any) {
            console.log(e.target.tagName, e.target.dataset.value);
            if (isActive && e.target.dataset.value !== 'textinput' ) {
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
        <>
        {windowWidth < mediaQuery.tablet ? 
            <div>
                <FAB pos="right" toBox toggle={activeToggle} active={isActive}>
                    <TextInput data-value="textinput">
                        <textarea 
                            data-value="textinput" 
                            id="textInput"
                            ref={textArea} 
                            value={typedText}
                            onChange={onTyped} 
                            placeholder="Input your moment"
                        />
                        <BiCamera className="upBtn" data-value="textinput" style={{ marginRight: 0, cursor: "pointer" }} onClick={onUploadFile}/>
                        <input type="file" data-value="textinput" ref={fileuploader} hidden />
                        <BiUpArrowAlt className="upBtn" data-value="textinput" style={{ cursor: "pointer" }} onClick={onSubmit}/>
                    </TextInput>
                </FAB>
            </div> :
            <>
                <FAB pos="center" moveTo="down" toggle={activeToggle} active={isActive}></FAB>
                <Toast active={isActive} data-value="textinput">
                    <ToastInput data-value="textinput">
                        <textarea 
                            data-value="textinput" 
                            id="textInput"
                            ref={textArea} 
                            value={typedText}
                            onChange={onTyped} 
                            placeholder="Input your moment"
                        />
                        <div data-value="textinput">
                            <BiCamera className="upBtn" data-value="textinput" style={{ marginRight: 0, cursor: "pointer" }} onClick={onUploadFile}/>
                            <input type="file" data-value="textinput" ref={fileuploader} hidden />
                            <BiUpArrowAlt className="upBtn" data-value="textinput" style={{ cursor: "pointer" }} onClick={onSubmit}/>
                        </div>
                    </ToastInput>
                </Toast>
            </>
        }
        </>
    );
};

export default Input;