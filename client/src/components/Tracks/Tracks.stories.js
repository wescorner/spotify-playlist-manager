import Tracks from "./Tracks";

export default {
  argTypes:{
  },
  title: "component/Tracks",
  component: Tracks,
  parameters: {
    layout: 'fullscreen',
  },
}

const Template = (args)  => <Tracks {...args} />

export const TrackDefault = Template.bind({});

export const TracksWithValue = Template.bind({});

TracksWithValue.args = {
  name: "Where Are You Now",
  album: "Where Are You Now",
  dateAdded: "07 Sep 2022",
  duration: "2 min 28 sec",
  image:"https://openai.com/content/images/2020/04/2x-no-mark-1.jpg"
}