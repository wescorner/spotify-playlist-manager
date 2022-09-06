import CategoryCard from "./CategoryCard";

export default {
  argTypes:{
    onClick: {
      type: "action"
    }
  },
  title: "component/CategoryCard",
  component: CategoryCard,
  parameters: {
    layout: 'fullscreen',
  },
}

const Template = (args)  => <CategoryCard {...args} />

export const CategoryNoDefault = Template.bind({});

CategoryNoDefault.args = {
  title: "Long drive",
  description: "A fun collection of playlists for a nice ride",
  totalPlaylists: 8,
  image: "https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg"
}