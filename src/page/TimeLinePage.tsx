import React from 'react';
import styled from 'styled-components';

import Header from '../component/Timeline/Header';
import Content from '../component/Timeline/Content';
import Input from '../component/Timeline/Input';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
`;


const TimeLinePage = () => {
    return (
        <Wrapper>
            <Header/>
            <Content/>
            {/* <Input /> */}
        </Wrapper>
    );
};

export default TimeLinePage;