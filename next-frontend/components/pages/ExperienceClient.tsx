'use client';

import { useState } from 'react';
import styled from 'styled-components';
import ExperiencePanel from '../ExperiencePanel';
import { Container, Header } from '../GlobalStyles';

// Older roles are tucked away so education isn't buried under juice bars.
const VISIBLE_COUNT = 6;

export interface ExperienceEntryData {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
  imageUrl: string;
  companyUrl: string | null;
}

const GridContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* --- Timeline --- */

const Timeline = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.space[2]} 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    border-radius: 2px;
    background: ${({ theme }) => theme.border};
  }

  @media (max-width: 900px) {
    &::before {
      left: 24px;
    }
  }
`;

const TimelineItem = styled.div<{ $side: 'left' | 'right'; $reveal: boolean }>`
  position: relative;
  width: calc(50% - 48px);
  margin-bottom: ${({ theme }) => theme.space[6]};
  margin-left: ${({ $side }) => ($side === 'right' ? 'calc(50% + 48px)' : '0')};
  animation: ${({ $reveal }) => ($reveal ? 'fadeInUp 0.45s ease both' : 'none')};

  &:last-child {
    margin-bottom: 0;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 900px) {
    width: calc(100% - 64px);
    margin-left: 64px;
  }
`;

const TimelineNode = styled.img<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 6px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.secondaryBackground};
  object-fit: cover;
  z-index: 1;
  /* Centered on the timeline's vertical line */
  ${({ $side }) => ($side === 'left' ? 'left: calc(100% + 24px);' : 'left: -72px;')}

  @media (max-width: 900px) {
    left: -64px;
  }
`;

const TimelineCard = styled.div`
  background-color: ${({ theme }) => theme.secondaryBackground};
  border: 4px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: ${({ theme }) => theme.space[4]};
  transition: box-shadow 0.3s ease, transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px ${({ theme }) => theme.shadow};
    transform: translateY(-3px);
  }
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const CardSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.secondaryText};
  margin: 0 0 ${({ theme }) => theme.space[3]} 0;
`;

const CardSubtitleLink = styled.a`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.secondaryText};
  margin: 0 0 ${({ theme }) => theme.space[3]} 0;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
    text-decoration: underline;
  }
`;

const CardBullets = styled.ul`
  padding-left: ${({ theme }) => theme.space[5]};
  list-style-type: disc;

  li {
    font-size: ${({ theme }) => theme.fontSize.base};
    color: ${({ theme }) => theme.secondaryText};
    margin-bottom: ${({ theme }) => theme.space[2]};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ShowMoreButton = styled.button`
  display: block;
  margin: ${({ theme }) => theme.space[5]} auto 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-style: italic;
  color: ${({ theme }) => theme.secondaryText};
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

interface ExperienceClientProps {
  experience: ExperienceEntryData[];
  education: ExperienceEntryData[];
}

const ExperienceClient = ({ experience, education }: ExperienceClientProps) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? experience : experience.slice(0, VISIBLE_COUNT);
  const hiddenCount = experience.length - VISIBLE_COUNT;

  return (
    <Container>
      <Header>Professional</Header>
      <Timeline>
        {visible.map((entry, i) => {
          const side = i % 2 === 0 ? 'left' : 'right';
          return (
            <TimelineItem key={entry.id} $side={side} $reveal={i >= VISIBLE_COUNT}>
              <TimelineNode $side={side} src={entry.imageUrl} alt="" />
              <TimelineCard>
                <CardTitle>{entry.title}</CardTitle>
                {entry.companyUrl ? (
                  <CardSubtitleLink href={entry.companyUrl} target="_blank" rel="noopener noreferrer">
                    {entry.subtitle}
                  </CardSubtitleLink>
                ) : (
                  <CardSubtitle>{entry.subtitle}</CardSubtitle>
                )}
                <CardBullets>
                  {entry.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </CardBullets>
              </TimelineCard>
            </TimelineItem>
          );
        })}
      </Timeline>
      {hiddenCount > 0 && (
        <ShowMoreButton onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show fewer roles' : `Show ${hiddenCount} earlier roles`}
        </ShowMoreButton>
      )}
      <Header style={{ marginTop: '2.5rem' }}>Education</Header>
      <GridContainer>
        {education.map(entry => (
          <ExperiencePanel
            key={entry.id}
            imgSrc={entry.imageUrl}
            title={entry.title}
            subtitle={entry.subtitle}
            subtitleUrl={entry.companyUrl ?? undefined}
            description={entry.bullets}
          />
        ))}
      </GridContainer>
    </Container>
  );
};

export default ExperienceClient;
