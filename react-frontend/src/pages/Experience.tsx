import React from 'react';
import styled from 'styled-components';
import { joejuice, conventlogo, beehiveai, thenudge, BULogo } from '../images/experience';
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
          imgSrc={thenudge}
          title="Software Engineering Intern"
          subtitle="The Nudge (Jun-Aug 2025)"
          description={[
            'Internship accepted, updating description soon once completed.',
          ]}
        />
        <ExperiencePanel
          imgSrc={BULogo}
          title="Course Assistant for CS132"
          subtitle="Boston Unversity (Aug 2024 - May 2025)"
          description={[
            'Lead weekly office hours to help 300+ students solidify linear algebra concepts.',
            'Direct students on how to implement linear algebra concepts using Python.',
            'Grade over 200 assignments per week by creating a rubric and assigning points.'
          ]}
        />
        <ExperiencePanel
          imgSrc={beehiveai}
          title="Full-Stack Development Intern"
          subtitle="Beehive AI (May - Aug 2024)"
          description={[
            'Developed a new file upload front-end in Typescript to streamline the experience for over 500 users.',
            'Fixed over 30 bugs throughout their web app locating their source and pushing fixes to development.',
          ]}
        />
        <ExperiencePanel
          imgSrc={joejuice}
          title="Juicer"
          subtitle="Joe & The Juice (May - Aug 2023)"
          description={[
            'Handled hundreds of customer orders every day, making juices, sandwiches, and shakes while creating a good atmosphere in the store.',
            'Balanced work responsibilities and pursued my passion for programming during the summer.',
            'Transitioned from a previous technology job to the fast-paced environment of Joe and the Juice, demonstrating adaptability in learning new skills.',
          ]}
        />
        <ExperiencePanel
          imgSrc={conventlogo}
          title="Technology Assistant"
          subtitle="Convent & Stuart Hall (Aug. 2022 - May 2023)"
          description={[
            'Facilitated faculty device transfers by moving their data and preparing their new computers.',
            'Set up new devices across campus like TVs in every classroom.',
            'Organized an e-recycling program for the school\'s students and administration.',
          ]}
        />
        <ExperiencePanel
          imgSrc={conventlogo}
          title="Technology Intern"
          subtitle="Convent & Stuart Hall (May - Aug 2021)"
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
          imgSrc={BULogo}
          title="Boston University"
          subtitle="2023-2027"
          description={[
            'Grade: GPA 3.91/4.00',
            'Degrees: Bachelor\'s of Arts in Computer Science, Bachelor\'s of Arts in Economics',
            'Activities and Societies: KTP (Kappa Theta Pi Lambda Chapter), ΣΧ (Sigma Chi Iota Upsilon Chapter), Food Runner\'s Program',
            'Classes: CS131 Combinatoric Structures, CS132 Geometric Algorithms, CS330 Analysis of Algorithms, CS460 Introduction to Databse Systems, CS411 Software Engineering',
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