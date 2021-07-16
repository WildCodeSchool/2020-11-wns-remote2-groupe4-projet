import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

import { UPDATE_USER } from '../../mutations/userMutation';
import { AM_I_AUTHENTICATED } from '../../queries/userQueries';
type FormData = {
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
};

const UpdateUserFormCpnt = (): JSX.Element => {
  const { register, handleSubmit, errors, setValue } = useForm<FormData>({});

  const [updateUser] = useMutation(UPDATE_USER);
  const { loading, error, data } = useQuery(AM_I_AUTHENTICATED, {
    fetchPolicy: 'no-cache',
  });

  const submitSignIn = handleSubmit(
    async ({ firstname, lastname, phone, address }) => {
      try {
        await updateUser({
          variables: { firstname, lastname, phone, address },
        });

        toast.success('Vos information ont été enregistrées', {});
      } catch (error) {
        console.log('error');
      }
    }
  );

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <form className="update-user-form" onSubmit={submitSignIn}>
          <h2 className="uuf-title">Modifiez vos informations</h2>
          <fieldset className="uuf-fieldset uuf-names-fieldset">
            <div className="uufnm-lastname uuf-wrapper-input ">
              <label
                className="uufnml-label-lastname uuf-label"
                htmlFor="lastname"
              >
                Nom
              </label>
              <input
                className="uufnml-lastname-input uuf-input"
                type="text"
                name="lastname"
                ref={register({ required: true })}
                id="lastname"
                aria-label="lastname"
                defaultValue={data && data.amIAuthenticated.lastname}
                onChange={(e) => setValue('lastname', e.target.value)}
              />
              {errors.lastname && (
                <span className="uufnml-error form-error" role="alert">
                  Ce champ est requis
                </span>
              )}
            </div>
            <div className="uufnm-firstname uuf-wrapper-input ">
              <label
                className="uufnmf-label-firstname uuf-label"
                htmlFor="firstname"
              >
                Prénom
              </label>
              <input
                className="uufnmf-firstname-input uuf-input"
                type="text"
                name="firstname"
                ref={register({ required: true })}
                id="firstname"
                aria-label="firstname"
                defaultValue={data && data.amIAuthenticated.firstname}
                onChange={(e) => setValue('firstname', e.target.value)}
              />
              {errors.firstname && (
                <span className="uufnmf-error form-error" role="alert">
                  Ce champ est requis
                </span>
              )}
            </div>
          </fieldset>
          <fieldset className="uuf-fieldset uuf-details-fieldset">
            <div className="uufdf-phone uuf-wrapper-input ">
              <label className="uufdf-label-phone uuf-label" htmlFor="phone">
                Téléphone
              </label>
              <input
                className="uufdf--input uuf-input"
                type="text"
                name="phone"
                ref={register({ required: true })}
                id="phone"
                aria-label="phone"
                defaultValue={data && data.amIAuthenticated.phone}
                onChange={(e) => setValue('phone', e.target.value)}
              />
              {errors.phone && (
                <span className="uufdf-error form-error" role="alert">
                  Ce champ est requis
                </span>
              )}
            </div>
            <div className="uufdf-address uuf-wrapper-input ">
              <label
                className="uufdf-label-address uuf-label"
                htmlFor="address"
              >
                Adresse
              </label>
              <input
                className="uufdf-address-input uuf-input"
                type="text"
                name="address"
                ref={register({ required: true })}
                id="address"
                aria-label="address"
                defaultValue={data && data.amIAuthenticated.address}
                onChange={(e) => setValue('address', e.target.value)}
              />
              {errors.address && (
                <span className="uufdf-error form-error" role="alert">
                  Ce champ est requis
                </span>
              )}
            </div>
          </fieldset>
          <input type="submit" className="uuf-submit" value="Modifier" />
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
      )}
    </>
  );
};

export default UpdateUserFormCpnt;
