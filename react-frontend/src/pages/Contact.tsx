import React from 'react';
import styled from 'styled-components';
import { Container, Header } from '../styles/GlobalStyles';

const StyledContainer = styled(Container)`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 768px) {
  	margin-top: 30px;
	}
`;

const FormWrapper = styled.div`
  background: ${({ theme }) => theme.secondaryBackground};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
`;

const StyledHeader = styled(Header)`
  font-size: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  text-align: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin: 0;
  gap: 1rem;
`;

const Input = styled.input`
  grid-column: span 1;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  outline: none;
  margin: 0 0 10px 0;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 5px ${({ theme }) => theme.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.secondaryText};
  }

  @media (max-width: 768px) {
    grid-column: span 2;
  }
`;

const TextArea = styled.textarea`
  grid-column: span 2;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  outline: none;
  resize: none;
  margin: 0 0 10px 0;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 5px ${({ theme }) => theme.accent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.secondaryText};
  }
`;

const SubmitButton = styled.button`
  grid-column: span 2;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.background};
  }
`;

const Alert = styled.div`
  grid-column: span 2;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
  margin-top: 1rem;
`;

const Contact = () => {
  const [alert, SetAlert] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resetForm = e.target as HTMLFormElement;
  
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log('Response:', response);
      if (response.ok) {
        SetAlert('Email sent successfully!');
      } else {
        SetAlert('Failed to send email.');
      }
    } catch (error) {
      console.error('Error:', error);
      SetAlert('An error occurred. Please try again.');
    } finally {
      // Reset the form
      resetForm.reset();
      await new Promise(resolve => setTimeout(resolve, 5000));
      SetAlert('');
    }
  };

  return (
    <StyledContainer>
      <FormWrapper>
        <StyledHeader>Contact Me</StyledHeader>
        <Description>
          I'm always happy to dicuss about my projects or experience, so feel free to reach out.
        </Description>
        <Form
          onSubmit={handleSubmit}
          id="contact-form"
        >
          <Input type="text" name="firstName" placeholder="First Name" required />
          <Input type="text" name="lastName" placeholder="Last Name" required />
          <Input type="email" name="email" placeholder="Email Address" required />
          <Input type="text" name="subject" placeholder="Subject" required />
          <TextArea name="message" placeholder="Message" rows={5} required />
          <SubmitButton type="submit">Submit</SubmitButton>
          {alert && <Alert>{alert}</Alert>}
        </Form>
      </FormWrapper>
    </StyledContainer>
  );
};

export default Contact;