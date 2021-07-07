import { useMutation, useQuery } from '@apollo/client';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Controller, NestedValue, useForm } from 'react-hook-form';
import { GET_ALL_USERS } from '../../queries/userQueries';
import { ADD_CHANNEL } from '../../mutations/channelMutation';
import UserContext from '../../contexts/UserContext';

type User = {
  id: string;
  firstname: string;
  lastname: string;
};

type AddChannelFormData = {
  title: string;
  usersIds: NestedValue<string[]>;
};

export type AddChannelModalCpntProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

const AddChannelModalCpnt = ({
  isOpen,
  title,
  onClose,
}: AddChannelModalCpntProps): JSX.Element => {
  const userLoggedIn = useContext(UserContext);
  const { data: usersData } = useQuery(GET_ALL_USERS, {
    fetchPolicy: 'no-cache',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, errors, control, getValues } = useForm<
    AddChannelFormData
  >({});
  const [createChannelWithFilteredSub] = useMutation(ADD_CHANNEL);

  const submitAddNewChannel = handleSubmit(async ({ title, usersIds }) => {
    try {
      setIsLoading(true);

      const formattedUsers = usersIds.map((id) => {
        return { id };
      });

      await createChannelWithFilteredSub({
        variables: { title, users: formattedUsers },
      });

      onClose();
    } catch (error) {
      console.log('error :', error);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <form className="add-channel-form" onSubmit={submitAddNewChannel}>
            <fieldset className="acf-fieldset">
              <div className="acf-wrapper-input">
                <label className="acf-label" htmlFor="title">
                  Titre
                </label>
                <TextField
                  id="title"
                  name="title"
                  placeholder="Le titre du channel"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setValue('title', e.target.value)}
                  inputRef={register({ required: true })}
                />
              </div>
              {!!errors.title && (
                <span className="acf-error" role="alert">
                  Ce champ est requis
                </span>
              )}
            </fieldset>

            <fieldset className="acf-fieldset">
              <div className="acf-wrapper-input select-input">
                <label className="acf-label" htmlFor="usersIds">
                  Utilisateurs
                </label>
                <Controller
                  id="usersIds"
                  name="usersIds"
                  control={control}
                  defaultValue={[]}
                  as={
                    <Select
                      labelId="users-select-label"
                      name="usersIds"
                      multiple
                      value={getValues('usersIds')}
                      onChange={(e) => setValue('usersIds', e.target.value)}
                      input={<Input id="select-usersIds" />}
                    >
                      <MenuItem value={[]} disabled>
                        <em>Choisissez le(s) utilisateur(s) à ajouter</em>
                      </MenuItem>
                      {usersData &&
                        usersData.users
                          .filter(
                            (user: User) =>
                              user.id !==
                              (!!userLoggedIn.state.userLoggedInDetails &&
                                userLoggedIn.state.userLoggedInDetails.id)
                          )
                          .map((user: User) => (
                            <MenuItem key={user.id} value={user.id}>
                              {`${user.lastname} ${user.firstname}`}
                            </MenuItem>
                          ))}
                    </Select>
                  }
                  rules={{
                    required: true,
                    validate: () => !!getValues('usersIds').length
                  }}
                />
              </div>
              {!!errors.usersIds && (
                <span className="acf-error" role="alert">
                  Vous devez ajouter au moins un utilisateur
                </span>
              )}
            </fieldset>
          </form>
        </DialogContent>
        <DialogActions>
          <button className="acf-button" onClick={onClose}>
            Fermer
          </button>
          <button
            className="acf-button"
            disabled={isLoading}
            onClick={submitAddNewChannel}
          >
            Ajouter
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddChannelModalCpnt;
