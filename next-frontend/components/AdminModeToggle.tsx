'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';

const GearButton = styled.button<{ $inAdmin: boolean }>`
  position: absolute;
  right: 20px;
  top: 24px;
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 50%;
  border: 2px solid ${({ theme, $inAdmin }) => ($inAdmin ? theme.accent : theme.border)};
  background: ${({ theme }) => theme.secondaryBackground};
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease;
  box-shadow: ${({ theme, $inAdmin }) =>
    $inAdmin ? `0 0 12px ${theme.accent}` : 'none'};

  &:hover {
    transform: scale(1.08);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Full clockwise spin entering admin mode, counterclockwise leaving it */
    transform: rotate(${({ $inAdmin }) => ($inAdmin ? '360deg' : '0deg')});
    transition: transform 0.7s cubic-bezier(0.68, -0.4, 0.32, 1.4);
  }

  /* A quarter-turn tease on hover */
  &:hover img {
    transform: rotate(${({ $inAdmin }) => ($inAdmin ? '450deg' : '90deg')});
  }

  /* Sit on the hamburger's midline: the bars icon is 1.8rem (28.8px) tall,
     offset 75% of its height from the top, so its center is at ~36px. */
  @media screen and (max-width: 768px) {
    right: 68px;
    top: 17px;
    width: 38px;
    height: 38px;
  }
`;

// Visible only when signed in: the secret door between the public site and
// admin mode. The gear spins as you cross over.
const AdminModeToggle = () => {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  if (status !== 'authenticated') return null;

  const inAdmin = pathname.startsWith('/admin');

  return (
    <GearButton
      $inAdmin={inAdmin}
      onClick={() => router.push(inAdmin ? '/' : '/admin')}
      aria-label={inAdmin ? 'Exit admin mode' : 'Enter admin mode'}
      title={inAdmin ? 'Back to the site' : 'Admin mode'}
    >
      <img src="/images/factorio.png" alt="" />
    </GearButton>
  );
};

export default AdminModeToggle;
