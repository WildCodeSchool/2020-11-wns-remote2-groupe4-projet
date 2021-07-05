import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import SignUpFormCpnt, { CREATE_USER } from './SignUpFormCpnt';

const CREATE_USER_MOCK = {
  request: {
    query: CREATE_USER,
  },
  result: {},
};

const mockSignUp = jest.fn(
  (firstname, lastname, email, phone, password, verifyPassword, address) => {
    return Promise.resolve({
      firstname,
      lastname,
      email,
      phone,
      password,
      verifyPassword,
      address,
    });
  }
);

describe('SignUpFormCpnt', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={[CREATE_USER_MOCK]}>
        <SignUpFormCpnt />
      </MockedProvider>
    );
  });

  it('should render firstname input', () => {
    expect(
      screen.getByRole('textbox', { name: /firstname/i })
    ).toBeInTheDocument();
  });

  it('should render lastname input', () => {
    expect(
      screen.getByRole('textbox', { name: /lastname/i })
    ).toBeInTheDocument();
  });

  it('should render email input', () => {
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  });

  it('should render phone input', () => {
    expect(screen.getByRole('textbox', { name: /phone/i })).toBeInTheDocument();
  });

  it('should render address input', () => {
    expect(
      screen.getByRole('textbox', { name: /address/i })
    ).toBeInTheDocument();
  });

  it('should render password input', () => {
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
  });

  it('should render verifyPassword input', () => {
    expect(
      screen.getByLabelText('Confirmez votre mot de passe')
    ).toBeInTheDocument();
  });

  describe('When form is submitted', () => {
    beforeEach(() => {
      fireEvent.submit(screen.getByRole('button'));
    });

    it('should display required error when value is invalid', async () => {
      expect(await screen.findAllByRole('alert')).toHaveLength(6);
    });

    it('should display matching error when firstname is invalid', async () => {
      fireEvent.input(screen.getByRole('textbox', { name: /firstname/i }), {
        target: {
          value: '',
        },
      });

      fireEvent.submit(screen.getByRole('button'));
      expect(screen.getByRole('textbox', { name: /firstname/i }).value).toBe(
        ''
      );
    });
  });
});
