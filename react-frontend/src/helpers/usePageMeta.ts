import { useEffect } from 'react';

// Sets the document title and meta description for a page so each route
// shows its own title in search results, browser tabs, and link previews.
const usePageMeta = (title: string, description?: string) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', description);
      }
    }
  }, [title, description]);
};

export default usePageMeta;
