import React from 'react';
import styled from 'styled-components';
import mediaQuery from '../../utils/mediaQuery';
import palette from '../../utils/palette';

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
`;
const Container = styled.div`
    height: 100%;
    border: 1px solid red;
    @media (min-width: ${mediaQuery.tablet}px) {
    }
    @media (min-width: ${mediaQuery.laptop}px) {
        max-width: ${mediaQuery.laptop}px;
        margin: 0 auto;
    }
`;

const HabitList = () => {
    return (
        <Wrapper>
            <Container>
                dsfkdsjfk
            </Container>
        </Wrapper>
    );
};

export default HabitList;