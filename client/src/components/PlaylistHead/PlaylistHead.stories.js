import PlaylistHead from "./PlaylistHead";

export default {
  argTypes:{
    onPlay: {
      type: "action"
    },
    onDashboard: {
      type: "action"
    },
    onDelete: {
      type: "action"
    }
  },
  title: "component/PlaylistHead",
  component: PlaylistHead,
  parameters: {
    layout: 'fullscreen',
  },
}

const Template = (args)  => <PlaylistHead {...args} />

export const PlaylistHeadNoDefault = Template.bind({});

export const PlaylistHeadFakeData = Template.bind({});

PlaylistHeadFakeData.args = {
  playlistName: "Chill Vibes Playlist",
  description: "This is the description of the chill playlist This is the description of the chill playlist",
  owner: "owner",
  totalSongs: 56,
  image:"https://i.scdn.co/image/ab67706f00000003ccd0d6170bb5d56a78ff8d3e"
}
