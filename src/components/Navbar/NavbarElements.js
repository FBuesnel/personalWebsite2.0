import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export const Nav = styled.nav`
	background: #dad5d2;
	padding: 20px 20px 0 0;
	text-align: center;
	justify-content: space-between;
`;

export const NavMenu = styled.ul`
  align-items: center; /* Vertically center children */
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #a4998c;
  text-decoration: none;
  font-size: 18px;
  position: relative;
  margin: 15px 15px;
  &::after {
    content: "";
    width: 0;
    height: 3px;
    background: #d8b26e;
    position: absolute;
    bottom: -6px;
	left: 0;
	text-align: center;
    transition: 0.5s;
  }
  &:hover::after {
    width: 100%;
  }
  &.active {
    color: #514c4a;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
