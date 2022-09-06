import PlaylistCard from "./PlaylistCard";

export default {
  argTypes:{
    onClick: {
      type: "action"
    }
  },
  title: "component/PlaylistCard",
  component: PlaylistCard,
  parameters: {
    layout: 'fullscreen',
  }
}

const Template = (args)  => <PlaylistCard {...args} />

export const PlaylistNoDefault = Template.bind({});

PlaylistNoDefault.args = {
  title: "Top hits",
  description: "all my favourite party songs here!!",
  totalTracks: 253,
  image: "https://scontent.fyyz1-1.fna.fbcdn.net/v/t1.6435-9/184205866_309950770525058_7072329262818108856_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=e3f864&_nc_ohc=Ofn6nZ-hGdMAX_c1N9E&_nc_ht=scontent.fyyz1-1.fna&oh=00_AT-DDR0JJf3A6Q7oxL4MxNqWvuAexTgaKRtJlawMQGHF6Q&oe=633D1FC7"
}