import React from 'react';
import styled from 'styled-components';
import { BiX,BiLineChart,BiTrash,BiSave } from 'react-icons/bi';
import palette from '../../utils/palette';

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
    font-size: 1.25rem;
    color: ${palette[6]};
    margin: .75rem 0;
    text-align: center;
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
    justify-content: space-around;
`;
const Button = styled.div`
    flex: 1;
    height: 2.5rem;
    border-radius: .5rem;

    background: ${palette[6]};
    padding: 0rem .5rem;
    margin: 0 .5rem;
    color: white;

    display: flex;
    justify-content: center;

    span { 
        font-size: 1rem;
        margin-left: .5rem;    
        text-align: center;
        line-height: 2.5rem; 
    }
    &:last-child {
        background: red;
    }
    & svg {
        height: 100%;
        font-size: 1.25rem;
    }
`;

type HabitSpecificProps = {
    toggle: () => void,
    title: string,
    desc: string,
    checklist: string[]
}
const HabitSpecific = ({ toggle,title,desc,checklist }:HabitSpecificProps) => {
    return (
        <Wrapper>
            <Header>
                <input type="text" value={title} onChange={()=>{}}/>
                <BiX size={32} onClick={() => toggle()}/>
            </Header>
            <hr/>
            <Desc 
                value={desc}
                placeholder="Description"
                onChange={() => {}} 
            />
            <hr/>
            <Label>habit start from <b>2020.02.12</b></Label>
            <Label>the longest duration is <b>24</b> days</Label>
            <Label>total acting rate is <b>94.2%</b></Label>
            <hr/>
            <ButtonContainer>
                <Button><BiLineChart/><span> View graph</span></Button>
                <Button><BiSave/><span> Save</span></Button>
                <Button><BiTrash/><span> Delete</span></Button>
            </ButtonContainer>
        </Wrapper>
    );
};

export default HabitSpecific;