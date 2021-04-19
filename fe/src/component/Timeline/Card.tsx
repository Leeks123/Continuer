/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import { BiX } from 'react-icons/bi';
import { format } from 'date-fns';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';
import { useWindowWidth } from '../../hooks/layout';
import ImageBox from './ImageBox';
import { deleteCard } from '../../redux/reducers/cardListSlice';
import { useAppDispatch } from '../../hooks/redux';

type styleProps = {
    right?: boolean,
    swipe?: boolean,
}
const Wrapper = styled.section<styleProps>`
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;

    width: 100%;
    box-sizing: content-box;
    // margin: 0.25rem 0 1rem 0;
    display: flex;
    position: relative;

    @media (min-width: ${mediaQuery.mobile}px) {
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        width: 50%;
        ${(props) => props.right && `
            transform: translateX(99%);
        `}
    }
    @media (min-width: ${mediaQuery.laptop}px) {
    }

    // .leaf-container {
    //     background: red;
    // }
`;

const Leaf = styled.div<styleProps>`
    width: 80%;
    height: 85%;

    margin: 0.25rem 0 1rem 0;
    // padding: 1rem;

    overflow: hidden;
    
    // background: ${palette[0]};
    background: red;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 20px 0px 20px 0px;
    ${(props) => props.right && `
        border-radius: 0px 20px 0px 20px;
    `}

    box-sizing: border-box;

    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.03);
        span {
            right: 0.5rem;
        }
    }
    p {
        word-break: normal;
        word-wrap: break-word;
        margin: 0;
    }

    @media (min-width: ${mediaQuery.mobile}px) {
        width: 85%;
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        width: 80%;
    }
    @media (min-width: ${mediaQuery.laptop}px) {
    }

    & > div {
        position: relative;
        background: ${palette[0]};
        border: 2px solid ${palette[0]};
        padding: 1rem;
        ${(props) => props.swipe && `
            left: -3rem;
        `}
        z-index: 1;
    }
    & > span {
        position: absolute;
        top: 20%;
        ${(props) => props.right ? `
            left: calc(100% - 2.5rem);
        `:`
            right: 23%;
            @media (min-width: ${mediaQuery.mobile}px) {
                right: 17.5%;
            }
            @media (min-width: ${mediaQuery.tablet}px) {
                right: 23%;
            }
        `}
        color: white;
        font-weight: bold;
    }
`;
const Branch = styled.div<styleProps>`
    width: 20%;
    margin-top: 1.5rem;
    ${(props) => props.right ?
        `border-left: 0.25rem solid ${palette[5]};`:
        `border-right: 0.25rem solid ${palette[5]};`
    }
    @media (min-width: ${mediaQuery.mobile}px) {
        width: 15%;
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        width: 20%;
    }
    @media (min-width: ${mediaQuery.laptop}px) {
    }
`;
const Node = styled.div<styleProps>`
    position: relative;
    .time {
        position: absolute;
        opacity: 0.5;
        margin: 0 2rem 0 0;
        top: -1.25rem;
        left: calc(100% - 2.75rem);
        font-size: 0.5rem;
        
        @media (min-width: ${mediaQuery.mobile}px) {
            font-size: 0.75rem;
            top: -1.25rem;
            left: calc(100% - 3rem);
        }
        @media (min-width: ${mediaQuery.tablet}px) {
            ${(props) => props.right ? 
                'left: calc(100% - 3rem);':
                'left: calc(100% - 3rem);'}
        }
        @media (min-width: ${mediaQuery.laptop}px) {
            left: calc(100% - 3.25rem);
        }
    }
    & .dot {
        width: 1rem;
        height: 1rem;
        background: ${palette[5]};
        border-radius: 50%;

        position: relative;
        ${(props) => props.right ? `left: -10px;`:`left: calc(100% - 6px);`}
        bottom: 1.25rem;
    }
`;

type CardProps = {
    id: number,
    text: string,
    date: string,
    rightSide?: boolean,
    images?: string[] | null
}
const Card = React.forwardRef<HTMLElement, CardProps>(({ id,text, date, rightSide, images }, ref) => {
    const windowWidth = useWindowWidth();
    const dispatch = useAppDispatch();

    const onDelete = useCallback(() => {
        console.log('ondelete', id);
        dispatch(deleteCard(id));
        setSwiped(false);
    }, [id]);

    const [isSwiped,setSwiped] = useState<boolean>(false);
    const config = {
        delta: 10,                            // min distance(px) before a swipe starts
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: true,                    // track mouse input
        rotationAngle: 0,                     // set a rotation angle
    }
    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            setSwiped(true);
            console.log("User Swiped!", eventData);
        },
        onSwipedRight: (eventData) => {
            setSwiped(false);
            console.log("User Swiped!", eventData);
        },
        ...config,
    });
    return (
        <div>
        {rightSide && windowWidth >= mediaQuery.tablet ?
            <div {...handlers}>
                <Wrapper ref={ref} right={rightSide} data-date={date} onClick={()=>console.log(id)}>
                    <Branch right={rightSide}>
                        <Node right={rightSide}>
                            <div className="dot"></div>
                            <small className="time">{format(Date.parse(date),'HH:mm')}</small>
                        </Node>
                    </Branch>
                    <Leaf right={rightSide} swipe={isSwiped}>
                        <div>
                            {images && <ImageBox images={images} />}
                            {text.split('\n').map((line,i) => (<p key={i}>{line}</p>))}
                        </div>
                        <span><BiX onClick={onDelete} style={{ fontSize: '2rem' }}/></span>
                    </Leaf>
                </Wrapper>
            </div>:
            <div {...handlers}>
                <Wrapper ref={ref} data-date={date} onClick={()=>console.log(id)}>
                    <Leaf swipe={isSwiped}>
                        <div>
                            {images && <ImageBox images={images} />}
                            {text.split('\n').map((line,i) => (<p key={new Date().toString()+i}>{line}</p>))}
                        </div>
                        <span><BiX onClick={onDelete} style={{ fontSize: '2rem' }}/></span>
                    </Leaf>
                    <Branch>
                        <Node>
                            <div className="dot"></div>
                            <small className="time">{format(Date.parse(date),'HH:mm')}</small>
                        </Node>
                    </Branch>
                </Wrapper>
            </div>
        }
        </div>
    );
});

export default Card;