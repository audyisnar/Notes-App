import React from 'react';
import PropTypes from 'prop-types';

function LoginInput({ loginUser }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const onSubmitEventHandler = (event) => {
        event.preventDefault();

        loginUser({
            email, 
            password,
        })
    }

    return (
        <form className='input-form' onSubmit={onSubmitEventHandler}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
            <button type="submit">LOGIN</button>
        </form>
    );
}

LoginInput.propTypes = {
    loginUser: PropTypes.func.isRequired,
}

export default LoginInput;