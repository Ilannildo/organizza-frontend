import { Typography } from "@mui/material";
import React from "react";
import { IEvent } from "../../../../models/event";
import NavGroup from "../NavGroup";

const MenuList = ({ event, items }: { event?: IEvent; items: any[] }) => {
  const navItems = items.map((item: any) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} event={event} />;
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
