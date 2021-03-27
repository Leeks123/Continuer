import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks/redux';

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
    padding: 0 1.5rem;

    @media (min-width: ${mediaQuery.tablet}px) {
        padding: 0 2.5rem;
    }
    @media (min-width: ${mediaQuery.laptop}px) {
        max-width: ${mediaQuery.tablet}px;
        margin: 0 auto;
    }
`;


const Content = () => {
    const data = useAppSelector(state => state.content.cardlist);
    const scroll = useRef<HTMLDivElement>(null);
    const [dataCounter, setDataCounter] = useState<number>(data.length-1);

    useEffect(() => {
        if(dataCounter + 1 === data.length) {
            setDataCounter(data.length);
            scroll.current?.scroll({top:scroll.current?.scrollHeight,left:0, behavior:'smooth'});
        }
        // console.log(scroll.current?.scrollTop);
    },[data,dataCounter]);

    

    function handleScroll() {
    //   console.log(scroll.current?.scrollTop);
    }
  
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