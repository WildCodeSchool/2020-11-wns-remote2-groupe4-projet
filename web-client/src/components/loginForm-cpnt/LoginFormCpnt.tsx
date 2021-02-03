import React from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
};

const CREATE_SESSION = gql`
  mutation CreateSession($email: String!, $password: String!) {
    createSession(input: { email: $email, password: $password }) {
      firstname
      lastname
    }
  }
`;

const LoginFormCpnt = (): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [createSession] = useMutation(CREATE_SESSION);

  const onSubmit = handleSubmit(({ email, password }) => {
    createSession({ variables: { email, password } });
  });

  return (
    <form onSubmit={onSubmit} className="loginForm">
      <h1 className="l-title">WildHub</h1>
      <div className="l-userEmail l-wrapperInput ">
        <label htmlFor="email" className="lu-labelEmail">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="lu-emailInput lu-input"
          ref={register({ required: true })}
          id="userEmail"
          placeholder="exemple@gmail.com"
        />
        {errors.email && <span className="lu-error">Ce champ est requis</span>}
      </div>
      <div className="l-userPass l-wrapperInput ">
        <label htmlFor="password" className="lu-labelPassword">
          Mot de passe
        </label>
        <input
          type="password"
          name="password"
          className="lu-passwordInput lu-input"
          ref={register({ required: true })}
          id="userPassword"
        />
        {errors.password && (
          <span className="lu-error">Ce champ est requis</span>
        )}
      </div>

      <input type="submit" className="l-submit" value="Connexion" />
      <p className="l-sign-in-link">
        <Link to="/sign-in">Inscription</Link>
      </p>
    </form>
  );
};

export default LoginFormCpnt;
