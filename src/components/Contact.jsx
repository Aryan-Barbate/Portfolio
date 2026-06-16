import { useState } from 'react';
import { Send } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const sectionRef = useScrollReveal();
  const [form, setForm] = useState({ name: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${form.name}`);
    const body = encodeURIComponent(form.message);
    window.open(`mailto:aryan.barbate@example.com?subject=${subject}&body=${body}`);
    setSent(true);
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

            <a href="mailto:aryan.barbate@example.com" className="contact-email-link">
              aryan.barbate@email →
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
                href="https://linkedin.com/in/aryan-barbate"
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
            {!sent ? (
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
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  <Send size={14} />
                  Send message
                </button>
              </form>
            ) : (
              <div className="contact-sent">
                <h3>Message sent.</h3>
                <p style={{ color: 'rgba(244,240,232,0.55)' }}>Your email client is opening. Talk soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
