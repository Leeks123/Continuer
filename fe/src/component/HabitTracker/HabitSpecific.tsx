import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { BiX,BiLineChart,BiTrash,BiSave } from 'react-icons/bi';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';
import { useActingRate, useLongestDuration, useStartDate } from '../../hooks/date';
import { useAppDispatch } from '../../hooks/redux';
import { deleteHabit, updateHabit } from '../../redux/reducers/habitSlice';


const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    background: white;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    hr {
        border: 1px solid ${palette[2]};
        width: 100%;
    }
`;
const Label = styled.div`
    font-size: 1rem;
    color: ${palette[6]};
    margin: .25rem 0;
    text-align: center;

    @media (min-width: ${mediaQuery.mobile}px) {
        font-size: 1.25rem;
        margin: .75rem 0;
    }
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    input {
        font-size: 1.25rem;
        color: ${palette[6]};
        border: none;

        flex: .9;

        &:focus {
            outline: solid 1px ${palette[5]};
        }
    }
    svg {
        position: relative;
        top: -1rem;
        left: 1rem;
    }
`;
const Desc = styled.textarea`
    width: 100%;
    height: 10rem;
    font-size: 1.25rem;
    color: ${palette[6]};
    border: none;

    &:focus {
        outline: solid 1px ${palette[5]};
    }
`;
const ButtonContainer = styled.div`
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
`;
const Button = styled.div`
    flex: 1;
    border-radius: .5rem;

    background: ${palette[6]};
    padding: 0rem .5rem;
    margin: 0 0.125rem;
    color: white;

    display: flex;
    justify-content: center;

    span { 
        font-size: .75rem;
        margin-left: .5rem;    
        text-align: center;
        line-height: 2rem; 

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &:last-child {
        background: red;
    }
    & svg {
        height: 100%;
        font-size: .75rem;
    }

    @media (min-width: ${mediaQuery.mobile}px) {
        margin: 0 0.25rem;
        padding: .25rem .5rem;
        span {
            font-size: .9rem;
        }
        & svg {
            font-size: 1rem
        }
    }
`;

type HabitSpecificProps = {
    toggle: () => void,
    id: number,
    title: string,
    desc: string,
    checklist: string[]
}
const HabitSpecific = ({ toggle, id, title, desc, checklist }:HabitSpecificProps) => {
    const dispatch = useAppDispatch();
    const startDay = useStartDate(checklist);
    const longestDuration = useLongestDuration(checklist);
    const actingRate = useActingRate(checklist);

    const [editTitle,setEditTitle] = useState<string>(title);
    const [editDesc,setEditDesc] = useState<string>(desc);

    const updateTitle = useCallback((e) => {
        setEditTitle(e.target.value);
    }, []);
    const updateDescription = useCallback((e) => {
        setEditDesc(e.target.value);
    }, []);

    const onSave = useCallback((e) => {
        dispatch(updateHabit({ id, title: editTitle, desc: editDesc }));
        toggle();
    }, [toggle, dispatch, id, editTitle, editDesc]);

    const onDelete = useCallback((e) => {
        console.log('on Delete');
        dispatch(deleteHabit(id));
        toggle();
    }, [toggle,dispatch,id]);
       
    return (
        <Wrapper>
            <Header>
                <input type="text" value={editTitle ? editTitle: title} onChange={updateTitle}/>
                <BiX size={32} onClick={() => toggle()}/>
            </Header>
            <hr/>
            <Desc
                value={editDesc ? editDesc: desc}
                placeholder="Description"
                onChange={updateDescription} 
            />
            <hr/>
            {startDay ? 
                <Label>habit start from <b>{startDay}</b></Label>:
                <Label>habit created. But it didn't start </Label>
            }
            <Label>the longest duration is <b>{longestDuration}</b> days</Label>
            <Label>total acting rate is <b>{actingRate}%</b></Label>
            <hr/>
            <ButtonContainer>
                <Button><BiLineChart/><span> View Chart</span></Button>
                <Button onClick={onSave}><BiSave/><span> Save</span></Button>
                <Button onClick={onDelete}><BiTrash/><span> Delete</span></Button>
            </ButtonContainer>
        </Wrapper>
    );
};

export default HabitSpecific;