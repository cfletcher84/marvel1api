import React from 'react';

function CharacterDetail({ character, onThumbnailClick, showComics }) {
  return (
    <div>
      <h2>{character.name}</h2>
      {showComics && character.description && <p>{character.description}</p>}
      {character.thumbnail && (
        <img
          src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
          alt={character.name}
          onClick={() => onThumbnailClick(character)}
        />
      )}
    </div>
  );
}

export default CharacterDetail;
