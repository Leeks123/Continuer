import React, { useState } from 'react';
import styled from 'styled-components';
import mediaQuery from '../../utils/mediaQuery';

const Wrapper = styled.div`
    width: 104%;
    height: 250px;
    margin: -0.5rem -0.5rem 1rem;
    display: flex;

    // @media (min-width: ${mediaQuery.mobile}px) {
    // }
    // @media (min-width: ${mediaQuery.tablet}px) {
    //     padding-bottom: 4.5rem;
    // }
    // @media (min-width: ${mediaQuery.laptop}px) {
}
`;
type PanelProps = {
    url: string,
    active: boolean,
    onClick: (e: React.MouseEvent) => void
}
const Panel = styled.div<PanelProps>`
    ${(props) => props.url && `
        background-image: url(${props.url});
    `}
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    flex: 0.5;
    margin: 0 0.25rem;
    border-radius: 25px;
    -webkit-transition: all 0.7s ease-in;
    transition: all 0.7s ease-in;

    ${(props) => props.active && `
        flex: 5;
    `}
`;

type ImageBoxProps = {
    images: string[],
}
const ImageBox = ({ images }:ImageBoxProps) => {
    const [activeImg, setActiveImg] = useState<number>(0);
    return (
        <Wrapper>
            {images.map((img,i) => {
                const isActive = activeImg === i;
                return <Panel url={img} active={isActive} onClick={() => setActiveImg(i)}/>
            })}
        </Wrapper>
    );
};

export default ImageBox;