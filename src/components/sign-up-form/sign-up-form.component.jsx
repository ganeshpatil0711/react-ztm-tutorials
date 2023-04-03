import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.contexts";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords and confirm password do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      alert('User created successfully');
    } catch (error) {
      if (error.code == 'auth/email-already-in-use') {
        alert('Can not create user, email id already registered');
      }
      else {
        console.log('ganesh error', error);
      }
    }

  }

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Display Name' type="text" required onChange={handleOnChange} name="displayName" value={displayName} />

        <FormInput label='Email' type="email" required onChange={handleOnChange} name="email" value={email} />

        <FormInput label='Password' type="password" required onChange={handleOnChange} name="password" value={password} />

        <FormInput label='Confirm Password' type="password" required onChange={handleOnChange} name="confirmPassword" value={confirmPassword} />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm