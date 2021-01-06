import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ChannelsListCpnt from './ChannelsListCpnt';

describe('When RightAsideCtnr is open', () => {
  beforeEach(() => {
    render(
      <ChannelsListCpnt
        title="Général"
        channels={[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ]}
        isRightAsideOpen={true}
      />
    );
  });

  it('should have the icon and the title as category name', () => {
    const channelCategoryTitle = document.querySelector('.cl-title');
    const channelCategoryIcon = document.querySelector('.cl-title-icon');

    expect(channelCategoryTitle).toBeInTheDocument();
    expect(channelCategoryIcon).toBeInTheDocument();
  });
});

describe('When RightAsideCtnr is closed', () => {
  beforeEach(() => {
    render(
      <ChannelsListCpnt
        title="Général"
        channels={[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ]}
        isRightAsideOpen={false}
      />
    );
  });

  it('should have only the icon as category name', () => {
    const channelCategoryTitle = document.querySelector('.cl-title');
    const channelCategoryIcon = document.querySelector('.cl-title-icon');

    expect(channelCategoryTitle).not.toBeInTheDocument();
    expect(channelCategoryIcon).toBeInTheDocument();
  });
});

describe('When caret icon is clicked for the first time', () => {
  beforeEach(() => {
    render(
      <ChannelsListCpnt
        title="Général"
        channels={[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        ]}
        isRightAsideOpen={true}
      />
    );
    const caretButton = screen.getByRole('wrapper-title-channels-list');
    fireEvent.click(caretButton);
  });

  it('should display the list of all channels', () => {
    const channelsList = screen.getByRole('list');
    expect(channelsList).not.toHaveClass('cl-ul-hidden');
  });

  it('should rotate the caret icon', () => {
    const caretIcon = screen.getByRole('caret-icon-wrapper-channels-list');
    expect(caretIcon).toHaveClass('cl-caret-icon-open');
  });

  describe('When caret icon is clicked for the second time', () => {
    beforeEach(() => {
      const caretButton = screen.getByRole('wrapper-title-channels-list');
      fireEvent.click(caretButton);
    });

    it('should not display the list of all channels', () => {
      const channelsList = screen.getByRole('list');
      expect(channelsList).toHaveClass('cl-ul-hidden');
    });

    it('should rotate the caret icon back to default', () => {
      const caretIcon = screen.getByRole('caret-icon-wrapper-channels-list');
      expect(caretIcon).not.toHaveClass('cl-caret-icon-open');
    });
  });
});
