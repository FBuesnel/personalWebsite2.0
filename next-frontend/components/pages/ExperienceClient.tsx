'use client';

import styled from 'styled-components';
import ExperiencePanel from '../ExperiencePanel';
import { Container, Header } from '../GlobalStyles';

export interface ExperienceEntryData {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
  imageUrl: string;
}

const GridContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface ExperienceClientProps {
  experience: ExperienceEntryData[];
  education: ExperienceEntryData[];
}

const ExperienceClient = ({ experience, education }: ExperienceClientProps) => {
  return (
    <Container>
      <Header>Experience</Header>
      <GridContainer>
        {experience.map(entry => (
          <ExperiencePanel
            key={entry.id}
            imgSrc={entry.imageUrl}
            title={entry.title}
            subtitle={entry.subtitle}
            description={entry.bullets}
          />
        ))}
      </GridContainer>
      <Header>Education</Header>
      <GridContainer>
        {education.map(entry => (
          <ExperiencePanel
            key={entry.id}
            imgSrc={entry.imageUrl}
            title={entry.title}
            subtitle={entry.subtitle}
            description={entry.bullets}
          />
        ))}
      </GridContainer>
    </Container>
  );
};

export default ExperienceClient;
