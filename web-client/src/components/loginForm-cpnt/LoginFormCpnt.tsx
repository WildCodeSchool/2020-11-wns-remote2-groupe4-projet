import React from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';

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
        {errors.email && <span>Ce champ est requis</span>}
      </div>
      <div className="l-userPass l-wrapperInput ">
        <label htmlFor="password" className="lu-labelPassword">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="lu-passwordInput lu-input"
          ref={register({ required: true })}
          id="userPassword"
        />
        {errors.password && <span>Ce champ est requis</span>}
      </div>

      <input type="submit" className="l-submit" />
    </form>
  );
};

export default LoginFormCpnt;
