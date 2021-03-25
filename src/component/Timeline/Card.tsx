import React from 'react';
import styled from 'styled-components';

import { format } from 'date-fns';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';

const Wrapper = styled.section`
    width: 100%;
    box-sizing: content-box;

    display: flex;

    @media (min-width: ${mediaQuery.mobile}px) {
    }
    @media (min-width: ${mediaQuery.tablet}px) {
    }
    @media (min-width: ${mediaQuery.laptop}px) {
    }
`;

const Leaf = styled.div`
    // flex:1;
    width: 80%;
    height: 85%;

    margin: 1rem 0;
    padding: 1rem;

    position: relative;

    overflow: hidden;
    
    background: ${palette[0]};
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 20px 0px 20px 0px;

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
`;
const Branch = styled.div`
    width: 20%;
    margin-top: 1.5rem;
    border-right: 0.25rem solid ${palette[5]};

`;
const Node = styled.div`
    position: relative;
    .time {
        position: relative;
        opacity: 0.5;
        margin: 0 2rem 0 0rem;
        top: -1.75rem;
        left: calc(100% - 3.5rem);
        font-size: 0.5rem;
        
        @media (min-width: ${mediaQuery.mobile}px) {
            font-size: 0.75rem;
            top: -1.25rem;
            left: calc(100% - 4.5rem);
        }
        @media (min-width: ${mediaQuery.tablet}px) {
            // left: calc(100% - 5rem);
        }
        @media (min-width: ${mediaQuery.laptop}px) {
            font-size: 1rem;
            left: calc(100% - 6rem);
        }
    }
    & .dot {
        width: 1rem;
        height: 1rem;
        background: ${palette[5]};
        border-radius: 50%;

        position: relative;
        left: calc(100% - 6px);
        bottom: 1.25rem;
    }
`;

type CardProps = {
    text: string,
    date: string,
}
const Card = ({ text, date }:CardProps) => {
    return (
        <Wrapper>
            <Leaf >
                {text.split('\n').map( line => (<p>{line}</p>))}
            </Leaf>
            <Branch>
                <Node>
                    <div className="dot"></div>
                    <small className="time">{format(Date.parse(date),'HH:mm:ss')}</small>
                </Node>
            </Branch>
        </Wrapper>
    );
};

export default Card;