import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { CharacterCard } from './CharacterCard';
import type { Character, Universe } from '../data/characters';

type CharacterBrowserProps = {
  characters: readonly Character[];
};

type UniverseFilter = 'All' | Universe;
type SortMode = 'name-asc' | 'name-desc' | 'estimate-desc' | 'estimate-asc';

const universeFilters: UniverseFilter[] = ['All', 'Dragon Ball', 'Naruto'];

export function CharacterBrowser({ characters }: CharacterBrowserProps) {
  const [universe, setUniverse] = useState<UniverseFilter>('All');
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('name-asc');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setIsLoading(false));
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const visibleCharacters = characters
    .filter((character) => universe === 'All' || character.universe === universe)
    .filter((character) => character.name.toLocaleLowerCase().includes(normalizedSearch))
    .sort((first, second) => {
      if (sortMode === 'estimate-desc') return second.fanPowerEstimate - first.fanPowerEstimate || first.name.localeCompare(second.name);
      if (sortMode === 'estimate-asc') return first.fanPowerEstimate - second.fanPowerEstimate || first.name.localeCompare(second.name);
      const nameOrder = first.name.localeCompare(second.name);
      return sortMode === 'name-desc' ? -nameOrder : nameOrder;
    });

  function resetFilters() {
    setUniverse('All');
    setSearch('');
    setSortMode('name-asc');
  }

  return (
    <div className="character-library" aria-labelledby="characters-title">
      <div className="section-heading section-heading--cinematic character-library__heading">
        <div>
          <p className="section-eyebrow">02 / Character archive</p>
          <h2 id="characters-title">The full roster.</h2>
        </div>
        <p className="section-summary">Browse 14 fighters across both universes. Select any dossier for canon abilities, forms, and a separate fan-made estimate.</p>
      </div>

      <div className="character-toolbar" aria-label="Character filters and sorting">
        <div className="universe-filter" role="group" aria-label="Filter by universe">
          {universeFilters.map((filter) => (
            <button
              className={`universe-filter__button${universe === filter ? ' is-active' : ''}`}
              type="button"
              key={filter}
              aria-pressed={universe === filter}
              onClick={() => setUniverse(filter)}
            >
              {filter === 'All' ? 'All fighters' : filter}
            </button>
          ))}
        </div>
        <label className="character-search">
          <span className="character-search__icon" aria-hidden="true">⌕</span>
          <span className="visually-hidden">Search characters by name</span>
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search fighters" />
          {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')}>×</button>}
        </label>
        <label className="character-sort">
          <span>Sort</span>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)} aria-label="Sort characters">
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="estimate-desc">Fan estimate: high to low</option>
            <option value="estimate-asc">Fan estimate: low to high</option>
          </select>
        </label>
      </div>

      <div className="character-results-line">
        <p role="status" aria-live="polite">{isLoading ? 'Loading character archive…' : `${visibleCharacters.length} ${visibleCharacters.length === 1 ? 'fighter' : 'fighters'}`}</p>
        <span>FAN-MADE ESTIMATES ARE NOT CANON</span>
      </div>

      {isLoading ? (
        <div className="character-roster" aria-label="Loading character cards">
          {Array.from({ length: 6 }, (_, index) => <div className="roster-skeleton" key={index} aria-hidden="true"><span /><div><i /><i /><i /></div></div>)}
        </div>
      ) : visibleCharacters.length > 0 ? (
        <div className="character-roster">
          {visibleCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} variant="roster" onSelect={setSelectedCharacter} />
          ))}
        </div>
      ) : (
        <div className="character-empty" role="status">
          <span aria-hidden="true">⌕</span>
          <h3>No fighters found.</h3>
          <p>Try another name or reset the universe filter.</p>
          <button type="button" onClick={resetFilters}>Reset filters</button>
        </div>
      )}

      {selectedCharacter && (
        <CharacterDetailsDialog character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
      )}
    </div>
  );
}

type CharacterDetailsDialogProps = {
  character: Character;
  onClose: () => void;
};

function CharacterDetailsDialog({ character, onClose }: CharacterDetailsDialogProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, [tabindex]:not([tabindex="-1"])');
      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="character-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={`character-dialog character-dialog--${character.accent}`} role="dialog" aria-modal="true" aria-labelledby="character-dialog-title" ref={dialogRef}>
        <div className="character-dialog__visual" role="img" aria-label={`Abstract placeholder artwork for ${character.name}`}>
          <span>{character.mark}</span>
          <small>ORIGINAL ART PLACEHOLDER</small>
        </div>
        <div className="character-dialog__content">
          <div className="character-dialog__topline"><span>{character.universe} / CHARACTER DOSSIER</span><button type="button" ref={closeButtonRef} onClick={onClose} aria-label="Close character details">×</button></div>
          <p className="featured-card__eyebrow">CANON PROFILE</p>
          <h2 id="character-dialog-title">{character.name}</h2>
          <p className="character-dialog__role">{character.role}</p>
          <p className="character-dialog__description">{character.description}</p>
          <div className="character-dialog__canon-note">Abilities and forms are selected canon examples; continuity and availability can vary.</div>
          <div className="character-dialog__lists">
            <div>
              <h3>Signature abilities</h3>
              <ul>{character.abilities.map((ability) => <li key={ability}>{ability}</li>)}</ul>
            </div>
            <div>
              <h3>Transformations &amp; forms</h3>
              <ul>{character.transformations.map((form) => <li key={form}>{form}</li>)}</ul>
            </div>
          </div>
          <div className="character-dialog__estimate">
            <div><span>FAN-MADE POWER ESTIMATE</span><small>Editorial scale · not an official statistic</small></div>
            <strong>{character.fanPowerEstimate}<small> / 100</small></strong>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}