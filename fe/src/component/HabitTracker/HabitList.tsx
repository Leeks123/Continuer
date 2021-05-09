import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../hooks/redux';

import mediaQuery from '../../utils/mediaQuery';

import DraggableList from './DraggableList/index';

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
`;
const Container = styled.div`
    height: 100%;
    
    @media (min-width: ${mediaQuery.tablet}px) {
    }
    @media (min-width: ${mediaQuery.laptop}px) {
        max-width: ${mediaQuery.laptop}px;
        margin: 0 auto;
    }
`;

const HabitList = () => {
    const habitList = useAppSelector(state => state.habit.habitlist);
    return (
        <Wrapper>
            <Container>
                <DraggableList list={habitList} />
            </Container>
        </Wrapper>
    );
};

export default HabitList;