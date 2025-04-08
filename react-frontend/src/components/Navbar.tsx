import React, { useState } from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
 
const Nav = styled.nav`
	background: ${({ theme }) => theme.background};
	padding: 1rem 0 1rem 0;
	display: flex;
  text-align: center;
  align-items: center;
  position: relative;
  justify-content: center;
`

const NavMenu = styled.ul<{ isOpen: boolean }>`
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  align-select: center;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: -300px;
    right: 0;
    width: 100%;
    background: ${({ theme }) => theme.background};
    z-index: 10;
    padding-top: 20px;
    transition: top 0.5s;
    top: ${({ isOpen }) => (isOpen ? '0' : '-300px')};
  }
`

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 20px;
  position: relative;
  margin: 15px 15px;
  &::after {
    content: "";
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.accent};
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
    color: ${({ theme }) => theme.text};
    font-weight: 600;
  }
`

export const Bars = styled(FaBars)`
  display: none;
  color: ${({ theme }) => theme.text};
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`

const CloseIcon = styled(FaTimes)`
  display: none;
  color: ${({ theme }) => theme.text};
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 2rem;
    cursor: pointer;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  position: absolute;
  left: 20px;
  top: 35px;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }

  @media screen and (max-width: 768px) {
    left: 20px;
    top: 20px;
  }
`;

// Navbar Props
interface INavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ toggleTheme, isDarkMode }: INavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }

    return (
      <>
      <Nav>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <MdOutlineWbSunny /> : <FaRegMoon /> }
        </ThemeToggle>
        <Bars onClick={toggleMenu} />
        <NavMenu isOpen={isOpen}>
          <CloseIcon onClick={toggleMenu} />
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/experience" onClick={toggleMenu}>Experience</NavLink>
          <NavLink to="/portfolio" onClick={toggleMenu}>Portfolio</NavLink>
          <NavLink to="/posts" onClick={toggleMenu}>Posts</NavLink>
          <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>
        </NavMenu>
      </Nav>
      <Overlay isOpen={isOpen} onClick={toggleMenu} />
    </>
    );
};
 
export default Navbar;