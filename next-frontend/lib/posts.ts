import fs from 'fs';
import path from 'path';
import { posts } from './posts-data';

// Server-only: reads a post's markdown from content/posts/.
export function getPostText(id: string): string | null {
  const post = posts.find(p => p.id === id);
  if (!post) return null;
  return fs.readFileSync(path.join(process.cwd(), 'content', 'posts', post.file), 'utf8');
}
