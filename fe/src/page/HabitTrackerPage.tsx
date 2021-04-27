import React from 'react';
import styled from 'styled-components';

import Header from '../component/common/Header';
import DateView from '../component/HabitTracker/DateView';
import HabitAdder from '../component/HabitTracker/HabitAdder';
import HabitList from '../component/HabitTracker/HabitList';
import mediaQuery from '../utils/mediaQuery';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`;
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding-top: 3rem;

    @media (min-width: ${mediaQuery.tablet}px) {
        padding-top: 4rem;
    }
`;

const HabitTrackerPage = () => {
    return (
        <Wrapper>
            <Header/>
            <Container>
                <DateView />
                <HabitList />
                <HabitAdder />
            </Container>
        </Wrapper>
    );
};

export default HabitTrackerPage;