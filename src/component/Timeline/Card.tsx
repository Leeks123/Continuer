import React from 'react';
import styled from 'styled-components';

import { format } from 'date-fns';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';
import { useWindowWidth } from '../../hooks/layout';
import ImageBox from './ImageBox';

type styleProps = {
    right?: boolean,
}
const Wrapper = styled.section<styleProps>`
    width: 100%;
    box-sizing: content-box;

    display: flex;

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
`;

const Leaf = styled.div<styleProps>`
    width: 80%;
    height: 85%;

    margin: 0.25rem 0 1rem 0;
    padding: 1rem;

    overflow: hidden;
    
    background: ${palette[0]};
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 20px 0px 20px 0px;
    ${(props) => props.right && `
        border-radius: 0px 20px 0px 20px;
    `}

    box-sizing: border-box;

    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.03);   
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
    text: string,
    date: string,
    rightSide?: boolean,
    images?: string[],
}
const Card = React.forwardRef<HTMLElement, CardProps>(({ text, date, rightSide, images }, ref) => {
    const windowWidth = useWindowWidth();
    return (
        <>
        {rightSide && windowWidth >= mediaQuery.tablet ?
            <Wrapper ref={ref} right={rightSide} data-date={date}>
                <Branch right={rightSide}>
                    <Node right={rightSide}>
                        <div className="dot"></div>
                        <small className="time">{format(Date.parse(date),'HH:mm')}</small>
                    </Node>
                </Branch>
                <Leaf right={rightSide}>
                    {images && <ImageBox images={images} />}
                    {text.split('\n').map( line => (<p>{line}</p>))}
                </Leaf>
            </Wrapper>:
            <Wrapper ref={ref} data-date={date}>
                <Leaf >
                    {images && <ImageBox images={images} />}
                    {text.split('\n').map( line => (<p>{line}</p>))}
                </Leaf>
                <Branch>
                    <Node>
                        <div className="dot"></div>
                        <small className="time">{format(Date.parse(date),'HH:mm')}</small>
                    </Node>
                </Branch>
            </Wrapper>
        }
        </>
    );
});

export default Card;