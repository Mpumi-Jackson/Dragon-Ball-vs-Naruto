import { ActionLink } from './components/ActionLink';
import { BattleArena } from './components/BattleArena';
import { CharacterBrowser } from './components/CharacterBrowser';
import { Reveal } from './components/Reveal';
import { TransformationLibrary } from './components/TransformationLibrary';
import { characters } from './data/characters';
import { useRef, useState } from 'react';

const rankingRows = [
  { category: 'Raw output', dragonBall: 'Extreme', naruto: 'High', leader: 'Dragon Ball' },
  { category: 'Technique variety', dragonBall: 'Broad', naruto: 'Exceptional', leader: 'Naruto' },
  { category: 'Combat adaptation', dragonBall: 'Rapid growth', naruto: 'Tactical range', leader: 'Depends on matchup' },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="cinematic-header" onKeyDown={(event) => {
        if (event.key === 'Escape' && isMenuOpen) {
          setIsMenuOpen(false);
          menuToggleRef.current?.focus();
        }
      }}>
        <a className="cinematic-brand" href="#home" aria-label="Dragon-Ball-vs-Naruto home">
          <span className="cinematic-brand__mark" aria-hidden="true">DB<span>×</span>N</span>
          <span className="cinematic-brand__name">MATCHUP<br />ARCHIVE</span>
        </a>
        <button className="nav-toggle" type="button" ref={menuToggleRef} aria-expanded={isMenuOpen} aria-controls="main-navigation" aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setIsMenuOpen((open) => !open)}>
          <span className="nav-toggle__icon" aria-hidden="true"><i /><i /><i /></span>
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
        </button>
        <nav className={`cinematic-nav${isMenuOpen ? ' is-open' : ''}`} id="main-navigation" aria-label="Main navigation">
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#characters" onClick={() => setIsMenuOpen(false)}>Characters</a>
          <a href="#transformations" onClick={() => setIsMenuOpen(false)}>Transformations</a>
          <a href="#rankings" onClick={() => setIsMenuOpen(false)}>Power Rankings</a>
          <a href="#arena" onClick={() => setIsMenuOpen(false)}>Battle Arena</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
        </nav>
        <a className="header-arena" href="#arena">Enter arena <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main-content">
        <section className="cinematic-hero" id="home" aria-labelledby="page-title">
          <div className="cinematic-hero__intro">
            <p className="cinematic-kicker"><span className="kicker-line" /> CROSS-UNIVERSE DOSSIER <span className="kicker-line" /></p>
            <h1 id="page-title" aria-label="Dragon-Ball-vs-Naruto"><span>Dragon-Ball-</span><span>vs-Naruto</span></h1>
            <p className="cinematic-subtitle">Two Legendary Universes. One Ultimate Showdown.</p>
            <div className="duel-actions">
              <ActionLink href="#characters">Explore Characters <span aria-hidden="true">↓</span></ActionLink>
              <ActionLink href="#arena" variant="quiet">Enter Battle Arena <span aria-hidden="true">↗</span></ActionLink>
            </div>
          </div>

          <div className="duel-stage" aria-label="Goku of Dragon Ball versus Naruto Uzumaki">
            <article className="duel-side duel-side--goku">
              <div className="duel-side__art" aria-hidden="true">
                <span className="duel-side__rays" />
                <span className="duel-side__sigil">悟</span>
                <span className="duel-side__art-note">ABSTRACT ART PLACEHOLDER</span>
              </div>
              <div className="duel-side__copy">
                <p>DRAGON BALL <span>/</span> SAIYAN</p>
                <h2>GOKU</h2>
                <span>Ki · instinct · limitless growth</span>
              </div>
            </article>
            <div className="duel-clash" role="img" aria-label="Animated energy clash between orange ki and blue chakra">
              <span className="duel-clash__ring" />
              <span className="duel-clash__core">VS</span>
              <span className="duel-clash__spark duel-clash__spark--one" />
              <span className="duel-clash__spark duel-clash__spark--two" />
            </div>
            <article className="duel-side duel-side--naruto">
              <div className="duel-side__art" aria-hidden="true">
                <span className="duel-side__rays" />
                <span className="duel-side__sigil">忍</span>
                <span className="duel-side__art-note">ABSTRACT ART PLACEHOLDER</span>
              </div>
              <div className="duel-side__copy">
                <p>HIDDEN LEAF <span>/</span> SHINOBI</p>
                <h2>NARUTO</h2>
                <span>Chakra · clones · resolve</span>
              </div>
            </article>
          </div>
          <a href="#about" className="hero-scroll"><span /> THE UNIVERSES <span aria-hidden="true">↓</span></a>
        </section>

        <section className="universe-section" id="about" aria-labelledby="universe-title">
          <Reveal className="content-frame">
            <div className="section-heading section-heading--cinematic">
              <div><p className="section-eyebrow">01 / Two worlds</p><h2 id="universe-title">Different origins.<br />Shared fire.</h2></div>
              <p className="section-summary">One universe reaches for the next horizon. The other turns discipline and imagination into a thousand ways forward.</p>
            </div>
            <div className="universe-grid">
              <article className="universe-panel universe-panel--ki">
                <span className="universe-panel__index">A / MARTIAL COSMOS</span>
                <span className="universe-panel__symbol" aria-hidden="true">気</span>
                <h3>Dragon Ball</h3>
                <p>Warriors refine ki through training, instinct, and transformation. Every limit is an invitation to surpass it.</p>
                <span className="universe-panel__footer">ENERGY LANGUAGE <strong>KI</strong></span>
              </article>
              <article className="universe-panel universe-panel--chakra">
                <span className="universe-panel__index">B / SHINOBI WORLD</span>
                <span className="universe-panel__symbol" aria-hidden="true">印</span>
                <h3>Naruto</h3>
                <p>Shinobi shape chakra into ninjutsu, strategy, and bonds. Creativity can change the terms of a fight.</p>
                <span className="universe-panel__footer">ENERGY LANGUAGE <strong>CHAKRA</strong></span>
              </article>
            </div>
          </Reveal>
        </section>

        <section className="characters-section" id="characters" aria-labelledby="characters-title">
          <Reveal className="content-frame">
            <CharacterBrowser characters={characters} />
          </Reveal>
        </section>

        <section className="transformations-section" id="transformations" aria-label="Transformation library">
          <Reveal className="content-frame">
            <TransformationLibrary />
          </Reveal>
        </section>

        <section className="rankings-section" id="rankings" aria-labelledby="rankings-title">
          <Reveal className="content-frame rankings-layout">
            <div className="rankings-intro">
              <p className="section-eyebrow">04 / Power rankings</p>
              <h2 id="rankings-title">No single scale<br />can tell the story.</h2>
              <p>These editorial profiles compare broad strengths, not official power levels. Version, context, and rules all matter.</p>
              <a className="text-link" href="#arena">Set the battle rules <span aria-hidden="true">↗</span></a>
            </div>
            <div className="ranking-board">
              <div className="ranking-board__head"><span>ATTRIBUTE</span><span>DRAGON BALL</span><span>NARUTO</span></div>
              {rankingRows.map((row, index) => (
                <div className="ranking-row" key={row.category}>
                  <span className="ranking-row__number">0{index + 1}</span>
                  <strong>{row.category}</strong>
                  <span className="ranking-row__value ranking-row__value--goku">{row.dragonBall}</span>
                  <span className="ranking-row__value ranking-row__value--naruto">{row.naruto}</span>
                  <span className="ranking-row__leader">Edge: {row.leader}</span>
                </div>
              ))}
              <div className="ranking-board__legend"><span><i className="legend-dot legend-dot--goku" /> KI PROFILE</span><span><i className="legend-dot legend-dot--naruto" /> CHAKRA PROFILE</span></div>
            </div>
          </Reveal>
        </section>

        <section className="arena-section" id="arena" aria-labelledby="arena-page-title">
          <Reveal className="content-frame arena-panel">
            <BattleArena />
          </Reveal>
        </section>
      </main>

      <footer className="cinematic-footer">
        <a className="cinematic-brand" href="#home"><span className="cinematic-brand__mark" aria-hidden="true">DB<span>×</span>N</span><span className="cinematic-brand__name">MATCHUP<br />ARCHIVE</span></a>
        <p>Fan-made comparison. Not affiliated with the Dragon Ball or Naruto rights holders.</p>
        <a href="#home">Back to top <span aria-hidden="true">↑</span></a>
      </footer>
    </div>
  );
}

export default App;