import React from 'react';

import Search from './Search';

export default {
  argTypes:{
    onSearch: "action"
  },
  title: 'Components/Search',
  component: Search,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

function Template(args) {
  return <div style={{padding:"40px"}}>
    <Search {...args} />
  </div>;
}

export const SearchNoDefault = Template.bind({});

