export default function formatmd(md: string | null) {
  if (!md) return null;
  const lines = md.split('\n');
  return lines
    .map((line, idx) => {
      line = line.trim();
      if (!line) return null;
      if (line.startsWith('>')) {
        return (
          <blockquote
            key={idx}
            style={{
              fontStyle: 'italic',
              color: '#a4998c',
              borderLeft: '4px solid #d8b26e',
              paddingLeft: '1em',
              margin: '1em 0'
            }}
          >
            {line.replace(/^>\s?/, '')}
          </blockquote>
        );
      } else if (line.startsWith('*') && line.endsWith('*')) {
        return (
          <strong key={idx} style={{ color: '#514c4a', fontStyle: 'italic' }}>
            {line.replace(/\*/g, '')}
          </strong>
        )
      } else if (line.startsWith('#')) {
          return (
            <strong key={idx} style={{ color: '#514c4a', fontWeight: 'bold', fontSize: '2em' }}>
              {line.replace(/\#/g, '')}
            </strong>
          );
      } else {
        return (
          <p key={idx} style={{ color: '#6b5e54', marginBottom: '1em' }}>
            {line}
          </p>
        );
      }
    })
    .filter(Boolean);
}