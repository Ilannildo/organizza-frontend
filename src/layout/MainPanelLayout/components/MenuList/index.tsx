import { Typography } from "@mui/material";
import React from "react";
import NavGroup from "../NavGroup";
import SidebarItems from "../SidebarItems";

const MenuList: React.FC = () => {
  const navItems = SidebarItems.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
