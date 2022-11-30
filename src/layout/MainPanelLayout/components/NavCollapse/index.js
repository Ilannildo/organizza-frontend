import React, { useEffect, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// project imports
import NavItem from "../NavItem";

import { CaretDown, CaretUp } from "phosphor-react";

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case "item":
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon && (
    <Icon
      strokeWidth={1.5}
      size="1.3rem"
      style={{ marginTop: "auto", marginBottom: "auto" }}
    />
  );

    // active menu item on page load
    useEffect(() => {
      const currentIndex = document.location.pathname
        .toString()
        .split("/")
        .findIndex((id) => id === menu.id);
      if (currentIndex > -1) {
        handleClick();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
      <ListItemButton
        sx={{
          mb: 0.5,
          alignItems: "flex-start",
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          pl: `${level * 24}px`,
          opacity: selected === menu.id ? 1 : 0.8,
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            my: "auto",
            minWidth: !menu.icon ? 18 : 36,
            color: theme.palette.primaryContainer.main,
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              color={theme.palette.primaryContainer.main}
              sx={{ my: "auto" }}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography
                variant="caption"
                sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
              >
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <CaretUp
            stroke={1.5}
            size="1rem"
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              color: theme.palette.onPrimary.main,
            }}
          />
        ) : (
          <CaretDown
            stroke={1.5}
            size="1rem"
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              color: theme.palette.onPrimary.main,
            }}
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: "relative",
            "&:after": {
              content: "''",
              position: "absolute",
              left: "32px",
              top: 0,
              height: "100%",
              width: "1px",
              opacity: 0.2,
              background: '#F5F7FC',
            },
          }}
        >
          {menus}
        </List>
      </Collapse>
    </>
  );
};

export default NavCollapse;
