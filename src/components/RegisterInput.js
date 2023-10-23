import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Register.css';

function RegisterInput({ registerUser }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const onSubmitEventHandler = (event) => {
        event.preventDefault();

        registerUser({
            name, 
            email, 
            password,
        })
    }

    return (
        <form className='input-form' onSubmit={onSubmitEventHandler}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={name} onChange={handleNameChange} placeholder="Name" />
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
            <button type="submit">REGISTER</button>
        </form>
    );
}

RegisterInput.propTypes = {
    registerUser: PropTypes.func.isRequired,
}

export default RegisterInput;