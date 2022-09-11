import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export const NavbarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    title: "Playlists",
    icon: <LibraryMusicIcon />,
    link: "/playlists",
  },
  {
    title: "Create Category",
    icon: <AddCircleIcon />,
    link: "/createcategory",
  },
  {
    title: "Create Playlist",
    icon: <AddCircleIcon />,
    link: "/createplaylist",
  },
];
