import './charInfo.scss';
import { useState, useEffect } from 'react';



import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'
import MarvelService from '../services/MarvelService';
import thor from '../../resources/img/thor.jpeg';

const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }


        onCharLoading();
        marvelService
        .getCharacter(charId)
        .then(onCharLoaded)
        .catch(onError)

    }
    const onCharLoaded = (char) => {


        setChar(char);
        setLoading(false)
    }

    const onCharLoading = () => {

        setLoading(true)
    }

    const onError = () => {

        setLoading(false)
        setError(true)
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/>: null;
    const spinner = loading  ? <Spinner/> : null;
    const content = !(loading||error || !char) ? <View char={char}/> : null;


    return (
            
        <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
        </div>
    )
    
}

const View = ({char}) => {
    function renderItems(char) {
        if (char.comics.length === 0) {
            return (
                <li className="char__comics-item">
                    Comics not found
                </li>
            )
        }
        const items = char.comics.map(item => {
            return (
                <li className="char__comics-item">
                    {item.name}
                </li>
            )
        });
        return (
            <ul className="char__comics-list">
                {items}
            </ul>
        )
    }

    if (char !== null) {
        if (char.description === null || char.description === undefined || char.description === '') {
            char.description = 'description not found';
        }
        else if (char.description.length > 220) {
            char.description = char.description.substr(0, 220) + '...';
        }
        
    }
    return (
        <>
            <div  className="char__basics">
                <img  src={char.thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{char.name}</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description}
            </div>
            <div className="char__comics">Comics:</div>
            {renderItems(char)}
            
        </>
    )
}


CharInfo.propTypes = {
    charId: PropTypes.number
}


export default CharInfo;