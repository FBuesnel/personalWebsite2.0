'use client';

import styled from 'styled-components';
import PortfolioPanel from '../PortfolioPanel';
import { Container, Header, Description } from '../GlobalStyles';

export interface PortfolioProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  githubUrl: string | null;
  websiteUrl: string | null;
}

const ConditionalText = styled.span`
 @media (max-width: 768px) {
    display: none;
  }
}`;

const GridContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); /* Dynamically adjust columns */

  @media (min-width: 1024px) {
    gap: 20px; /* Optional: Adjust gap for larger screens */
  }
`;

const PortfolioClient = ({ projects }: { projects: PortfolioProjectData[] }) => {
  return (
    <Container>
      <Header>Portfolio</Header>
      <Description>A variety of different projects I&apos;ve made. <ConditionalText>Click on the links to see the code or them live. </ConditionalText> </Description>
      <GridContainer>
        {projects.map(project => (
          <PortfolioPanel
            key={project.id}
            imgSrc={project.imageUrl}
            title={project.title}
            subtitle={project.subtitle}
            description={project.description}
            github={project.githubUrl ?? undefined}
            website={project.websiteUrl ?? undefined}
          />
        ))}
      </GridContainer>
    </Container>
  );
};

export default PortfolioClient;
