import React, {useState} from 'react'
import axios from 'axios'
import CharacterDetail from './CharacterDetail'

const publicKey = '6d19a60a9531e9519dfd7b19136bd29d'
const hash = '37ee12b32dbef6d0656581b9ee461e2f'
const apiUrl= `https://gateway.marvel.com/v1/public/characters`

function CharacterList() {
    const [characterData, setCharacterData] = useState('')
    const [character, setCharacter] = useState(null)
    const [comics, setComics] = useState([])
    const [showComics, setShowComics] = useState(false)

    const handleChange = (event) => {
        setCharacterData(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.get(apiUrl, {
                params: {
                    ts: 1,
                    apikey: publicKey,
                    hash: hash,
                    name: characterData
                }
            });
            setCharacter(response.data.data.results[0]);
        } catch (error) {
            console.error("Error fetching character data:", error);
            console.error("Response data:", error.response.data)
        }
    }

    const handleThumbnailClick = async (character) => {
        try {
            const response = await axios.get(`${apiUrl}/${character.id}/comics`, {
                params: {
                    ts: 1,
                    apikey: publicKey,
                    hash: hash
                }
            });
            setComics(response.data.data.results);
            setShowComics(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Authentication error. Please check your API credentials.");
            } else {
                console.error("Error fetching comics:", error);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Marvel Characters</h3>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={characterData} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            {character && (
                <CharacterDetail
                    character={character}
                    onThumbnailClick={handleThumbnailClick}
                    showComics={showComics}
                />
            )}
            {showComics && (
                <ul>
                    {comics.map((comic) => (
                        <li key={comic.id}>{comic.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CharacterList;