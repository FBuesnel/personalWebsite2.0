// filepath: /Users/fynnbuesnel/Desktop/computerScience/personalWebsite2.0/src/pages/Portfolio.tsx
import React from 'react';
import styled from 'styled-components';
import graphing from '../images/3DGraphing.jpg';
import ibkeyword from '../images/IB-Keyword-Search.jpg';
import sfwbookclub from '../images/SFWBookclub.jpg';
import wordsearcher from '../images/wordSearcher.jpg';
import PortfolioPanel from '../components/PortfolioPanel';

import { Container, Header, Description } from '../styles/GlobalStyles';

const GridContainer = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Portfolio = () => {
  return (
    <Container>
      <Header>Portfolio</Header>
      <Description>A variety of different projects I've made.</Description>
      <GridContainer>
	  	<PortfolioPanel
          href="https://github.com/FBuesnel/SaintFrancisBookClub"
          imgSrc={sfwbookclub}
          title="WebApp"
          subtitle="Saint Francis Wood's Bookclub"
          description="Created with the Google Books API and Flask, this webapp allows my community's bookclub to schedule meetings online and record their history. It has both a regular view and an admin login to edit information directly from the website."
        />
        <PortfolioPanel
          href="https://github.com/FBuesnel/SaintFrancisBookClub"
          imgSrc={sfwbookclub}
          title="WebApp"
          subtitle="Saint Francis Wood's Bookclub"
          description="Created with the Google Books API and Flask, this webapp allows my community's bookclub to schedule meetings online and record their history. It has both a regular view and an admin login to edit information directly from the website."
        />
        <PortfolioPanel
          href="https://github.com/FBuesnel/3D-Graphing-Experiments"
          imgSrc={graphing}
          title="MatPlotLib, Python"
          subtitle="3D Graphing Experiment"
          description="Python app employing Matplotlib and Numpy arrays to illustrate different matrices transformations. Allows a user to visualize the effects of rotation and translation on different 3D shapes."
        />
        <PortfolioPanel
          href="https://github.com/FBuesnel/wordSearcher"
          imgSrc={wordsearcher}
          title="Java"
          subtitle="Word In Context Searcher"
          description="Utilizing a custom-designed web scraper for word information. This allows a user to research a word in context, play a game to practice memorization and save it in a .txt file."
        />
        <PortfolioPanel
          href="https://github.com/thienchaulol/IB-Keyword-Search"
          imgSrc={ibkeyword}
          title="Java"
          subtitle="IB-Keyword-Search"
          description="Created in conjunction with other programmers from my High School. It allows a teacher to easily locate past test papers for use in class. Utilizes a PDF scanner and merge sort."
        />
      </GridContainer>
    </Container>
  );
};

export default Portfolio;