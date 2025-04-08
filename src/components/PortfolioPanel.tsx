import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.secondaryBackground};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  // Add a hover shadow
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
`;

const Subtitle = styled.h3`
  font-size: 1.25rem;
  color: #a4998c;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.secondaryText};
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const Button = styled.a`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  font-weight: 600;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.accent};
  }
`;

const Padding = styled.div`
padding: 1rem;
`

interface PortfolioPanelProps {
  imgSrc?: string; // Allow it to be optional to conditionally render an image
  title: string;
  subtitle: string;
  description: string;
  github?: string;
  website?: string;
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({
  imgSrc,
  title,
  subtitle,
  description,
  github,
  website,
}) => {
  return (
    <Panel>
      {imgSrc && <Image alt={title} src={imgSrc} />}
      <Title>{title}</Title>
      <Padding>
      {/* <Subtitle>{subtitle}</Subtitle> */}
      <Description>{description}</Description>
      <ButtonContainer>
        {website && (
          <Button href={website} target="_blank" rel="noopener noreferrer">
            Website
          </Button>
        )}
        {github && (
          <Button href={github} target="_blank" rel="noopener noreferrer">
            GitHub
          </Button>
        )}
      </ButtonContainer>
      </Padding>
    </Panel>
  );
};

export default PortfolioPanel;