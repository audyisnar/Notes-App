import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import LocaleContext from '../contexts/LocaleContext';
import { login } from '../utils/network-data'

function LoginPage({ loginSuccess }) {
    const { lang, toggleLang } = React.useContext(LocaleContext);

    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password});

        if(!error) {
            console.log(data);
            loginSuccess(data);
        }
    }

    return(
        <section className="container-input">
            {lang === 'id' ? <h2>Masuk ke Akun Anda</h2> : <h2>Login to Your Account</h2>}
            <LoginInput loginUser={onLogin}/>
            {lang === 'id' ? <p>Belum punya akun? <Link to="/register">Register</Link></p> : <p>Don't have an account? <Link to="/register">Register</Link></p>}
        </section>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
}

export default LoginPage;