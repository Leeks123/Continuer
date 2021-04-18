import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { BiChevronDown } from 'react-icons/bi'

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { sub } from 'date-fns';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';
import { loadDataByDate } from '../../redux/reducers/cardListSlice';
import Menu from './Menu';

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
    display: flex;
    justify-content: space-between;

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

const PickerMove = keyframes`
    from {
        transform: translateY(-100%);
    }
    to {
        transform: translateY(0%);
    }
`
type PickerContainerProps = {
    active: boolean
}
const PickerContainer = styled.div<PickerContainerProps>`
    width: 100%;
    max-width: ${mediaQuery.tablet}px;
    box-sizing: border-box;

    background: ${palette[0]};
    box-shadow: 0 0 100px rgba(0,0,0,0.4);
    border-radius: 0 0 50px 50px;
    padding: 0 1rem 1rem;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    transform: translateY(-100%);
    ${(props)=>props.active && css`
        animation: ${PickerMove} 0.3s linear forwards;
    `}

    .DayPicker-Day:focus {
        outline: none;
    }
    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
        background-color: ${palette[5]};
        color: #fff;
        font-weight: bold;
      }
    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside):hover {
        background-color: ${palette[4]};
    }
`;
const StyledChevronDown = styled(BiChevronDown)`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    color: ${palette[0]};
    background: ${palette[5]};
    &:hover {
        background: ${palette[6]};
    }
`;

const Header = () => {
    const dispatch = useAppDispatch();
    const listDate = useAppSelector((state) => state.content.topElDate);
    const [date, setDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    })
    const [isPickerOpen, pickerToggle] = useState<boolean>(false);
    const [selectedDay,setSelectedDay] = useState<any>(undefined);
    const monthWords = [
        'January','February','March','April','May','June','July','August','September','October','November','December'
    ]
    useEffect(() => {
        setDate(listDate);
    }, [listDate]);

    const onDayClick = (day: Date, { selected }: any) => {
        setSelectedDay(selected ? undefined : day)
    }
    const onBtnClick = () => {
        pickerToggle(false);
        if(selectedDay) {
            dispatch(loadDataByDate(sub(selectedDay,{days:1}).toString()));
        }
    }
    return (
        <Wrapper>
            {isPickerOpen ?
                <PickerContainer active={isPickerOpen}>
                    <DayPicker 
                        month={new Date(date.year,date.month)}
                        selectedDays={selectedDay}
                        onDayClick={onDayClick}
                    />
                    <StyledChevronDown onClick={onBtnClick}/>
                </PickerContainer>:
                <Container>
                    <YearMonth onClick={() => pickerToggle(true)}>
                        <span>{monthWords[date.month]}  <small>{date.year}</small></span>
                    </YearMonth>
                    <Menu />
                </Container>
            }
        </Wrapper>
    );
};

export default Header;