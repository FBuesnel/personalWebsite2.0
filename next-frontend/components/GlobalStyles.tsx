'use client';

import styled from "styled-components";

export const Container = styled.div`
  padding: 15px 10% 15px 10%;
`;

export const Header = styled.div`
  margin: 0 0 ${({ theme }) => theme.space[5]} 0;
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  letter-spacing: -0.015em;
`

export const Description = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  padding-bottom: ${({ theme }) => theme.space[5]};
  color: ${({ theme }) => theme.secondaryText};
  max-width: 70ch;
`;
