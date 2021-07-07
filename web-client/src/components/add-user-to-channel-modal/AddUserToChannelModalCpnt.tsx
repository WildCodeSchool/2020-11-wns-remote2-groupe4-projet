import { useMutation } from '@apollo/client';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Controller, NestedValue, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { Channel } from '../../interfaces/channelInterface';
import { ADD_USERS_TO_CHANNEL } from '../../mutations/channelMutation';

type User = {
  id: string;
  firstname: string;
  lastname: string;
};

type AddUsersToChannelFormData = {
  usersIds: NestedValue<string[]>;
};

export type AddUserToChannelModalCpntProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  users: User[];
  channel: Channel;
};

const AddUserToChannelModalCpnt = ({
  isOpen,
  title,
  onClose,
  users,
  channel,
}: AddUserToChannelModalCpntProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, setValue, errors, control, getValues } = useForm<
    AddUsersToChannelFormData
  >({});
  const [addUsersToChannel] = useMutation(ADD_USERS_TO_CHANNEL);

  const submitAddNewChannel = handleSubmit(async ({ usersIds }) => {
    try {
      setIsLoading(true);

      const formattedUsers = usersIds.map((id) => {
        return { id };
      });

      await addUsersToChannel({
        variables: { channelId: channel.id, usersToAdd: formattedUsers },
      });

      toast.success("L'ajout a été effectué avec succés.", {});

      onClose();
    } catch (err) {
      console.log('error : ', err.message);
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
          <form
            className="add-user-to-channel-form"
            onSubmit={submitAddNewChannel}
          >
            <fieldset className="aucf-fieldset">
              <div className="aucf-wrapper-input select-input">
                <label className="aucf-label" htmlFor="usersIds">
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
                      {users &&
                        users
                        .filter(
                            (user: User) => !channel.users.some((channelUser: User) => user.id === channelUser.id)
                          ).map((user: User) => (
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
                <span className="aucf-error" role="alert">
                  Vous devez ajouter au moins un utilisateur
                </span>
              )}
            </fieldset>
          </form>
        </DialogContent>
        <DialogActions>
          <button className="aucf-button" onClick={onClose}>
            Fermer
          </button>
          <button
            className="aucf-button"
            disabled={isLoading}
            onClick={submitAddNewChannel}
          >
            Ajouter
          </button>
        </DialogActions>
      </Dialog>
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
    </div>
  );
};

export default AddUserToChannelModalCpnt;
