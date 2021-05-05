import React from 'react';
import styled from 'styled-components';

import mediaQuery from '../../utils/mediaQuery';
import palette from '../../utils/palette';

import DraggableList from './DraggableList/index';
import Habit from './Habit';

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
                {/* {new Array(5).fill(0).map((v) => <Habit />)} */}
                <DraggableList list={[1,2,3,4,5]} />
            </Container>
        </Wrapper>
    );
};

export default HabitList;