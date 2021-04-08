import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import RightAsideCtnr from './RightAsideCtnr';

describe('RightAsideCtnr by default', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <RightAsideCtnr />
      </MockedProvider>
    );
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

describe('When arrow button on RightAsideCtnr is clicked for the first time', () => {
  beforeEach(() => {
    render(
      <MockedProvider>
        <RightAsideCtnr />
      </MockedProvider>
    );
    const arrowButton = screen.getByTestId('ArrowIconRightAsideCtnr');
    fireEvent.click(arrowButton);
  });

  it('should be closed', () => {
    const rightAside = screen.getByRole('complementary');
    expect(rightAside).not.toHaveClass('ra-visible');
  });

  it('should have smaller title', () => {
    const titleRightAsideCtnr = screen.getByRole('heading', { level: 3 });
    expect(titleRightAsideCtnr).toHaveClass('ra-title-mini');
  });

  it('should hide the search bar', () => {
    const searchBar = document.querySelector('.chat-searchbar-wrapper');
    expect(searchBar).not.toBeInTheDocument();
  });

  it('should display ChannelsCtnr', () => {
    const channelsCtnr = document.querySelector('.channels-ctnr');
    expect(channelsCtnr).toBeInTheDocument();
  });

  it('should rotate the arrow icon of RightAsideCtnr', () => {
    const arrowIcon = screen.getByTestId('ArrowIconRightAsideCtnr');
    expect(arrowIcon).toHaveClass('rotate-right');
  });

  describe('When arrow button on RightAsideCtnr is clicked for the second time', () => {
    beforeEach(() => {
      const arrowButton = screen.getByTestId('ArrowIconRightAsideCtnr');
      fireEvent.click(arrowButton);
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

    it('should rotate the arrow icon of RightAsideCtnr', () => {
      const arrowIcon = screen.getByTestId('ArrowIconRightAsideCtnr');
      expect(arrowIcon).not.toHaveClass('rotate-right');
    });
  });
});
