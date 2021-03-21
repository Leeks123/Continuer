import React from 'react';
import styled from 'styled-components';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';

const Wrapper = styled.header`
    width: 100%;
    height: 3rem;

    position: fixed;
    top: 0;
    left: 0;

    background: ${palette[0]};
    box-shadow: 0 0 10px rgba(0,0,0,0.3);

    @media (min-width: ${mediaQuery.tablet}px) {
        height: 4rem;
    }
`;

const Container = styled.div`
    padding: 0.5rem 1rem;

    @media (min-width: ${mediaQuery.tablet}px) {
        padding: 1rem 2rem;
    }
    @media (min-width: ${mediaQuery.laptop}px) {
        max-width: ${mediaQuery.tablet}px;
        margin: 0 auto;
    }
`;
const YearMonth = styled.div`
    font-size: 1.75rem;
    font-weight: 600;

    small { 
        font-size: 1.25rem;
        font-weight: 400;
    }
`;

const Header = () => {
    return (
        <Wrapper>
            <Container>
                <YearMonth>
                    <span>March  <small>2021</small></span>
                </YearMonth>
            </Container>
        </Wrapper>
    );
};

export default Header;