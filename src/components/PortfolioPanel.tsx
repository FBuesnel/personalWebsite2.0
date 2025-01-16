// filepath: src/components/PortfolioPanel.tsx
import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  position: relative;
  height: 100%;
`;

const Image = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  transition: brightness 0.5s;
  &:hover {
    brightness: 0;
  }
`;

const Content = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  border: 4px solid #514c4a;
  background: #dad5d2;
  opacity: 0;
  border-radius: 10px;
  transition: opacity 0.5s, brightness 0.5s;
  &:hover {
    opacity: 1;
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
  imgSrc: string;
  title: string;
  subtitle: string;
  description: string;
}

const PortfolioPanel: React.FC<PortfolioPanelProps> = ({ href, imgSrc, title, subtitle, description }) => {
  return (
    <a href={href} className="group w-full">
      <Panel>
        <Image alt="project" src={imgSrc} />
        <Content>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <Description>{description}</Description>
        </Content>
      </Panel>
    </a>
  );
};

export default PortfolioPanel;