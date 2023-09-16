


class MarvelService {

    _apiBaseUrl = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=bdab3570e531fb912338f7f9725379ba';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${fetch.sttatus}`);
        }


        return await res.json();
    }
    getAllCharacters = async (offset = 210) => {
        const res = await this.getResource(`${this._apiBaseUrl}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBaseUrl}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);

    }
    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items

        }
    }
}
export default MarvelService;
