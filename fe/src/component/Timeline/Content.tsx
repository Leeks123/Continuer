import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { throttle } from 'lodash';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loadInitialData ,loadPageData, prepareLoadData } from '../../redux/reducers/cardListSlice';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';

import CardList from './CardList';

const Wrapper = styled.main`
    width: 100%;
    height: 100vh;
    
    padding-bottom: 3rem;
    overflow: scroll;

    background: ${palette[3]};

    @media (min-width: ${mediaQuery.mobile}px) {
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        padding-bottom: 4.5rem;
    }
    @media (min-width: ${mediaQuery.laptop}px) {
}
`;

const Container = styled.div`
    padding: 3.25rem 1.5rem 0;

    @media (min-width: ${mediaQuery.tablet}px) {
        padding: 4.25rem 2.5rem 0;
    }
    @media (min-width: ${mediaQuery.laptop}px) {
        max-width: ${mediaQuery.tablet}px;
        margin: 0 auto;
    }
`;


const Content = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.content.cardlist);
    const readyToLoad = useAppSelector(state => state.content.scrollState);
    const scroll = useRef<HTMLDivElement>(null);

    const [dataCounter, setDataCounter] = useState<number>(0);
    const [scrollHeight, setScrollHeight] = useState<number>(0);

    useEffect(() => { // 초기 렌더링,, 초기 데이터 로드
        dispatch(loadInitialData());
        console.log('first render fin');
    }, []);

    useLayoutEffect(() => { // 새로운 카드를 생성했을 떄 스크롤 액션
        if(dataCounter + 1 === data.length) { // 추가 되었을 때 바닥으로 스크롤
            setDataCounter(data.length);
            scroll.current?.scroll({ top:scroll.current?.scrollHeight,left:0, behavior:'smooth' });
            if(scroll.current?.scrollHeight) {
                setScrollHeight(scroll.current?.scrollHeight);
            }
        }
        if(dataCounter + 10 === data.length ) { // 인피니티 스크롤로 로드 완료 후 스크롤 포지션 유지
            setDataCounter(data.length);
            scroll.current?.scroll({
                top:scroll.current?.scrollHeight - scrollHeight,
                left:0
            });
            if(scroll.current?.scrollHeight) {
                setScrollHeight(scroll.current?.scrollHeight);
            }
            dispatch(prepareLoadData(false));
        }
        if(dataCounter -1 === data.length ) { // 카드 삭제시 스크롤 유지
            setDataCounter(data.length);
            console.log('card delete',`scroll to ${scroll.current?.scrollTop}` )
            scroll.current?.scroll({
                top:scroll.current?.scrollTop,
                left:0
            });
            if(scroll.current?.scrollHeight) {
                setScrollHeight(scroll.current?.scrollHeight);
            }
            dispatch(prepareLoadData(false));
        }

    },[data,dataCounter]);


    useEffect(() => { // 스크롤 확인 후 데이터 로딩
        if(readyToLoad) {
            dispatch(loadPageData());
        }
    }, [readyToLoad]);

    const handleScroll = throttle(() => {
        console.log(scroll.current?.scrollTop);
        if (scroll.current?.scrollTop !== undefined && scroll.current?.scrollTop < 100) { // 첫 렌더 이후 스크롤 감지
            console.log('need to load data');
            dispatch(prepareLoadData(true));
        }
    },500);

    useEffect(() => {
      function watchScroll() {
        scroll.current?.addEventListener("scroll", handleScroll);
      }
      watchScroll();
      return () => {
        scroll.current?.removeEventListener("scroll", handleScroll);
      };
    }, []);

    return (
        <Wrapper ref={scroll}>
            <Container>
                <CardList data={data}/>
            </Container>
        </Wrapper>
    );
};

export default Content;