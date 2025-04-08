import React from 'react';
import styled from 'styled-components';
import joejuice from '../images/joejuice.png';
import conventlogo from '../images/conventlogo.png';
import ExperiencePanel from '../components/ExperiencePanel';
import '../index.css';

import { Container, Header } from '../styles/GlobalStyles';

const GridContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Experience = () => {
  return (
    <Container>
      <Header>Experience</Header>
      <GridContainer>
        <ExperiencePanel
          imgSrc={joejuice}
          title="Juicer"
          subtitle="Joe & The Juice (2023)"
          description={[
            'Handled hundreds of customer orders every day, making juices, sandwiches, and shakes while creating a good atmosphere in the store.',
            'Balanced work responsibilities and pursued my passion for programming during the summer.',
            'Transitioned from a previous technology job to the fast-paced environment of Joe and the Juice, demonstrating adaptability in learning new skills.',
          ]}
        />
        <ExperiencePanel
          imgSrc={conventlogo}
          title="Technology Assistant"
          subtitle="Convent & Stuart Hall (2022)"
          description={[
            'Facilitated faculty device transfers by moving their data and preparing their new computers.',
            'Set up new devices across campus like TVs in every classroom.',
            'Organized an e-recycling program for the school\'s students and administration.',
          ]}
        />
        <ExperiencePanel
          imgSrc={conventlogo}
          title="Technology Intern"
          subtitle="Convent & Stuart Hall (2021)"
          description={[
            'Facilitated faculty device transfers by moving their data and preparing their new computers.',
            'Set up new devices across campus like TVs in every classroom.',
            'Organized an e-recycling program for the school\'s students and administration.',
          ]}
        />
      </GridContainer>
      <Header>Education</Header>
      <GridContainer>
        <ExperiencePanel
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Boston_University_seal.svg/1920px-Boston_University_seal.svg.png"
          title="Boston University"
          subtitle="2023-2027"
          description={[
            'Degree: Bachelor\'s of Arts in Computer Science',
            'Activities and Societies: SPARK',
            'Classes: CS 131 Combinatoric Structures, CS 132 Geometric Algorithms',
          ]}
        />
        <ExperiencePanel
          imgSrc={conventlogo}
          title="Convent & Stuart Hall High School"
          subtitle="2019-2023"
          description={[
            'Grades/Scores: 4.0/4.70 UW/W GPA, 35 ACT',
            'Degree: International Baccalaureate Diploma, High School Diploma',
            'Awards: Valedictorian, Faculty Designated Awards (Math, History, Modern & Classical Languages, English), 4-Year Prizes (Math, English)',
            'Activities and Societies: Varsity Volleyball, Co-Founder Garden Club, Founder Social Justice Literary Club, Software Engineer for IB-Keyword-Search, Poetry Festival Panelist, Study Abroad Programs (Berlin, Copenhagen, and Rome)',
          ]}
        />
      </GridContainer>
    </Container>
  );
};

export default Experience;