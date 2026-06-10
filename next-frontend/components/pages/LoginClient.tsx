'use client';

import React from 'react';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';
import { googleLogin } from '../../app/login/actions';
import { Container, Header } from '../GlobalStyles';

const StyledContainer = styled(Container)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  background: ${({ theme }) => theme.secondaryBackground};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
`;

const StyledHeader = styled(Header)`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const GoogleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.background};
  }
`;

const Hint = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.secondaryText};
`;

const LoginClient = ({ hasGoogle }: { hasGoogle: boolean }) => {
  return (
    <StyledContainer>
      <FormWrapper>
        <StyledHeader>Welcome back.</StyledHeader>
        {hasGoogle ? (
          <form action={googleLogin}>
            <GoogleButton type="submit">
              <FaGoogle /> Sign in with Google
            </GoogleButton>
          </form>
        ) : (
          <Hint>Google sign-in is not configured.</Hint>
        )}
      </FormWrapper>
    </StyledContainer>
  );
};

export default LoginClient;
