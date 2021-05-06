import React from 'react';
import styled from 'styled-components';
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

    @media (min-width: ${mediaQuery.mobile}px) {
        // width: 25%;
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        // width: 23.5%;
    }
    @media (min-width: ${mediaQuery.laptop}px) {
        
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
    clicked: boolean
}
const Check = styled.li<CheckProps>`
    flex: .9;
    height: 100%;

    list-style: none;
    background: ${palette[2]};
    ${(props) => props.clicked && `
        background: ${palette[6]};
    `}
    border-radius: .25rem;

    &:last-child {
        flex: 1.7;
        margin: 0;
    }
`;

const Habit = (data:any) => {
    return (
        <Layout>
            <Label>{data.data.title}</Label>
            <CheckList>
                {new Array(21).fill(0).map(v => <Check clicked={false}/>)}
            </CheckList>
        </Layout>
    );
};

export default Habit;