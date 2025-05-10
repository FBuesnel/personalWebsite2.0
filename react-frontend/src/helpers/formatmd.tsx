import styled from 'styled-components';

const StyledBlockquote = styled.blockquote`
  font-style: italic;
  color: ${({ theme }) => theme.secondaryText};
  border-left: 4px solid ${({ theme }) => theme.accent};
  padding-left: 1em;
  margin: 1em 0;
`;

const StyledStrong = styled.strong`
  color: ${({ theme }) => theme.secondaryText};
  font-weight: normal;
  font-style: italic;
`;

const StyledHeading = styled.strong`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 2em;
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.secondaryText};
`;

const EmptyLine = styled.div`
  margin-bottom: 1em;
`;

export default function formatmd(md: string | null) {
  if (!md) return null;
  const lines = md.split('\n');
  return lines
    .map((line, idx) => {
      line = line.trim();
      if (!line) {
        return <EmptyLine key={idx} />;
      }

      if (line.startsWith('>')) {
        return (
          <StyledBlockquote key={idx}>
            {line.replace(/^>\s?/, '')}
          </StyledBlockquote>
        );
      } else if (line.startsWith('*') && line.endsWith('*')) {
        return (
          <StyledStrong key={idx}>
            {line.replace(/\*/g, '')}
          </StyledStrong>
        );
      } else if (line.startsWith('#')) {
        return (
          <StyledHeading key={idx}>
            {line.replace(/\#/g, '')}
          </StyledHeading>
        );
      } else {
        return (
          <StyledParagraph key={idx}>
            {line}
          </StyledParagraph>
        );
      }
    })
    .filter(Boolean);
}