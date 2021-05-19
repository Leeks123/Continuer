import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BiGridVertical } from 'react-icons/bi';
import { format } from 'date-fns';

import Modal from 'react-modal';
import HabitSpecific from './HabitSpecific';

import { useWeekList } from '../../hooks/date';
import { useAppDispatch } from '../../hooks/redux';
import { HabitType, updateChecklist } from '../../redux/reducers/habitSlice';

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
    padding-left: .25rem;

    display: flex;

    border: 1px solid rgba(0,0,0,.3);
    border-radius: .25rem;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: .75rem;
        line-height: 22px;
    }

    @media (min-width: ${mediaQuery.tablet}px) {
        span {
            font-size: 1rem;
        }
    }
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
const modalStyles = { 
    overlay: {
        zIndex: 50,
        background: 'rgba(0,0,0,.2)',
    },
    content: {
        background: 'black',
        width: '90%',
        maxWidth: 500,
        height: '60vh',
        top: '50%', left: '50%', right: '50%', bottom: '50%',
        padding: 0,
        transform: 'translate(-50%, -50%)',
    }
}

Modal.setAppElement('#root');

const Habit = (data:{data:HabitType}) => {
    const dispatch = useAppDispatch();
    const { id, title, desc, checklist } = data.data;
    const { weekList } = useWeekList(); 
    const [renderWeek,setRenderWeek] = useState<string[]>([]);
    const [modalActive,setModalActive] = useState<boolean>(false);

    useEffect(() => {
        setRenderWeek(weekList);
    }, [weekList])

    const onToggleModal = () => {
        setModalActive(!modalActive);
    }
    const onCheck = (code:string, id:number) => {
        dispatch(updateChecklist({ id, code }));
    }

    return (
        <>
            <Layout>
                <Label onClick={onToggleModal}>
                    <BiGridVertical size={22} style={{ color: palette[5] }}/>
                    <span>{title}</span>
                </Label>
                <CheckList>
                    {renderWeek.map(v => {
                        let code = format(new Date(v),'yyyyMMdd');
                        return <Check 
                                    key={code}
                                    checked={checklist.includes(code) ? true : false} 
                                    onClick={()=>onCheck(code, id)}>
                                </Check>
                    })}
                </CheckList>
            </Layout>
            <Modal
                isOpen={modalActive}
                style={modalStyles}
            >
                <HabitSpecific toggle={onToggleModal} id={id} title={title} desc={desc} checklist={checklist} />
            </Modal>
        </>
    );
};

export default Habit;