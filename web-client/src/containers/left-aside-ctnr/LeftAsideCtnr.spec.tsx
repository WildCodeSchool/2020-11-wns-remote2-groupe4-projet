import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LeftAsideCtnr from './LeftAsideCtnr';

describe('LeftAsideCntr by default', () => {
  it('Display the avatar', () => {
    render(<LeftAsideCtnr />);
    const avatar = document.querySelector('.avatar');
    expect(avatar).toBeInTheDocument();
  });

  it('Display the menu', () => {
    render(<LeftAsideCtnr />);
    const menu = document.querySelector('.menu');
    expect(menu).toBeInTheDocument();
  });

  it('Display the menu buttons', () => {
    render(<LeftAsideCtnr />);
    const buttonsMenu = document.querySelector('.btn-wrapper');
    expect(buttonsMenu).toBeInTheDocument();
  });
});

describe('when button clicked', () => {
  it('Hides the avatar name', () => {
    render(<LeftAsideCtnr />);
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(screen.getByTestId('avatar-name').classList).toContain('hide-name');
  });

  it('Makes image smaller', () => {
    render(<LeftAsideCtnr />);
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(screen.getByRole('img').classList).toContain('a-image-small');
  });

  it('Rotates LeftAsideCtnr icon', () => {
    render(<LeftAsideCtnr />);
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(buttonCpnt.classList).toContain('rotate-left');
  });
});
