import styled from "styled-components";
import { Link } from "react-router-dom";
import logovemser from '../../images/logovemser.png'
import { FaHome, FaUsers, FaMapMarkedAlt } from 'react-icons/fa';

export const HeaderSide = styled.header`
    width: 200px;
    min-height: 100vh;
    background-color: rgba(54, 55, 64, 1);
`

export const LiHeader = styled.li`
    padding: 10px 0;
    > * {
        padding-right: 5px;
    }
    
`

export const LinkHeader = styled(Link)`
    text-decoration: none;
    color: rgba(221, 226, 255, 1);
    
`

export const UlNav = styled.ul`
    list-style-type: none;
    margin: 0;
    padding-left: 10px;
`

export const FaHomeStyled = styled(FaHome)`
    padding-right: 5px;
`
export const FaUsersStyled = styled(FaUsers)`
    padding-right: 5px;
`
export const  FaMapMarkedAltStyled = styled(FaMapMarkedAlt)`
    padding-right: 5px;
`
export const LogoImg = styled.img.attrs({
    src: `${logovemser}`
  })`
    width: 80px;
  `;

export const LogoDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
`
export const ButtonLogout = styled.button`
    margin-left: 20px;
    background-color: #3751FF;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    color: #FFF;
    height: 40px;
    width: 150px;
    border: 1px #3751FF solid;
`
export const HeaderContainer = styled.div`
    position: fixed;
    height: 100%;
`