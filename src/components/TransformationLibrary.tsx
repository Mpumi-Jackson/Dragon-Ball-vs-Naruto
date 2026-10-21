import { createPortal } from 'react-dom';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { transformations, transformationKinds, type TransformationEntry, type TransformationKind } from '../data/transformations';
import type { Universe } from '../data/characters';

type UniverseFilter = 'All' | Universe;

const kindLabels: Record<TransformationKind, string> = {
  transformation: 'Transformation',
  'power-mode': 'Power mode',
  'ocular-ability': 'Ocular ability',
  'special-technique': 'Special technique',
};

export function TransformationLibrary() {
  const [universe, setUniverse] = useState<UniverseFilter>('All');
  const [kind, setKind] = useState<TransformationKind | 'all'>('all');
  const [character, setCharacter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<TransformationEntry | null>(null);

  const availableCharacters = [...new Set(transformations
    .filter((entry) => universe === 'All' || entry.universe === universe)
    .flatMap((entry) => entry.associatedCharacters))].sort((first, second) => first.localeCompare(second));
  const query = search.trim().toLocaleLowerCase();
  const results = transformations.filter((entry) => {
    if (universe !== 'All' && entry.universe !== universe) return false;
    if (kind !== 'all' && entry.kind !== kind) return false;
    if (character !== 'all' && !entry.associatedCharacters.includes(character)) return false;
    if (!query) return true;
    const searchable = [
      entry.name,
      entry.universe,
      entry.associatedCharacters.join(' '),
      entry.description,
      entry.mainAbilities.join(' '),
      entry.canonNote,
    ].join(' ').toLocaleLowerCase();
    return searchable.includes(query);
  });

  function resetFilters() {
    setUniverse('All');
    setKind('all');
    setCharacter('all');
    setSearch('');
  }

  return (
    <section className="transformation-library" aria-labelledby="transformations-title">
      <div className="section-heading section-heading--cinematic transformation-library__heading">
        <div><p className="section-eyebrow">03 / Forms, modes &amp; techniques</p><h2 id="transformations-title">Power has many shapes.</h2></div>
        <p className="section-summary">Browse canon forms and abilities by universe and user. Classifications distinguish physical transformations from chakra modes, ocular abilities, and techniques.</p>
      </div>

      <div className="transformation-toolbar">
        <div className="universe-filter" role="group" aria-label="Filter transformations by universe">
          {(['All', 'Dragon Ball', 'Naruto'] as const).map((filter) => (
            <button className={`universe-filter__button${universe === filter ? ' is-active' : ''}`} type="button" key={filter} aria-pressed={universe === filter} onClick={() => { setUniverse(filter); setCharacter('all'); }}>
              {filter === 'All' ? 'All universes' : filter}
            </button>
          ))}
        </div>
        <div className="transformation-search">
          <span aria-hidden="true">⌕</span>
          <label className="visually-hidden" htmlFor="transformation-search">Search forms, characters, or abilities</label>
          <input id="transformation-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search forms or abilities" />
          {search && <button type="button" aria-label="Clear transformation search" onClick={() => setSearch('')}>×</button>}
        </div>
        <label className="transformation-select"><span>Classification</span>
          <select value={kind} onChange={(event) => setKind(event.target.value as TransformationKind | 'all')} aria-label="Filter by classification">
            {transformationKinds.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </label>
        <label className="transformation-select"><span>Character</span>
          <select value={character} onChange={(event) => setCharacter(event.target.value)} aria-label="Filter by character">
            <option value="all">All characters</option>
            {availableCharacters.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
      </div>

      <div className="transformation-results-line">
        <p role="status" aria-live="polite">{results.length} {results.length === 1 ? 'entry' : 'entries'}</p>
        <span>CANON MATERIAL · CONTINUITY NOTES INCLUDED</span>
      </div>

      {results.length > 0 ? (
        <div className="transformation-grid">
          {results.map((entry, index) => <TransformationCard key={entry.id} entry={entry} index={index} onSelect={setSelectedEntry} />)}
        </div>
      ) : (
        <div className="transformation-empty" role="status">
          <span aria-hidden="true">⌕</span><h3>No entries found.</h3><p>Try another search or reset the filters.</p>
          <button type="button" onClick={resetFilters}>Reset filters</button>
        </div>
      )}

      <p className="transformation-library__footnote">Art shown here is original visual placeholder work, not official character or transformation artwork. No fan-made forms are included in this canon-focused index.</p>
      {selectedEntry && <TransformationDetails entry={selectedEntry} onClose={() => setSelectedEntry(null)} />}
    </section>
  );
}

function TransformationCard({ entry, index, onSelect }: { entry: TransformationEntry; index: number; onSelect: (entry: TransformationEntry) => void }) {
  const [imageFailed, setImageFailed] = useState(false);
  const usePlaceholder = !entry.imageSrc || imageFailed;

  return (
    <article className={`transformation-card transformation-card--${entry.accent}`} style={{ '--entry-index': index } as CSSProperties}>
      <div className="transformation-card__art" role="img" aria-label={`${usePlaceholder ? 'Visual placeholder' : 'Artwork'} for ${entry.name}`}>
        {entry.imageSrc && !imageFailed && <img src={entry.imageSrc} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)} />}
        <span aria-hidden="true">{entry.visualMark}</span>
        <small>{imageFailed ? 'ARTWORK UNAVAILABLE · PLACEHOLDER' : usePlaceholder ? 'VISUAL PLACEHOLDER' : 'ARTWORK'}</small>
      </div>
      <div className="transformation-card__body">
        <div className="transformation-card__meta"><span>{entry.universe}</span><span>{kindLabels[entry.kind]}</span></div>
        <h3>{entry.name}</h3>
        <p className="transformation-card__character">{entry.associatedCharacters.join(' · ')}</p>
        <p className="transformation-card__description">{entry.description}</p>
        <div className="transformation-card__abilities"><span>KEY ABILITIES</span><p>{entry.mainAbilities.slice(0, 2).join(' · ')}</p></div>
      </div>
      <button className="transformation-card__open" type="button" onClick={() => onSelect(entry)} aria-label={`View details for ${entry.name}`}>
        <span>OPEN DOSSIER</span><span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}

function TransformationDetails({ entry, onClose }: { entry: TransformationEntry; onClose: () => void }) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, [tabindex]:not([tabindex="-1"])');
      const first = focusable.item(0);
      const last = focusable.item(focusable.length - 1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="transformation-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className={`transformation-dialog transformation-dialog--${entry.accent}`} role="dialog" aria-modal="true" aria-labelledby="transformation-dialog-title" ref={dialogRef}>
        <div className="transformation-dialog__art" role="img" aria-label={`Visual placeholder for ${entry.name}`}><span aria-hidden="true">{entry.visualMark}</span><small>VISUAL PLACEHOLDER</small></div>
        <div className="transformation-dialog__body">
          <div className="transformation-dialog__topline"><span>{entry.universe.toUpperCase()} / {kindLabels[entry.kind].toUpperCase()}</span><button type="button" ref={closeRef} onClick={onClose} aria-label="Close transformation details">×</button></div>
          <h2 id="transformation-dialog-title">{entry.name}</h2>
          <p className="transformation-dialog__character">{entry.associatedCharacters.join(' · ')}</p>
          <p className="transformation-dialog__classification">CLASSIFICATION / {kindLabels[entry.kind].toUpperCase()}</p>
          <p className="transformation-dialog__description">{entry.description}</p>
          <div className="transformation-dialog__canon-note"><strong>Canon &amp; continuity</strong><br />{entry.canonNote}</div>
          <div className="transformation-dialog__columns">
            <div><h3>Main abilities</h3><ul>{entry.mainAbilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>Advantages</h3><ul>{entry.advantages.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="transformation-dialog__limitations"><h3>Limitations</h3><ul>{entry.limitations.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
}