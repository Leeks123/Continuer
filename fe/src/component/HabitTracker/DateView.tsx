import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { subDays, addDays } from 'date-fns'

import { useWindowWidth } from '../../hooks/layout';

import mediaQuery from '../../utils/mediaQuery';
import palette from '../../utils/palette';

const Wrapper = styled.div`
    width: 100%;
    height: 3rem;
    background: ${palette[4]};
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

const DateViewContainer = styled.ul`
    display: flex;
    justify-content: space-between;

    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0.3rem;
    padding-left: 20%;
`;
const DateViewBtn = styled.button`
    padding: 0;
    margin: 0 .125rem; 
    outline: none;
    border: none;
    background: ${palette[0]};

    cursor: pointer;

    svg {
        font-size: 1.25rem;
        line-height: 1.25rem;
    }
`;
const DateViewDay = styled.li`    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 11%;
    height: 100%;
    margin: 0 .125rem;

    list-style: none;
    background: ${palette[0]};
    border-radius: .25rem;

    span {
        font-weight: 550;
    }
    small { 
        font-size: .5rem;
    }

    &:hover {
        transform: scale(1.1);
    }
`;

const DateView = () => {
    const windowWidth = useWindowWidth();
    const [pointDate,setPointDate] = useState(new Date());
    const [renderWeek,setRenderWeek] = useState<string[]>([]);

    const getWeekList = (date:Date,n:number):string[] => {
        let weekdays = [];

        weekdays.unshift(date.toString());
        for(let i=1;i<n;i++){
            date = subDays(date,1);
            weekdays.unshift(date.toString());
        }
        return weekdays;
    }
    const onBtnClick = (e:React.MouseEvent<HTMLElement>) => {
        let el:(HTMLButtonElement|null) = (e.target as HTMLElement).closest('button');
        let btnDirect = el?.dataset.direction;
        console.log(btnDirect,pointDate)
        if(btnDirect === 'right') {
            setPointDate(addDays(pointDate,7))
        } else {
            setPointDate(subDays(pointDate,7))
        }
    }

    useEffect(() => {
        let date = pointDate;
        console.log(date);
        if (windowWidth < mediaQuery.mobile) {
            setRenderWeek(getWeekList(date,7));
        } else if (windowWidth < mediaQuery.tablet) {
            setRenderWeek(getWeekList(date,14));
        } else {
            setRenderWeek(getWeekList(date,21));
        }
    }, [windowWidth,pointDate]);

    return (
        <Wrapper>
            <Container>
                <DateViewContainer>
                    <DateViewBtn 
                        data-direction={'left'} style={{ borderRadius:'.25rem 0 0 .25rem' }} onClick={onBtnClick}
                    ><BsChevronLeft/></DateViewBtn>
                    {renderWeek.map((v) => {
                        const days = ['일','월','화','수','목','금','토'];
                        let date = (new Date(v)).getDate();
                        let day = days[(new Date(v)).getDay()]
                        return (
                            <DateViewDay >
                                <span>{date}</span>
                                <small>{day}</small>
                            </DateViewDay>
                        )
                    })}
                    <DateViewBtn data-direction={'right'} style={{ borderRadius:'0 .25rem .25rem 0' }} onClick={onBtnClick}><BsChevronRight /></DateViewBtn>
                </DateViewContainer>
            </Container>
        </Wrapper>
    );
};

export default DateView;