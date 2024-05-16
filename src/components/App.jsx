import { useState } from 'react'
import CharacterList from './CharacterList'
import CharacterDetail from './CharacterDetail'



function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character)
  }

  return (
    <>
      <div>
        <h1>Marvel Characters</h1>
        <CharacterList onCharacterSelect={handleCharacterSelect} />
        {selectedCharacter && <CharacterDetail character={selectedCharacter} />}
      </div>
    </>
  )
}

export default App