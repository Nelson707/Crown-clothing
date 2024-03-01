import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {name, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { name });
            resetFormFields();

        } catch (error) {
            console.log('user creation encountered an error', error);
        }
    };


    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return(
        <div>
            <h1>Sign Up with your email or password</h1>
            <form onSubmit={ handleSubmit }>
                <label>Name</label>
                <input type="text" required onChange={handleChange} name='name' value={name}/>

                <label>Email</label>
                <input type="email" required onChange={handleChange} name='email' value={email}/>

                <label>Password</label>
                <input type="password" required onChange={handleChange} name='password' value={password}/>

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm