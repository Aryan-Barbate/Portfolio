import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Github, Linkedin } from './BrandIcons';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const sectionRef = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  // The user can configure their Formspree ID here.
  // If it remains the placeholder, the form will fall back to mailto automatically.
  const FORMSPREE_ID = 'https://formspree.io/f/mkoadyrz'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const hasFormspreeId = FORMSPREE_ID && FORMSPREE_ID !== 'YOUR_FORMSPREE_ID';

    if (!hasFormspreeId) {
      // Graceful fallback to mailto if Formspree is not configured
      const subject = encodeURIComponent(`Hello from ${form.name}`);
      const body = encodeURIComponent(`From: ${form.email}\n\n${form.message}`);
      window.open(`mailto:aryanbarbate3@gmail.com?subject=${subject}&body=${body}`);
      setStatus('success');
      return;
    }

    try {
      const formspreeUrl = FORMSPREE_ID.startsWith('http')
        ? FORMSPREE_ID
        : `https://formspree.io/f/${FORMSPREE_ID}`;

      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#e85d04', '#c44d00', '#2a2824', '#ebe5d9']
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback to mailto if fetch fails
      const subject = encodeURIComponent(`Hello from ${form.name} (Fallback)`);
      const body = encodeURIComponent(`From: ${form.email}\n\n${form.message}`);
      window.open(`mailto:aryanbarbate3@gmail.com?subject=${subject}&body=${body}`);
      setStatus('success'); // mark as success since mailto was triggered
    }
  };

  return (
    <section id="contact" className="contact-section section-pad" ref={sectionRef}>
      <div className="container">
        <div className="contact-layout">
          <div className="reveal">
            <p className="eyebrow">Contact</p>
            <h2 className="contact-headline" style={{ marginTop: '1.5rem' }}>
              Let's build<br />
              <em>something real.</em>
            </h2>
            <p className="body-text" style={{ color: 'rgba(244,240,232,0.55)', marginTop: '1.5rem', maxWidth: 400 }}>
              Open to conversations, collaboration, and building. If something resonated here, reach out.
            </p>

            <a href="mailto:aryanbarbate3@gmail.com" className="contact-email-link">
              aryanbarbate3@gmail.com →
            </a>

            <div className="contact-channels">
              <a
                href="https://github.com/Aryan-Barbate"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <div>
                  <p className="contact-channel-label">GitHub</p>
                  <p className="contact-channel-value">Aryan-Barbate</p>
                </div>
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/aryan-barbate-b653b9393"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <div>
                  <p className="contact-channel-label">LinkedIn</p>
                  <p className="contact-channel-value">Aryan Barbate</p>
                </div>
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            {status !== 'success' ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div>
                  <label className="form-label" htmlFor="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Who's reaching out?"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    disabled={status === 'sending'}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="contact-email">Your email</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="How can I reply to you?"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    disabled={status === 'sending'}
                    required
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="form-textarea"
                    placeholder="What would you like to build or talk about?"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    disabled={status === 'sending'}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="contact-sent">
                <h3>Message sent.</h3>
                <p style={{ color: 'rgba(244,240,232,0.55)', marginTop: '0.5rem' }}>
                  Thank you! I will get back to you shortly.
                </p>
                <button 
                  className="btn btn-outline" 
                  style={{ marginTop: '1.5rem' }} 
                  onClick={() => setStatus('idle')}
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
