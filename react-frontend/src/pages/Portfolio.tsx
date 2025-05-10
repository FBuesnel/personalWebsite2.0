// filepath: /Users/fynnbuesnel/Desktop/computerScience/personalWebsite2.0/src/pages/Portfolio.tsx
import React from 'react';
import styled from 'styled-components';
import { graphing, ibkeyword, sfwbookclub, wordsearcher, PersonalWebsite1, PersonalWebsite2 } from '../images/portfolio';
import PortfolioPanel from '../components/PortfolioPanel';

import { Container, Header, Description } from '../styles/GlobalStyles';

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

const Portfolio = () => {
  return (
    <Container>
      <Header>Portfolio</Header>
      <Description>A variety of different projects I've made. <ConditionalText>Click on the links to see the code or them live. </ConditionalText> </Description>
      <GridContainer>
	  	<PortfolioPanel
          imgSrc={sfwbookclub}
          title="SFW Bookclub"
          subtitle="Saint Francis Wood's Bookclub"
          description="Created with the Google Books API and Flask, this webapp allows my community's bookclub to schedule meetings online and record their history. It has both a regular view and an admin login to edit information directly from the website."
          github="https://github.com/FBuesnel/SaintFrancisBookClub"
        />
		<PortfolioPanel
          github="https://github.com/FBuesnel/personalWebsite2.0"
          website="https://fynnbuesnel.me"
		      imgSrc={PersonalWebsite2}
          title="Personal Website 2.0"
          subtitle="Personal Website 2.0"
          description="Created using React, Typescript, and Styled Components. It's' a complete redesign of my original website, with a focus on improving the user experience, overall aesthetic, and longevity."
        />
        <PortfolioPanel
          github="https://github.com/FBuesnel/3D-Graphing-Experiments"
          imgSrc={graphing}
          title="3D Graphic Experiments"
          subtitle="3D Graphing Experiment"
          description="Python app employing Matplotlib and Numpy arrays to illustrate different matrices transformations. Allows a user to visualize the effects of rotation and translation on different 3D shapes."
        />
		<PortfolioPanel
          website="https://personalwebsite-5y5w.onrender.com/"
          github="https://github.com/FBuesnel/PersonalWebsite1.0"
		      imgSrc={PersonalWebsite1}
          title="Personal Website 1.0"
          subtitle="Personal Website 1.0"
          description="Created using Flask, Jinja, and Python. This first attempt provided a great learning experience on how to host a website and the basics of web development."
        />
        <PortfolioPanel
          github="https://github.com/FBuesnel/wordSearcher"
          imgSrc={wordsearcher}
          title="Word Context Searcher"
          subtitle="Word In Context Searcher"
          description="Utilizing a custom-designed web scraper for word information. This allows a user to research a word in context, play a game to practice memorization and save it in a .txt file."
        />
        <PortfolioPanel
          github="https://github.com/thienchaulol/IB-Keyword-Search"
          imgSrc={ibkeyword}
          title="IB-Keyword-Search"
          subtitle="IB-Keyword-Search"
          description="Created in conjunction with other programmers from my High School. It allows a teacher to easily locate past test papers for use in class. Utilizes a PDF scanner and merge sort."
        />
      </GridContainer>
    </Container>
  );
};

export default Portfolio;