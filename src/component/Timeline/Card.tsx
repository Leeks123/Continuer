import React from 'react';
import styled from 'styled-components';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';

const Wrapper = styled.section`
    width: 100%;
    height: 200px;
    box-sizing: content-box;
    overflow: hidden;

    display: flex;

    @media (min-width: ${mediaQuery.mobile}px) {
    }
    @media (min-width: ${mediaQuery.tablet}px) {
    }
    @media (min-width: ${mediaQuery.laptop}px) {
}
`;

const Leaf = styled.div`
    width: 70%;
    height: 90%;

    margin: 1rem 0;
    padding: 1rem;

    position: relative;
    
    background: ${palette[0]};
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    border-radius: 20px 0px 20px 0px;

    box-sizing: border-box;

    &:hover {
        transform: scale(1.02);
        transition: transform 0.6s ease;
    }
`;
const Side = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;
const Node = styled.div`
    height: 1rem;
    margin-bottom: 0.5rem;
    
    & .dot {
        width: 1rem;
        background: ${palette[5]};
        border-radius: 50%;
    }
`;
const Line = styled.div`
    flex: 1;
    border-right: 0.25rem solid ${palette[5]};
`;

const Card = () => {
    return (
        <Wrapper>
            <Leaf />
            <Side>
                <Node>
                    <span>21:04</span>
                    <div className="dot">o</div>
                </Node>
                <Line />
            </Side>
        </Wrapper>
    );
};

export default Card;