import { Github } from './BrandIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <span className="footer-brand">Aryan Barbate</span>

          <a
            href="https://github.com/Aryan-Barbate"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Github size={13} />
            View source
          </a>

          <span className="footer-meta">© {year} · Designed & built by hand</span>
        </div>
      </div>
    </footer>
  );
}
