import { useState } from 'react';
import { X, BookOpen, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';

const posts = [
  {
    title: 'Lessons from the Jikan API: Handling Rate Limits in React',
    date: 'June 2026',
    readTime: '4 min read',
    excerpt: 'Building AniScope meant dealing with a high-traffic public API. Here is how I managed API request queuing, search debouncing, and in-memory caches.',
    content: `When building AniScope, my anime discovery platform, I wanted it to feel like a desktop application—fast, responsive, and resilient. But since AniScope is a frontend-only app talking directly to the Jikan API (a community-run REST API for MyAnimeList), I ran into a classic problem: API rate limits and unexpected failures.

Here is what I learned and how I solved it:

1. Debouncing Search Queries
With every keystroke triggering an API call, users could easily exceed the 3 requests per second limit. I implemented a custom debouncing hook that delays the search fetch by 500ms, waiting for the user to finish typing before making the call.

2. Caching Responses in Memory
Anime details rarely change. To prevent redundant network requests, I built a simple cache map in memory. If a user clicks back and forth between screens, the app serves data instantly from the cache instead of querying the API.

3. Graceful Error Fallbacks
When Jikan returns a 429 Too Many Requests, instead of crashing, AniScope displays a clean warning and offers a retry button with an automatic back-off timer to wait out the rate window.`
  },
  {
    title: 'Canvas API & The Math of Smooth Motion',
    date: 'May 2026',
    readTime: '5 min read',
    excerpt: 'Deep dive into standard easing functions, particle physics, and frame-rate independent updates using requestAnimationFrame.',
    content: `For the Gallery of Senses project, my goal was to design an interactive exhibit that felt alive. To make animations feel premium, you cannot rely on basic CSS linear transitions. You need easing and physics.

Here is the math that makes interactive canvas rendering look natural:

1. Linear Interpolation (Lerp)
To move a particle toward the mouse cursor smoothly, I used Lerp. Instead of moving the particle directly to the target, you move it a fraction of the distance:
current = current + (target - current) * easingFactor. This creates a beautiful, trailing drag effect.

2. Frame-Rate Independence
If a screen runs at 144Hz, animations can run twice as fast as on a 60Hz screen if you just increment positions per frame. By calculating the deltaTime between frames and multiplying movement vectors by it, the experience remains consistent across all hardware.`
  }
];

export default function Writing() {
  const [selectedPost, setSelectedPost] = useState(null);
  const sectionRef = useScrollReveal();

  return (
    <section id="writing" className="writing-section section-pad" ref={sectionRef}>
      <div className="container">
        <div className="section-header section-header-row">
          <div>
            <p className="eyebrow">Journal</p>
            <h2 className="display-section reveal reveal-delay-1" style={{ marginTop: '1rem' }}>
              Writing on the<br />process of build.
            </h2>
          </div>
          <span className="section-index reveal reveal-delay-2">05</span>
        </div>

        <div className="writing-grid">
          {posts.map((post, index) => (
            <article 
              key={post.title} 
              className={`writing-card reveal reveal-delay-${index + 1}`}
              onClick={() => setSelectedPost(post)}
            >
              <div className="writing-meta">
                <span className="writing-date">{post.date}</span>
                <span className="writing-sep">·</span>
                <span className="writing-time">
                  <Clock size={12} style={{ marginRight: '4px', display: 'inline' }} />
                  {post.readTime}
                </span>
              </div>
              <h3 className="writing-title">{post.title}</h3>
              <p className="writing-excerpt">{post.excerpt}</p>
              <span className="writing-read-more">
                Read article <BookOpen size={13} style={{ marginLeft: '6px' }} />
              </span>
            </article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div 
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
            />
            <motion.aside
              className="modal-panel writing-reader-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 300 }}
              role="dialog"
              aria-label={selectedPost.title}
            >
              <button 
                className="modal-close writing-reader-close" 
                onClick={() => setSelectedPost(null)}
                aria-label="Close article"
              >
                <X size={18} />
              </button>

              <div className="writing-reader-body">
                <p className="eyebrow">{selectedPost.date} · {selectedPost.readTime}</p>
                <h2 className="writing-reader-title">{selectedPost.title}</h2>
                <div className="writing-reader-divider" />
                <div className="writing-reader-content">
                  {selectedPost.content.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
                      const [title, ...rest] = paragraph.split('\n');
                      return (
                        <div key={pIdx} className="writing-reader-section">
                          <h4 className="writing-reader-section-title">{title}</h4>
                          <p className="body-text">{rest.join('\n')}</p>
                        </div>
                      );
                    }
                    return (
                      <p key={pIdx} className="body-text" style={{ marginBottom: '1.5rem' }}>
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
