import styled from 'styled-components';
import profile from '../images/profilePicture.jpg';
import { Container, Header } from '../styles/GlobalStyles';

const StyledHeader = styled(Header)`
  color: ${({ theme }) => theme.text};
  font-weight: 400;

  @media (max-width: 768px) {
    text-align: center;
  }
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
  border: 3px solid ${({ theme }) => theme.border};
  object-fit: cover;
  aspect-ratio: 1 / 1;
  object-position: top;

`;

const Description = styled.p`
  margin-left: 20px;
  font-size: 22px;
  color: ${({ theme }) => theme.secondaryText};

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 20px;
    font-size: 18px;
	text-align: left;
  }
`;

const StyledContainer = styled(Container)`
  min-height: 80vh;
  padding-right: 30%;
  @media (max-width: 768px) {
    padding-right: 10%;
  }
`;

const Home = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        Web Developer with a passion for Computer Science and Literature
      </StyledHeader>
      <Row>
        <ProfileImage src={profile} alt="Me" />
        <Description>
          Hey, I'm Fynn Buesnel. I'm currently a student at <b>Boston University</b> pursuing a BA in <b>Computer Science</b> and a BA in <b>Economics</b>. I love fashion, volunteering, teaching, and currently mobile development utilizing React-Native. Check out my experiences and projects!
        </Description>
      </Row>
    </StyledContainer>
  );
};

export default Home;