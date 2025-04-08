import styled from "styled-components";

export const Container = styled.div`
  padding: 15px 10% 15px 10%;
`;

export const Header = styled.div`
  margin: 0;
  font-size: 2.5rem;
  color: #${({ theme }) => theme.text};
  font-weight: bold;
`

export const Description = styled.div`
  font-size: 1.25rem;
  padding-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;