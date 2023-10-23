import React from 'react';
import ToggleTheme from './ToggleTheme';
import ToggleLang from './ToggleLang';
import LocaleContext from '../contexts/LocaleContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import '../styles/NavBar.css';

function Navigation({ auth, logout, name }) {
    const { lang, toggleLang } = React.useContext(LocaleContext);
    return (
        <nav className='navigation'>
            <Link to="/" className='text-link'><h1>CatatanQuu</h1></Link>
            {auth !== null 
                ?   <div className="btn">
                        <ul>
                            <li><Link to="/buat-catatan" className='text-link'>{lang === 'id' ? "Buat Catatan" : "Create Note"}</Link></li>
                            <li><Link to="/arsip" className='text-link'>{lang === 'id' ? "Arsip" : "Archives"}</Link></li>
                        </ul>
                        <div className='btn-rightPosition'>
                            <div className="btn-toggle">
                                <ToggleLang />
                                <ToggleTheme />
                            </div>
                            <button onClick={logout}>{name}<FiLogOut /></button>
                        </div>
                    </div>
                :   
                    <div className="btn-toggle">
                        <ToggleLang />
                        <ToggleTheme />
                    </div>
            }
        </nav>
    );
}

Navigation.propTypes = {
    auth: PropTypes.object,
    logout: PropTypes.func,
    name: PropTypes.string,
}

export default Navigation;