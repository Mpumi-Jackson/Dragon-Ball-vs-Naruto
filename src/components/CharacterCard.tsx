import { useState } from 'react';
import type { Character } from '../data/characters';

type CharacterCardProps = {
  character: Character;
  onSelect?: (character: Character) => void;
  variant?: 'featured' | 'roster';
};

export function CharacterCard({ character, onSelect, variant = 'featured' }: CharacterCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const isPortraitUnavailable = !character.imageSrc || imageFailed;
  const content = (
    <>
      <div className={`featured-card__art${isPortraitUnavailable ? ' featured-card__art--placeholder' : ''}`} role="img" aria-label={isPortraitUnavailable ? `Artwork placeholder for ${character.name}` : `${character.name} character artwork`}>
        {!isPortraitUnavailable && (
          <img className="featured-card__image" src={character.imageSrc ?? undefined} alt="" loading="lazy" decoding="async" onError={() => setImageFailed(true)} />
        )}
        <span className="featured-card__glyph" aria-hidden="true">{character.mark}</span>
        <span className="featured-card__art-label">{imageFailed ? 'ARTWORK UNAVAILABLE · PLACEHOLDER' : 'ORIGINAL ART PLACEHOLDER'}</span>
      </div>
      <div className="featured-card__copy">
        <p className="featured-card__eyebrow">{character.universe} / {character.role}</p>
        <h3>{character.name}</h3>
        <p className="featured-card__signature">Signature style <strong>{character.signature}</strong></p>
        <div className="featured-card__details">
          <span>Fan-made power estimate <b>{character.fanPowerEstimate} / 100</b></span>
          <span>Known form <b>{character.transformations[0]}</b></span>
        </div>
      </div>
    </>
  );

  return (
    <article className={`featured-card featured-card--${character.accent} featured-card--${variant}${onSelect ? ' featured-card--interactive' : ''}`}>
      <div className="featured-card__content">{content}</div>
      {onSelect && (
        <button className="featured-card__button" type="button" onClick={() => onSelect(character)} aria-label={`View details for ${character.name}`}>
          <span className="visually-hidden">Open character details</span>
        </button>
      )}
      <span className="featured-card__index" aria-hidden="true">{character.universe.toUpperCase()} / PROFILE</span>
    </article>
  );
}