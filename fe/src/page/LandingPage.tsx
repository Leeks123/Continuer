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
const Desc = styled.div`
    font-size: .9rem;
    padding: 2rem 0.5rem;
    text-align: left;
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
                <Box>
                    <Desc>
                        <b>Continuer</b>는 타임라인형 저널입니다. <br/><br/>
                        당신의 순간을 기록하세요 🗒
                    </Desc>
                </Box>
            </Section>
            <Section>
                <Box>
                    <Desc>
                        개발자 본인이 쓰려고 만든 애플리케이션입니다. <br/><br/>
                        그렇지만 누군가 이 앱이 필요하여 이 페이지에 들어오셨다면 자유롭게 사용하셔도 좋습니다.<br/><br/>
                        버그가 발견되면 지속적으로 업데이트하고, 기능도 추가할 예정입니다. 문의 사항이 있다면 email로 연락을 주시기 바랍니다.<br/><br/><br/>
                        <strong>Version</strong> : 1.0.0<br/>
                        <strong>Contact</strong> : kensei719@naver.com
                    </Desc>
                </Box>
            </Section>
        </Wrapper>
    );
};

export default LandingPage;