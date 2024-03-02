import { useState } from 'react';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

import Button from '../button/button.component';

import './sign-up-form.style.scss';

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
        <div className='sign-up-container'>
            <h2>Dont have an account ?</h2>
            <span>Sign Up with your email or password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput
                label='Name'
                type="text" 
                required 
                onChange={handleChange} 
                name='name' 
                value={name}
                />

                
                <FormInput
                label='Email'
                type="email" 
                required 
                onChange={handleChange} 
                name='email' 
                value={email}
                />

                
                <FormInput
                label='Password'
                type="password" 
                required 
                onChange={handleChange} 
                name='password' 
                value={password}
                />

                
                <FormInput
                label='Confirm Password'
                type="password" 
                required 
                onChange={handleChange} name='confirmPassword' 
                value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm