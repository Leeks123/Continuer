import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import { useWeekList } from '../../hooks/date';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateChecklist } from '../../redux/reducers/habitSlice';

import mediaQuery from '../../utils/mediaQuery';
import palette from '../../utils/palette';

const Layout = styled.div`
    display: flex;
    height: 3rem;
    margin: .3rem;
`;
const Label = styled.div`
    box-sizing: border-box;
    width: calc(20% + 19px);
    height: 100%;
    padding: .75rem;

    border: 1px solid rgba(0,0,0,.3);
    border-radius: .25rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
const CheckList = styled.ul`
    width: calc(80% - 19px);
    padding: 0;
    margin: 0;
    margin-left: .25rem;
    display: flex;
    justify-content: space-around;
    
    gap: .25rem;
    @media (min-width: 400px) {
        gap: .5rem;
    }
    @media (min-width: ${mediaQuery.mobile}px) {
        gap: .25rem;
    }
    @media (min-width: 700px) {
        gap: .4rem;
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        gap: .125rem;
    }
    @media (min-width: ${mediaQuery.laptop}px) {
        gap: .325rem;
    }
`;

type CheckProps = {
    checked: boolean
}
const Check = styled.li<CheckProps>`
    flex: .9;
    height: 100%;

    list-style: none;
    background: ${palette[2]};
    ${(props) => props.checked && `
        background: ${palette[5]};
    `}
    border-radius: .25rem;

    &:last-child {
        flex: 1.7;
        margin: 0;
    }
`;

const Habit = (data:any) => {
    const dispatch = useAppDispatch();
    const { id, title, checklist } = data.data;
    const { weekList } = useWeekList(); 
    const [renderWeek,setRenderWeek] = useState<string[]>([]);

    useEffect(() => {
        setRenderWeek(weekList);
    }, [weekList])


    const onCheck = (code:string, id:number) => {
        dispatch(updateChecklist({ id, code }));
    }

    return (
        <Layout>
            <Label>{title}</Label>
            <CheckList>
                {renderWeek.map(v => {
                    let code = format(new Date(v),'yyyyMMdd');
                    return <Check 
                                checked={checklist.includes(code) ? true : false} 
                                onClick={()=>onCheck(code, id)}>
                            </Check>
                })}
            </CheckList>
        </Layout>
    );
};

export default Habit;