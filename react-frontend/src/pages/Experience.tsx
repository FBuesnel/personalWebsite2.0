import React from 'react';
import styled from 'styled-components';
import { joejuice, conventlogo, beehiveai, thenudge, BULogo, mirrortab, equityhealth, ktp } from '../images/experience';
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
          imgSrc={mirrortab}
          title="Software Engineer Intern"
          subtitle="MirrorTab (Jun 2026 - Present)"
          description={[
            'Joined MirrorTab for summer 2026 to help build Haven, an AI-powered browser safety layer that helps people verify links and avoid fake sites.',
            'Working on the engineering team building technology that keeps users safer online.',
          ]}
        />
        <ExperiencePanel
          imgSrc={thenudge}
          title="Software Engineer Contractor"
          subtitle="The Nudge (Aug 2025 - Jun 2026)"
          description={[
            'Architected automated user engagement workflows for 50,000+ users using Scala, supporting platform retention goals.',
            'Shipped a creator video upload flow for 500+ users and redesigned a content display component through two rounds of designer and user feedback.',
            'Led the Expo SDK 53 to 54 upgrade with full end-to-end QA across all React Native features.',
            'Migrated in-app purchase validation from Apple StoreKit V1 to V2, updating receipt verification endpoints critical to revenue infrastructure.',
            'Transitioned weather data from OpenWeatherMap to Apple WeatherKit, improving accuracy for iOS users and reducing third-party API costs.',
          ]}
        />
        <ExperiencePanel
          imgSrc={BULogo}
          title="Course Assistant for CS501"
          subtitle="Boston University (Aug - Dec 2025)"
          description={[
            'Provided mentorship and grading support for a graduate-level course on server application development.',
            'Created and refined grading rubrics to ensure fairness and consistency across assignments.',
            'Advised students on technologies for their final projects based on my experience in software engineering roles.',
          ]}
        />
        <ExperiencePanel
          imgSrc={ktp}
          title="Vice President of Finance"
          subtitle="Kappa Theta Pi, Lambda Chapter (Dec 2024 - Dec 2025)"
          description={[
            'Managed an $11,000 budget for my professional fraternity, allocating funds and hosting fundraisers.',
            'Collected membership dues from 60+ members.',
          ]}
        />
        <ExperiencePanel
          imgSrc={equityhealth}
          title="Data Analyst Intern"
          subtitle="Equity Health (Aug 2025)"
          description={[
            'Published multiple text campaigns to 500+ patients, increasing cancer screening rates.',
            'Tracked attendance data to measure the impact of initiatives like text campaigns and follow-up calls.',
          ]}
        />
        <ExperiencePanel
          imgSrc={thenudge}
          title="Software Engineer Intern"
          subtitle="The Nudge (Jun - Aug 2025)"
          description={[
            'Built and shipped a mobile ticketing commerce feature accessible to 2.5M+ users, processing $15k+ in gross transaction volume.',
            'Optimized OpenAI batch API costs by 50%, saving results directly to Google Sheets via automation.',
            'Overhauled an internal tool used by 30+ e-commerce partners.',
          ]}
        />
        <ExperiencePanel
          imgSrc={BULogo}
          title="Course Assistant for CS132"
          subtitle="Boston University (Aug 2024 - May 2025)"
          description={[
            'Lead weekly office hours to help 300+ students solidify linear algebra concepts.',
            'Direct students on how to implement linear algebra concepts using Python.',
            'Grade over 200 assignments per week by creating a rubric and assigning points.'
          ]}
        />
        <ExperiencePanel
          imgSrc={ktp}
          title="Vice President of Engagement"
          subtitle="Kappa Theta Pi, Lambda Chapter (Aug - Dec 2024)"
          description={[
            'Planned two events per month for the 80+ members of my professional fraternity.',
            'Managed a budget of $4,000+ during the semester.',
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
            'Grade: GPA 3.93/4.00, Dean\'s List (All Semesters)',
            'Degrees: Bachelor\'s of Arts in Computer Science, Bachelor\'s of Arts in Economics',
            'Activities and Societies: KTP (Kappa Theta Pi Lambda Chapter), ΣΧ (Sigma Chi Iota Upsilon Chapter), Fashion Club, Student Food Rescue, Boston Hacks, Intramural Volleyball',
            'Classes: CS131 Combinatoric Structures, CS132 Geometric Algorithms, CS330 Analysis of Algorithms, CS460 Introduction to Database Systems, CS411 Software Engineering, CS392 .NET and C# Programming',
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