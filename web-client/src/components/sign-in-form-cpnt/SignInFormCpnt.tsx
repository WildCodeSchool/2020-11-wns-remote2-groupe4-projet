import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { CREATE_SESSION } from '../../queries/sessionQueries';

type SignInFormProps = {
  handleIsAuthenticated: () => void;
};

type FormData = {
  email: string;
  password: string;
};

const SignInFormCpnt = ({
  handleIsAuthenticated,
}: SignInFormProps): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [createSession] = useMutation(CREATE_SESSION);

  const history = useHistory();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await createSession({ variables: { email, password } });
      handleIsAuthenticated();
      setTimeout(() => {
        history.push('/dashboard');
      }, 2000);
      toast.success(`Vous êtes connecté`, {});
    } catch (error) {
      toast.error(`${error}`, {});
    }
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
        <Link to="/sign-up">Inscription</Link>
      </p>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
};

export default SignInFormCpnt;
