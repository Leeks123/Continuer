import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsChevronCompactDown } from 'react-icons/bs';
import palette from '../../utils/palette';
import { addNewHabit } from '../../redux/reducers/habitSlice';
import { useAppDispatch } from '../../hooks/redux';

const Wrapper = styled.div`
`;
const Button = styled.div`
    width: 100%;
    height: 2.25rem;

    display: flex;
    justify-content: center;
`;
const Form = styled.form`
    width: 100%;
    height: 40vh;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    font-size: 1.25rem;
`;
const Label = styled.div`
    label { 
        color: ${palette[5]};
        font-weight: bold;
    }
    input {
        box-sizing: border-box;
        width: 100%;
        padding: .5rem;
        margin-top: .5rem;
        border: none;
        border-bottom: 2px solid ${palette[5]};

        outline: none;

        font-size: 1.25rem;
        font-weight: 100;
    }
`;
const Description = styled(Label)`
    height: 100%;
    padding: 1rem 0;
    textarea {
        box-sizing: border-box;
        width: 100%;
        height: 80%;
        margin-top: .5rem;
        border: 2px solid ${palette[5]};

        outline: none;

        font-size: 1.5rem;
        font-weight: 100;
    }
`;
const SubmitButton = styled.div`
    width: 100%;
    height: 2.75rem;
    border-radius: .5rem;

    background: ${palette[6]};

    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    text-align: center;
    line-height: 2.75rem;
`;
type HabitFormProps = {
    toggle: React.Dispatch<React.SetStateAction<boolean>>,
    active: boolean
}
const HabitForm = ({ toggle, active }:HabitFormProps) => {
    const dispatch = useAppDispatch();
    
    const titleInput = useRef<HTMLInputElement | null>(null);

    const [title,setTitle] = useState<string>('');
    const [desc,setDesc] = useState<string>('');

    const onCloseForm = useCallback(() => {
        toggle(!active);
        setTitle('');
        setDesc('');
    },[toggle,active]);

    const onSetTitle = useCallback((e:any) => {
        setTitle(e.target.value);
        // console.log(e.target.value);
    },[]);
    
    const onSetDesc = useCallback((e:any) => {
        setDesc(e.target.value);
        // console.log(e.target.value);
    },[]);
    
    const onSubmitForm = useCallback(() => {
        toggle(!active);
        const habit = {
            title, desc
        }
        setTitle('');
        setDesc('');
        dispatch(addNewHabit(habit));
    },[toggle, active, title, desc, dispatch]);

    useEffect(()=> {
        if(active && titleInput) {
            titleInput.current?.focus();
        }
    },[active])

    return (
        <Wrapper>
            <Button onClick={onCloseForm}>
                <BsChevronCompactDown size={32} style={{ width: 48, color: palette[5] }}/>
            </Button>
            <Form>
                <Label>
                    <label>Habit</label><br/>
                    <input 
                        type='text' 
                        onChange={onSetTitle} 
                        value={title} 
                        ref={titleInput}
                    />
                </Label>
                <Description>
                    <label>Description</label><br/>
                    <textarea  onChange={onSetDesc} value={desc}></textarea>
                </Description>
                <SubmitButton onClick={onSubmitForm}>Create Habit</SubmitButton>
            </Form>
        </Wrapper>
    );
};

export default HabitForm;