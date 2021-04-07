import React from 'react';
import styled from 'styled-components';

import palette from '../../utils/palette';
import mediaQuery from '../../utils/mediaQuery';

type WrapperProps = {
    right: boolean,
}
const Wrapper = styled.div<WrapperProps>`
    // border: 1px solid red;
    width: 100%;
    box-sizing: content-box;

    .node_container {
        height: 3.5rem;

        .day_node {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            background: ${palette[5]};

            position: relative;
            top: 0.5rem;
            left: calc(100% - 22px);

            text-align: center;
            color: white;
            font-weight: bold;
            font-size: 1.25rem;

            span {
                position: relative;
                top: 0.5rem;
            }
        }
    }
    .bottomBranch {
        height: 1rem;
        border-right: 0.25rem solid ${palette[5]};
    }    

    @media (min-width: ${mediaQuery.mobile}px) {
    }
    @media (min-width: ${mediaQuery.tablet}px) {
        width: 50%;
        ${(props) => props.right && `
            transform: translateX(99%);
        `}
        .node_container {
            .day_node {
                ${(props) => props.right ? `left: -18px;`:``}
            }
        }
        .bottomBranch {
            ${(props) => props.right ?
                `
                    border-left: 0.25rem solid ${palette[5]};
                    border-right: none;
                `:
                `border-right: 0.25rem solid ${palette[5]};`
            }
        }
    }
    @media (min-width: ${mediaQuery.laptop}px) {
    }
`;

type DayNodeProps = {
    date: number,
    rightSide: boolean,
}
const DayNode = ({ date, rightSide }:DayNodeProps) => {
    return (
        <Wrapper right={rightSide}>
            <div className="node_container">
                <div className="day_node">
                    <span>{date}</span>
                </div>
            </div>
            <div className="bottomBranch"></div>
        </Wrapper>
    );
};

export default DayNode;