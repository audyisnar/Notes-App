import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import LocaleContext from '../contexts/LocaleContext';
import { register } from '../utils/network-data';

import '../styles/Register.css';

function RegisterPage() {
    const { lang, toggleLang } = React.useContext(LocaleContext);
    const navigate = useNavigate();

    async function onRegisterHandler({name, email, password}) {
        const { error } = await register({name, email, password});
        if(!error) {
            navigate('/');
        }
    }

    return(
        <section className="container-input">
            {lang === 'id' ? <h2>Daftarkan Akun Anda</h2> : <h2>Register Your Account</h2>}
            <RegisterInput registerUser={onRegisterHandler}/>
            {lang === 'id' ? <p>Sudah punya akun? <Link to="/">Login</Link></p> : <p>Already have an account? <Link to="/">Login</Link></p>}
        </section>
    );
}

export default RegisterPage;