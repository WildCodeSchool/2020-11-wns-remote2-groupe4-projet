import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  verifyPassword: string;
  address: string;
};

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $phone: String!
    $password: String!
    $address: String!
  ) {
    createUser(
      data: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        phone: $phone
        password: $password
        address: $address
      }
    ) {
      id
      firstname
      lastname
    }
  }
`;

const SignUpFormCpnt = (): JSX.Element => {
  const { register, handleSubmit, errors, watch } = useForm<FormData>({});
  const password = useRef({});
  password.current = watch('password', '');

  const [createUser] = useMutation(CREATE_USER);

  const history = useHistory();

  const submitSignIn = handleSubmit(
    async ({ firstname, lastname, email, password, phone, address }) => {
      try {
        await createUser({
          variables: { firstname, lastname, email, password, phone, address },
        });
        setTimeout(() => {
          history.push('/login');
        }, 2000);
        toast.success('Vous êtes maintenant inscrit', {});
      } catch (error) {
        console.log('error');
      }
    }
  );

  return (
    <form className="sign-in-form" onSubmit={submitSignIn}>
      <h1 className="sif-title">WildHub</h1>
      <fieldset className="sif-names-fieldset">
        <div className="sifnm-firstname sif-wrapper-input ">
          <label
            className="sifnmf-label-firstname sif-label"
            htmlFor="firstname"
          >
            Prénom
          </label>
          <input
            className="sifnmf-firstname-input sif-input"
            type="text"
            name="firstname"
            ref={register({ required: true })}
            id="firstname"
            aria-label="firstname"
          />
          {errors.firstname && (
            <span className="sifnmf-error form-error" role="alert">
              Ce champ est requis
            </span>
          )}
        </div>
        <div className="sifnm-lastname sif-wrapper-input ">
          <label className="sifnml-label-lastname sif-label" htmlFor="lastname">
            Nom
          </label>
          <input
            className="sifnml-lastname-input sif-input"
            type="text"
            name="lastname"
            ref={register({ required: true })}
            id="lastname"
            aria-label="lastname"
          />
          {errors.lastname && (
            <span className="sifnml-error form-error" role="alert">
              Ce champ est requis
            </span>
          )}
        </div>
      </fieldset>
      <fieldset className="sif-details-fieldset">
        <div className="sifdf-email sif-wrapper-input ">
          <label className="sifdf-label-email sif-label" htmlFor="email">
            email
          </label>
          <input
            className="sifdf-email-input sif-input"
            type="email"
            name="email"
            ref={register({ required: true })}
            id="email"
            placeholder="john.doe@gmail.com"
            aria-label="email"
          />
          {errors.email && (
            <span className="sifdf-error form-error" role="alert">
              Ce champ est requis
            </span>
          )}
        </div>
        <div className="sifdf-phone sif-wrapper-input ">
          <label className="sifdf-label-phone sif-label" htmlFor="phone">
            Téléphone
          </label>
          <input
            className="sifdf--input sif-input"
            type="text"
            name="phone"
            ref={register({ required: true })}
            id="phone"
            aria-label="phone"
          />
          {errors.phone && (
            <span className="sifdf-error form-error" role="alert">
              Ce champ est requis
            </span>
          )}
        </div>
        <div className="sifdf-address sif-wrapper-input ">
          <label className="sifdf-label-address sif-label" htmlFor="address">
            Adresse
          </label>
          <input
            className="sifdf-address-input sif-input"
            type="text"
            name="address"
            ref={register({ required: true })}
            id="address"
            aria-label="address"
          />
          {errors.address && (
            <span className="sifdf-error form-error" role="alert">
              Ce champ est requis
            </span>
          )}
        </div>
      </fieldset>
      <fieldset className="sif-passwords-fieldset">
        <div className="sifpf-password sif-wrapper-input ">
          <label className="sifpfp-label-password sif-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="sifpfp-password-input sif-input"
            type="password"
            name="password"
            ref={register({
              required: 'Vous devez spécifier un mot de passe',
              minLength: {
                value: 8,
                message: 'Le mot de passe doit avoir au moins 8 caractères',
              },
            })}
            id="password"
            aria-label="password"
          />
          {errors.password && (
            <span className="sifpfp-error form-error" role="alert">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="sifpf-verify-password sif-wrapper-input ">
          <label
            className="sifpfvp-label-password sif-label"
            htmlFor="verifyPassword"
          >
            Confirmez votre mot de passe
          </label>
          <input
            className="sifpfvp-verify-password-input sif-input"
            type="password"
            name="verifyPassword"
            ref={register({
              validate: (value) =>
                value === password.current ||
                'Le mot de passe ne correspond pas',
            })}
            id="verifyPassword"
            aria-label="verifyPassword"
          />
          {errors.verifyPassword && (
            <span className="sifpfvp-error form-error" role="alert">
              {errors.verifyPassword.message}
            </span>
          )}
        </div>
      </fieldset>
      <input type="submit" className="sif-submit" value="Inscription" />
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

export default SignUpFormCpnt;
