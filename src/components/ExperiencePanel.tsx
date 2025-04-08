import React from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  border: 4px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.secondaryBackground};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  border-radius: 50%;
  margin-right: 1rem;
  width: 50px;
  height: 50px;
`;

const Title = styled.h5`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.secondaryText};
  margin: 0;
`;

const Description = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem;
  list-style-type: disc;

  li {
    font-size: 1rem;
    color: ${({ theme }) => theme.secondaryText};
    margin-bottom: 0.5rem;
  }
`;

interface ExperiencePanelProps {
  imgSrc: string;
  title: string;
  subtitle: string;
  description: string[];
}

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({ imgSrc, title, subtitle, description }) => {
  return (
    <Panel>
      <Header>
        <Image src={imgSrc} alt={title} />
        <div>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
      </Header>
      <Description>
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </Description>
    </Panel>
  );
};

export default ExperiencePanel;