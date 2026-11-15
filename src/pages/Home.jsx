import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../context/useLanguage';
import ProjectArt from '../components/ProjectArt';
import { useReveal } from '../hooks/useReveal';
import { useHeroPointer } from '../hooks/useHeroPointer';

// Hero title pieces. Delays (ms) shrink along the word so it reads as a wave, not a metronome.
// Each letter also tumbles in from a slightly different angle (--r).
const NAME_MAIN = [...'EBVAM'].map((char, i) => ({ char, delay: 450 + [0, 110, 200, 280, 350][i], tilt: [-7, 5, -4, 6, -5][i] }));
const NAME_FAMILY = [{ word: 'ZAMBRANA', delay: 1150 }, { word: 'VIA', delay: 1300 }];

// The intro plays once per page load; coming back to Home inside the SPA shows the hero at rest.
let introPlayed = false;

export default function Home() {
  const { t } = useLanguage();
  const [intro] = useState(() => !introPlayed);
  useEffect(() => { introPlayed = true; }, []);
  const heroRef = useRef(null);
  useReveal();
  useHeroPointer(heroRef);
  return <div className="home-page">
    <section ref={heroRef} className={`monolith-hero${intro ? ' intro' : ''}`} aria-labelledby="hero-name">
      {intro && <div className="monolith-curtain" aria-hidden="true" />}
      <div className="monolith-scene" aria-hidden="true">
        <img className="hero-artwork" src="/media/monolith-1800.jpg" srcSet="/media/monolith-900.jpg 900w, /media/monolith-1800.jpg 1800w" sizes="100vw" width="1800" height="1125" alt="" fetchPriority="high" />
      </div>
      <div className="monolith-foreground" aria-hidden="true">
        <svg className="hero-artwork" viewBox="0 0 1586 992" preserveAspectRatio="xMidYMid slice">
          <defs><clipPath id="monolith-apex"><polygon points="973,246 1000,530 664,570" /></clipPath></defs>
          <image href="/media/monolith-1800.jpg" width="1586" height="992" preserveAspectRatio="none" clipPath="url(#monolith-apex)" />
        </svg>
      </div>
      <div className="monolith-spot" aria-hidden="true" />
      <div className="monolith-shade" aria-hidden="true" />
      <h1 id="hero-name" className="monolith-name" aria-label="Ebvam Brandon Zambrana Via"><span className="name-main" aria-hidden="true">{NAME_MAIN.map(({ char, delay, tilt }) => <span className="ch" key={char + delay}><span className="ch-in" style={{ '--d': `${delay}ms`, '--r': `${tilt}deg` }}>{char}</span></span>)}</span><span className="name-family" aria-hidden="true">{NAME_FAMILY.map(({ word, delay }, i) => <span key={word}>{i > 0 && ' '}<span className="wd"><span className="wd-in" style={{ '--d': `${delay}ms` }}>{word}</span></span></span>)}</span></h1>
      <p className="monolith-fullname">Ebvam Brandon Zambrana Via</p>
      <div className="monolith-bottom">
        <div className="monolith-role"><p>{t.home.role}</p></div>
        <div className="hero-actions"><Link className="button button-primary" to="/proyectos">{t.home.btnPortfolio}<FiArrowUpRight aria-hidden="true"/></Link><a className="button button-secondary" href="https://wa.me/59178304012" target="_blank" rel="noopener noreferrer">{t.home.btnTalk}<FiArrowUpRight aria-hidden="true"/></a></div>
      </div>
      <p className="monolith-caption">{t.home.conceptArt}</p>
    </section>
    <section className="intro-strip" data-reveal="" aria-label={t.home.introLabel}>
      <div><p className="availability"><span/>{t.home.badge}</p><p className="intro-description">{t.home.description}</p></div>
      <div className="intro-links"><div className="social-links"><a href="https://github.com/ExoZed117" target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true"/>GitHub</a><a href="https://www.linkedin.com/in/zambrana-via-ebvam/" target="_blank" rel="noopener noreferrer"><FaLinkedin aria-hidden="true"/>LinkedIn</a><a href="https://wa.me/59178304012" target="_blank" rel="noopener noreferrer"><FaWhatsapp aria-hidden="true"/>WhatsApp</a></div><a className="text-link" href="#selected-work">{t.home.exploreWork}<FiArrowDown aria-hidden="true"/></a></div>
    </section>
    <section className="home-work" id="selected-work"><div className="section-heading" data-reveal=""><h2>{t.home.workTitle}</h2><Link className="text-link" to="/proyectos">{t.home.allProjects}<FiArrowUpRight aria-hidden="true"/></Link></div>
      <Link to="/proyectos" className="home-feature" data-reveal="" style={{ '--i': 1 }}><ProjectArt title={t.projects.list.shield.title}/><div><p>{t.projects.list.shield.type}</p><h3>{t.projects.list.shield.title}</h3><p>{t.projects.list.shield.desc}</p><span className="text-link">{t.home.btnPortfolio}<FiArrowUpRight aria-hidden="true"/></span></div></Link>
    </section>
    <section className="home-profile" data-reveal=""><h2>{t.home.profileTitle}</h2><div><p>{t.about.bio}</p><Link className="text-link" to="/sobre-mi">{t.home.btnAbout}<FiArrowUpRight aria-hidden="true"/></Link></div></section>
  </div>;
}
