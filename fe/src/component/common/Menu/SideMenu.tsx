import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { BsFillGridFill } from 'react-icons/bs'
import { RiLogoutCircleRLine,RiLogoutBoxRLine,RiArrowLeftRightLine } from 'react-icons/ri';

import { useAppDispatch } from '../../../hooks/redux';
import { logOut, signOut } from '../../../redux/reducers/userSlice';
import { useHistory } from 'react-router-dom';
import { changeDate } from '../../../redux/reducers/cardListSlice';

type SideBayProps = {
    active: boolean
}
const SideBar = styled.div<SideBayProps>`
    ${props => props.active ? `
        transform: translate(0rem);
    `:
    `
        transform: translate(5rem);
    `}
    transition: transform 0.5s ease-out;

    width: 5rem;
    height: calc(100vh - 3rem);
    
    background: transparent;

    position: fixed;
    top: 3rem;
    right: 0;


    ul { 
        width: 100%;
        padding: 0;
        margin: 0;
        li {
            padding: 0;
            margin: 1rem;
            list-style: none;

            background: black;
            color: white;
            box-shadow: 1px 1px 50px rgba(0,0,0,0.7);

            width: 3rem;
            height: 3rem;
            border-radius: 20%;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            & > svg {
                width: 1.5rem;
                height: 1.5rem;
            }
            small {
                font-size: 0.25rem;
            }
        }
    }
`
type ToggleBtnProps = {
    active: string
}
const ToggleBtn = styled(BsFillGridFill)<ToggleBtnProps>`
    width: 24px;
    height: 24px;
    margin: 0.25rem;

    ${props => props.active === 'true' ? `
        transform: rotate(45deg);
    `:
    `
        transform: rotate(0);
    `}
    transition: transform 0.2s 0s linear;
`;

const SideMenu = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [isOpen,setSidebarToggle] = useState<boolean>(false);

    const sideBarToggle = useCallback(() => {
        setSidebarToggle(state => !state);
    }, []);
    const onLogoutClick = useCallback(() => {
        const result = window.confirm('로그아웃 하시겠습니까?');
        if(result) {
            dispatch(logOut());
        }
    }, []);
    const onChangeMode = useCallback(() => {
        dispatch(changeDate({
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        }));
        if(history.location.pathname === '/habittracker') {
            history.push('/timeline');    
        } else {
            history.push('/habittracker');
        }
    }, []);
    const onSignoutClick = useCallback(() => {
        const result = window.confirm('탈퇴 하시겠습니까?');
        if(result) {
            dispatch(signOut());
        }
    }, []);

    return (
        <div>
            <ToggleBtn active={isOpen.toString()} onClick={sideBarToggle}/>
            <SideBar active={isOpen}>
                <ul>
                    <li onClick={onLogoutClick}><RiLogoutCircleRLine /><small>Logout</small></li>
                    <li onClick={onChangeMode}><RiArrowLeftRightLine /><small>Change</small></li>
                    <li onClick={onSignoutClick}><RiLogoutBoxRLine /><small>Signout</small></li>
                </ul>
            </SideBar>
        </div>
    );
};

export default SideMenu;