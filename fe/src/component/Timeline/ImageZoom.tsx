import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BiX } from 'react-icons/bi';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.div`
    width: 100%;
    height: 90vh;
`;
const StyledX = styled(BiX)`
    color: white;
    width: 2rem;
    height: 2rem;

    position: relative;
    top: 1rem;
    left: calc(100% - 3rem);
`;
const StyledSlider = styled(Slider)`
    .slick-dots li button:before {
        color: white;
    }
`;
type imageProps = {
    url: string,
}
const Image = styled.div<imageProps>`
    // width: 90%;
    height: 85vh;

    ${(props) => props.url && `
        background-image: url(${props.url});
    `}
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
`;
type ImageZoomProps = {
    images: string[],
    firstImg: number,
    onClose: () => void,
}
const ImageZoom = ({ images, firstImg, onClose }:ImageZoomProps) => {
    const sliderRef = useRef<any>();

    useEffect(() => {
            sliderRef.current?.slickGoTo(firstImg);
    }, [firstImg]);
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Wrapper>
            <StyledX onClick={onClose} />
            <div style={{ marginTop: '2.5rem' }} />
            <StyledSlider {...settings} ref={sliderRef}>
                {images.map((image,i) => (
                    <Image key={image+i} url={image}/>
                ))}
            </StyledSlider>
        </Wrapper>
    );
};

export default ImageZoom;