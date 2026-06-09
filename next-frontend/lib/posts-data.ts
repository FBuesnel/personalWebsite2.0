// Client-safe post registry: ids are the route slugs (/posts/:id),
// files live in content/posts/ and are read server-side in lib/posts.ts.
export interface PostMeta {
  id: string;
  title: string;
  quote: string;
  file: string;
}

export const posts: PostMeta[] = [
  {
    id: 'moving-into-eternity',
    title: 'Moving Into Eternity',
    quote: 'Yet as Akshan sat slowly onto the bench, his little life became whole, and he felt the eternity of the world.',
    file: 'post1.md',
  },
  {
    id: 'explanation-poem',
    title: 'Explanation',
    quote: 'My life is ever-expanding chasing her',
    file: 'post2.md',
  },
  {
    id: 'maile-birthday-2025',
    title: 'Radiance',
    quote: 'I thought: here, everything is.',
    file: 'post3.md',
  },
  {
    id: 'places-to-return-to',
    title: 'Places I want to go back to, before I die',
    quote: 'I’d like a bench named “Fynn"',
    file: 'post4.md',
  },
  // Add more posts here
];
