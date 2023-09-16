import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import { useState } from "react";


const App = () => {

    const [slectedId, setId] = useState(null);
    const [selected] = useState(false);
    const onCharSelected = (id) => {
        setId(id);
    }
    

   return (
       <div className="app">
           <AppHeader/>
           <main>
               <RandomChar/>
               <div className="char__content">
                   <CharList onClick={onCharSelected}/>
                   <CharInfo charId={slectedId} charBool={selected}/>
                   
               </div>
               <img className="bg-decoration" src={decoration} alt="vision"/>
           </main>
       </div>
   )
        
    
}

export default App;