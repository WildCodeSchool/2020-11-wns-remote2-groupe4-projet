import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LeftAsideCtnr from './LeftAsideCtnr';

describe('when button clicked', () => {
  it('make left aside smaller and hide the name', () => {
    render(<LeftAsideCtnr />);
    const buttonCpnt = screen.getByTestId('buttonCpntTested');
    fireEvent.click(buttonCpnt);
    expect(
      screen.getByTestId('avatar-name').classList.contains('hide-name')
    ).toBe(true);
  });
});
