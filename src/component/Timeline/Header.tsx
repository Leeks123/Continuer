import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks/redux';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';
import { setDate } from 'date-fns/esm';

const Wrapper = styled.header`
    width: 100%;
    height: 3rem;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;

    background: ${palette[0]};
    box-shadow: 0 0 10px rgba(0,0,0,0.2);

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
    const listDate = useAppSelector((state) => state.content.topElDate);
    const [date, setDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    })
    const monthWords = [
        'January','February','March','April','May','June','July','August','September','October','November','December'
    ]
    useEffect(() => {
        setDate(listDate);
    }, [listDate]);

    return (
        <Wrapper>
            <Container>
                <YearMonth>
                    <span>{monthWords[date.month]}  <small>{date.year}</small></span>
                </YearMonth>
            </Container>
        </Wrapper>
    );
};

export default Header;