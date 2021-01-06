import React from 'react';
import { render, screen } from '@testing-library/react';
import RightAsideCtnr from './RightAsideCtnr';

describe('RightAsideCtnr by default', () => {
  beforeEach(() => {
    render(<RightAsideCtnr />);
  });

  it('should be open', () => {
    const rightAside = screen.getByRole('complementary');
    expect(rightAside).toHaveClass('ra-visible');
  });

  it('should have default title', () => {
    const titleRightAsideCtnr = screen.getByRole('heading', { level: 3 });
    expect(titleRightAsideCtnr).not.toHaveClass('ra-title-mini');
  });

  it('should display the search bar', () => {
    const searchBar = document.querySelector('.chat-searchbar-wrapper');
    expect(searchBar).toBeInTheDocument();
  });

  it("should display ChannelsCtnr with icons and titles as channels's category name", () => {
    const channelsCtnr = document.querySelector('.channels-ctnr');
    expect(channelsCtnr).toBeInTheDocument();
  });

  it('should not have the class rotate-right in the arrow icon', () => {
    const arrowIcon = screen.getByTestId('ArrowIconRightAsideCtnr');
    expect(arrowIcon).not.toHaveClass('rotate-right');
  });
});
