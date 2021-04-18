import React, { useCallback } from 'react';
import styled from 'styled-components';
import { RiLogoutCircleRLine } from 'react-icons/ri';

import pallette from '../../../utils/palette';

import { useAppDispatch } from '../../../hooks/redux';
import { logOut } from '../../../redux/reducers/userSlice';

const Wrapper = styled.div`
    ul { 
        padding: 0;
        margin: 0;

        display: flex;

        li {
            padding: 0;
            margin: 0;
            list-style: none;

            svg { 
                width: 1.5rem;
                height: 1.5rem;
                margin: 0.25rem;
                color: ${pallette[5]};
                &:hover {
                    color: ${pallette[6]};
                }
            }
        }
    }
`;
const TopMenu = () => {
    const dispatch = useAppDispatch();

    const onLogoutClick = useCallback(() => {
        const result = window.confirm('로그아웃 하시겠습니까?');
        console.log(result);
        if(result) {
            dispatch(logOut());
        }
    }, []);

    return (
        <Wrapper>
            <ul>
                <li>
                    <RiLogoutCircleRLine onClick={onLogoutClick}/>
                </li>
            </ul>
        </Wrapper>
    );
};

export default TopMenu;