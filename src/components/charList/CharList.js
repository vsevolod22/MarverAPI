
import { useState, useEffect, useRef } from 'react';



import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../services/MarvelService';
import './charList.scss';





const CharList = (props) => {

    const [charList, setCharlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [offset, setOffset] = useState(200);
    const [id, setId] = useState(0);
    


    

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, []);


    const onRequest = (offset = 190) => {
        const newOffset = offset + 10;
        setLoading(true);
        marvelService
        .getAllCharacters(offset) 
        .then(res => {
            onCharLoaded(res);
        })
        .catch(onError)
        setLoading(true);
        setOffset(newOffset);

    }



    const onCharLoaded = (newcharList) => {
        setCharlist(charList => [...charList, ...newcharList]);
        setLoading(false);
        setError(false);
    }

    const onError = () => {

        setLoading(false);
        setError(true);
    }

    const getId = (id, bool = false) => {
        setId(id);
        props.onClick(id, bool);
    }
    const content = !(loading||error) ? <View char={charList}/> : null;
    if (content) {
        console.log(charList);
    }
    if (content) {
        return (    
            
            <div className="char__list">
                <View char={charList} onChange={getId} />
                
                <button onClick={() => onRequest(offset)} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
            
        )
    
    }
    else {
        return (<Loading error={error} loading={loading} char={charList} />)
    }
    
    

}


const Loading = ({error, loading, char}) => {


    console.log(error)
    const errorMessage = error ? <ErrorMessage/>: null;
    const spinner = loading ? <Spinner/> : null;

    const showSpinner = () => {
        return (
            <div className="char__list">
            {spinner}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
        )
    }


    useEffect(() => {
        showSpinner();
    },[])

    function renderItems(char) {
        const items = char.map(item => {
            let imgStyle = {'objectFit': 'cover'};
            return (
                <li className="char__item">
                    <div className="char__load" style={imgStyle}>{spinner}</div>
                    <div className="char__name">loading...</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    return (
        <div className="char__list">
            {errorMessage}
            {char.length <= 0 ? spinner : null}
            {renderItems(char)}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = ({char, onChange}) => {
    const getId = (event) => {
        onChange(event.currentTarget.getAttribute('data'),true);
        
    }

    function renderItems(char) {
        const items = char.map(item => {
            let imgStyle = {'objectFit': 'cover'};
            return (
            <li className="char__item"
            data={item.id} onClick={getId}>
                <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                <div className="char__name">{item.name}</div>
            </li>
            )
        });
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }



    return (
        renderItems(char)
    )
}

export default CharList;