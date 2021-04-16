import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import mediaQuery from '../../utils/mediaQuery';

import Modal from 'react-modal';
import ImageZoom from './ImageZoom';

const Wrapper = styled.div`
    width: 104%;
    height: 58vw;
    margin: -0.5rem -0.5rem 1rem;
    display: flex;

    @media (min-width: ${mediaQuery.mobile}px) {
        height: 250px;
    }
`;
type PanelProps = {
    image: number,
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
    ${(props) => props.image === 1 ? 
        'flex:1;':
        `flex:0.5;`}
    // flex: 0.5;
    margin: 0 0.25rem;
    border-radius: 25px;
    cursor: pointer;

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
    const [isOpenImageZoom, setOpenImageZoom] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const openImageZoom = useCallback(() => {
        console.log('dbclick')
        setOpenImageZoom(true);
    }, []);
    const closeModal = useCallback(() => {
        setOpenImageZoom(false);
    },[]);

    const onClick = (i:number) => {
        if (!isClicked) {
            setActiveImg(i);
            setIsClicked(true);
            setTimeout(() => {
                setIsClicked(false);
            },500)
        } else {
            openImageZoom();
        }
    }
    return (
        <Wrapper>
            {images.map((img,i) => {
                const isActive = activeImg === i;
                return <Panel 
                            key={img+i} 
                            image={images.length} 
                            url={img} 
                            active={isActive} 
                            onClick={() => onClick(i)} 
                            // onDoubleClick={() => openImageZoom()}
                        />
            })}
            <Modal
                isOpen={isOpenImageZoom}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        zIndex : 5,
                    },
                    content : {
                        background: 'black',
                        width: '100vw',
                        height: '100vh',
                        top : '50%',
                        left : '50%',
                        right : 'auto',
                        bottom : 'auto',
                        marginRight : '-50%',
                        transform : 'translate(-50%, -50%)'
                    }
                }}
            >
                <ImageZoom images={images} firstImg={activeImg} onClose={closeModal}/>
            </Modal>
        </Wrapper>
    );
};

export default ImageBox;