import styled from 'styled-components';
import palette from '../../../utils/palette';
import mediaQuery from '../../../utils/mediaQuery';

export const TextInput = styled.div`
    z-index: 5;
    display: flex;
    textarea {
        width: calc(100% - 5rem);
        height: 3.25rem;
        margin: 0.75rem;
        margin-right: 0;
        border: none;

        font-size: 1.25rem;

        &:focus {
            outline: none;
        }
    }
    .upBtn {
        border: 3px solid black;
        font-size: 2rem;
        margin: 0.75rem;
        color: white;
        background: black;
        border-radius: 50%;
    }
`;

export type ToastProps = {
    active?: boolean,
    imgAdded?: boolean,
}
export const Toast = styled.div<ToastProps>`
    z-index: 5;
    width: 100%;
    max-width: ${mediaQuery.tablet}px;
    height: 70vh;

    background: ${palette[0]};
    border-radius: 50px 50px 0 0;
    padding: 2rem;
    box-sizing: border-box;

    position: fixed;
    top: 100vh;
    left: calc(50% - ${mediaQuery.tablet / 2}px);

    transition: transform 0.5s cubic-bezier(.06,.66,.56,1.69) 0.5s;
    ${(props) => props.active ? `
        transform: translateY(-25vh);
        box-shadow: 0 0 100px rgba(0,0,0,0.4);
    `:''}
    ${(props) => props.imgAdded && `
        transform: translateY(-62vh);
    `}
`;

export const ToastInput = styled.div`
    display: flex;
    textarea {
        flex: 8;
        width: 100%;
        height: 8rem;
        margin: 0.75rem;
        margin-right: 0;
        border: none;

        font-size: 1.25rem;
        
        &:focus {
            outline: none;
        }
    }
    & > div {
        flex: 1;
        .upBtn {
            border: 3px solid black;
            font-size: 2.5rem;
            margin: 0.75rem 1rem;
            color: white;
            background: black;
            border-radius: 50%;
        }
    }
`;

export const PreviewImg = styled.div`
    width: 100%;
    height: 300px;
    padding: 1rem;
    box-sizing: border-box;
    
    .preview-container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-wrap: nowrap;
        overflow: scroll;
        
        .img-preview {
        }
    }
`;