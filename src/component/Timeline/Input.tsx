import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { BiPlus, BiUpArrowAlt, BiCamera } from 'react-icons/bi';

import { useAppDispatch } from '../../hooks/redux';
import { addCard } from '../../redux/reducers/cardListSlice';

import { format } from 'date-fns';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';
import useWindowWidth from '../../hooks/layout';

type FABtoTEXTProps = {
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

const FABtoTEXT = styled.div<FABtoTEXTProps>`
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
    
    .fab {
        color: ${palette[2]};
        margin: 0.5rem;
        font-size: 2rem;
    }
`;
const TextInput = styled.div`
    display: flex;
    textarea {
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

    @media (min-width: ${mediaQuery.tablet}px) {

    }
`;

type FABtoToastProps = {
    active: boolean,
}
const FABtoToast = styled.div<FABtoToastProps>`
    width: 3rem;
    height: 3rem;

    position: absolute;
    bottom: 1rem;
    left: calc(50% - 1.5rem);

    background: ${palette[6]};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    border-radius: 50%;

    .fab {
        color: ${palette[2]};
        margin: 0.5rem;
        font-size: 2rem;
    }

    ${(props) => props.active && css`
        transform: translateY(5rem);
        transition: transform 0.5s ease;
    `}
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
            console.log(e.target.tagName, e.target.dataset.value);
            if (isActive && e.target.dataset.value !== 'textinput' ) {
                activeToggle();
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
            <FABtoTEXT active={isActive} data-value="textinput">
                {isActive ? 
                    <TextInput data-value="textinput">
                        <textarea 
                            data-value="textinput" 
                            id="textInput"
                            ref={textArea} 
                            value={typedText}
                            onChange={onTyped} 
                            placeholder="Input your moment"
                        />
                        <BiCamera className="upBtn" data-value="textinput" style={{ marginRight: 0 }} onClick={onUploadFile}/>
                        <input type="file" data-value="textinput" ref={fileuploader} hidden />
                        <BiUpArrowAlt className="upBtn" data-value="textinput" onClick={onSubmit}/>
                    </TextInput>
                    :<BiPlus className="fab" onClick={activeToggle} />
                }   
            </FABtoTEXT> :
            <FABtoToast active={isActive} >
                {isActive ? <div>fdkjfk</div> :<BiPlus className="fab" onClick={activeToggle} />}  
            </FABtoToast>
        }
        </>
    );
};

export default Input;