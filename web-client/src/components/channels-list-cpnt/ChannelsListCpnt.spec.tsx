import React from 'react';
import { render } from '@testing-library/react';
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
