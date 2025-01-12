import styled from 'styled-components';
import Footer from './Footer';
import profile from '../images/profilePicture.jpg';
import { Container } from '../styles/GlobalStyles';

const HeaderText = styled.div`
  margin-top: 10%;
  font-size: 30px;
  color: #514c4a;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-top: 20%;
  }
`;

const ColoredText = styled.span`
  color: #514c4a;
`;

const Row = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center; 

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 3px solid #514c4a;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  object-position: top;

`;

const Description = styled.p`
  margin-left: 20px;
  font-size: 22px;
  color: #a4998c;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
    font-size: 18px;
	text-align: left;
  }
`;

const Home = () => {
  return (
    <div>
      <Container>
			<HeaderText>
				Web Developer with a passion for <ColoredText>Computer Science</ColoredText> and <ColoredText>Literature</ColoredText>
			</HeaderText>
        <Row>
          <ProfileImage src={profile} alt="Me" />
          <Description>
            Hey, I'm Fynn Buesnel. I'm currently a student at <b>Boston University</b> pursuing a major in <b>Computer Science</b>. I love fashion, volunteering, teaching, and currently web development utilizing React. Check out my experiences and projects!
          </Description>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;