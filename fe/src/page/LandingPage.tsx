/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import palette from '../utils/palette';
import mediaQuery from '../utils/mediaQuery';
import Login from '../component/Landing/Login';
import firebase from 'firebase';

const Wrapper = styled.div`
    overflow: scroll;
    height: 100vh;
    scroll-snap-type: y mandatory;
    -webkit-scroll-snap-type: y mandatory;
    -ms-scroll-snap-type: y mandatory;
`;

const Section = styled.section`

    width: 100vw;
    height: 100vh;
    background: ${palette[3]};
    scroll-snap-align: start;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const boxTransition = keyframes`
    from { 
        transform: translateY(400%);
        color: rgba(0,0,0,0);
    } 
    to { 
        transform: translateY(0%);
        color: rgba(0,0,0,1);
    }
`;
const Box = styled.div`
    background: ${palette[0]};
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 20px 0px 20px 0px;
    text-align: center;
    text-transform: lowercase;
    z-index: 1;
    transform: translateY(500%);
    animation: ${boxTransition} 1.5s 0s cubic-bezier(.35,1.42,.69,1.07) forwards;

    margin: 1rem;
    padding: 1rem 2rem;
    font-size: 1.5rem;
    font-weight: 500;

    width: 225px;

    @media (min-width: ${mediaQuery.mobile}px) {
        font-size: 2rem;
        width: 275px;
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        font-size: 2.5rem;
        width: 325px;
    }
`;
const Line = styled.div`
    height: 100%;
    background: ${palette[5]};
    width: 5px;
    position: absolute;
    left: 50%;
`;

const LandingPage = (props: { history: string[]; }) => {

    useLayoutEffect(() => {
        firebase.auth().onAuthStateChanged((user: any) => {
            if (user) {
                props.history.push('/timeline');
            } 
          });
    }, [])

    return (
        <Wrapper>
            <Section>
                <Box>
                    Continuer
                </Box>
                <Box>
                    <Login />
                </Box>
                <Line />
            </Section>
            <Section>
                page2
            </Section>
            <Section>page3</Section>
        </Wrapper>
    );
};

export default LandingPage;