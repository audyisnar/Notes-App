import React from 'react';
import ThemeContext from '../contexts/LocaleContext';
import { FaMoon, FaSun } from 'react-icons/fa';

function ToggleTheme() {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    return(
        <button onClick={toggleTheme} className="toggleTheme">{theme === 'light' ? <FaMoon /> : <FaSun />}</button>
    );
}

export default ToggleTheme;