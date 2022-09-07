import TrackHeading from "./TrackHeading";

export default {
  argTypes:{
  },
  title: "component/TrackHeading",
  component: TrackHeading,
  parameters: {
    layout: 'fullscreen',
  },
}

const Template = (args)  => <TrackHeading {...args} />

export const TrackHeadingDefault = Template.bind({});
