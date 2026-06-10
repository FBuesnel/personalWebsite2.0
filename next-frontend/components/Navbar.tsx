'use client';

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegMoon } from "react-icons/fa6";
import { MdOutlineWbSunny } from "react-icons/md";
import AdminModeToggle from "./AdminModeToggle";
import { logout } from "../app/admin/actions";

const Nav = styled.nav`
	background: ${({ theme }) => theme.background};
	padding: 1rem 0 1rem 0;
	display: flex;
  text-align: center;
  align-items: center;
  position: relative;
  justify-content: center;
`

const NavMenu = styled.ul<{ $isOpen: boolean }>`
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    background: ${({ theme }) => theme.background};
    z-index: 10;
    padding: 20px 0;
    transition: transform 0.5s;
    transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-110%')});
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

const SignOutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 20px;
  color: ${({ theme }) => theme.secondaryText};
  margin: 15px 15px;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

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

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
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

const publicLinks = [
  { href: '/', label: 'Home' },
  { href: '/experience', label: 'Experience' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/posts', label: 'Posts' },
  { href: '/contact', label: 'Contact' },
];

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/resume', label: 'Resume' },
  { href: '/admin/habits', label: 'Habits' },
];

interface INavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar = ({ toggleTheme, isDarkMode }: INavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const inAdmin = pathname.startsWith('/admin');
    const links = inAdmin ? adminLinks : publicLinks;

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }

    const isActive = (href: string) =>
      href === '/' || href === '/admin'
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`);

    return (
      <>
      <Nav>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <MdOutlineWbSunny /> : <FaRegMoon /> }
        </ThemeToggle>
        <AdminModeToggle />
        <Bars onClick={toggleMenu} />
        <NavMenu $isOpen={isOpen}>
          <CloseIcon onClick={toggleMenu} />
          {links.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? 'active' : ''}
              onClick={toggleMenu}
            >
              {link.label}
            </NavLink>
          ))}
          {inAdmin && (
            <form action={logout}>
              <SignOutButton type="submit">Sign out</SignOutButton>
            </form>
          )}
        </NavMenu>
      </Nav>
      <Overlay $isOpen={isOpen} onClick={toggleMenu} />
    </>
    );
};

export default Navbar;
