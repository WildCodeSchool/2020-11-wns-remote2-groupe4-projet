import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LeftAsideCtnr from './LeftAsideCtnr';

describe('when button clicked', () => {
  it('hide the avatar name', () => {
    render(<LeftAsideCtnr />);
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(
      screen.getByTestId('avatar-name').classList.contains('hide-name')
    ).toBe(true);
  });

  it('make image smaller', () => {
    render(<LeftAsideCtnr />);
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(screen.getByRole('img').classList.contains('a-image-small')).toBe(
      true
    );
  });

  it('rotate LeftAsideCtnr icon', () => {
    render(<LeftAsideCtnr />);
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(buttonCpnt.classList.contains('rotate-left')).toBe(true);
  });
});
