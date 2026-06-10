'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.75rem 10%;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.secondaryBackground};
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.accent : theme.text)};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const SignOutButton = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/resume', label: 'Resume' },
  { href: '/admin/habits', label: 'Habits' },
];

const AdminNav = ({ signOutAction }: { signOutAction: () => Promise<void> }) => {
  const pathname = usePathname();
  return (
    <Bar>
      {links.map(link => (
        <NavLink
          key={link.href}
          href={link.href}
          $active={
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)
          }
        >
          {link.label}
        </NavLink>
      ))}
      <form action={signOutAction}>
        <SignOutButton type="submit">Sign out</SignOutButton>
      </form>
    </Bar>
  );
};

export default AdminNav;
