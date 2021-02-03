import React from 'react';
import { useForm } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

type FormData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  verifyPassword: string;
  address: string;
};

const CREATE_USER = gql`
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

const SignInFormCpnt = (): JSX.Element => {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const [createUser] = useMutation(CREATE_USER);

  const history = useHistory();

  const submitSignIn = handleSubmit(
    ({ firstname, lastname, email, password, phone, address }) => {
      try {
        createUser({
          variables: { firstname, lastname, email, password, phone, address },
        });
      } catch (error) {
        console.log('error');
      } finally {
        history.push('/login');
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
          />
          {errors.firstname && (
            <span className="sifnmf-error form-error">Ce champ est requis</span>
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
          />
          {errors.lastname && (
            <span className="sifnml-error form-error">Ce champ est requis</span>
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
          />
          {errors.email && (
            <span className="sifdf-error form-error">Ce champ est requis</span>
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
          />
          {errors.phone && (
            <span className="sifdf-error form-error">Ce champ est requis</span>
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
          />
          {errors.address && (
            <span className="sifdf-error form-error">Ce champ est requis</span>
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
            ref={register({ required: true })}
            id="password"
          />
          {errors.password && (
            <span className="sifpfp-error form-error">Ce champ est requis</span>
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
            ref={register({ required: true })}
            id="verifyPassword"
          />
          {errors.verifyPassword && (
            <span className="sifpfvp-error form-error">
              Ce champ est requis
            </span>
          )}
        </div>
      </fieldset>
      <input type="submit" className="sif-submit" value="Inscription" />
    </form>
  );
};

export default SignInFormCpnt;
