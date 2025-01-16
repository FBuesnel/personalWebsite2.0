// filepath: src/components/PortfolioPanel.tsx
import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  position: relative;
  height: 100%;
  &:hover img {
    filter: brightness(0.25);
  }
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  border: 4px solid #514c4a;
  transition: filter 0.5s;
`;

const Content = styled.div<{ opacity: number }>`
  padding: 2rem;
  position: relative;
  width: 100%;
  height: 100%;
  background: #dad5d2;
  border: 4px solid #514c4a;
  opacity: ${({ opacity }) => opacity};
  border-radius: 10px;
  transition: opacity 0.5s, brightness 0.5s;
  &:hover {
    opacity: .9;
    brightness: 1;
  }

  @media (max-width: 768px) {
    opacity: 1;
    brightness: 1;
  }

`;

const Title = styled.h2`
  font-size: 1rem;
  color: #d8b26e;
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Subtitle = styled.h1`
  font-size: 1.25rem;
  color: #514c4a;
  text-align: center;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #a4998c;
  text-align: center;
  font-weight: 500;
`;

interface PortfolioPanelProps {
  href: string;
  imgSrc?: string; // Allow it to be optional to conditionally render an image
  title: string;
  subtitle: string;
  description: string;
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({ href, imgSrc, title, subtitle, description }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer"className="group w-full">
      <Panel>
        {imgSrc && <Image alt="project" src={imgSrc} />}
        <Content opacity={imgSrc ? 0 : 1}>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <Description>{description}</Description>
        </Content>
      </Panel>
    </a>
  );
};

export default PortfolioPanel;