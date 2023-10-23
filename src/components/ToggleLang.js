import React from 'react';
import LangContext from '../contexts/LocaleContext';

function ToggleLang() {
    const { lang, toggleLang } = React.useContext(LangContext);
    
    return(
        <button onClick={toggleLang} className="toggle">{lang === 'id' ? <p>EN</p> : <p>ID</p>}</button>
    );
}

export default ToggleLang;