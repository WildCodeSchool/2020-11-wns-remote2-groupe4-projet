import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import LeftAsideCtnr from './LeftAsideCtnr';

describe('LeftAsideCntr by default', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <LeftAsideCtnr />
      </MockedProvider>
    );
  });

  it('Display the avatar', () => {
    const avatar = document.querySelector('.avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('Display the menu', () => {
    const menu = document.querySelector('.menu');
    expect(menu).toBeInTheDocument();
  });

  it('Display the menu buttons', () => {
    const buttonsMenu = document.querySelector('.btn-wrapper');
    expect(buttonsMenu).toBeInTheDocument();
  });
});

describe('when button clicked', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <LeftAsideCtnr />
      </MockedProvider>
    );
  });

  it('Hides the avatar name', () => {
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(screen.getByTestId('avatar-name').classList).toContain('hide-name');
  });

  it('Makes image smaller', () => {
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(screen.getByRole('img').classList).toContain('a-image-small');
  });

  it('Rotates LeftAsideCtnr icon', () => {
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(buttonCpnt.classList).toContain('rotate-left');
  });
});
