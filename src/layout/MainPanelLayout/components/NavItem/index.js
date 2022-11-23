import React, { forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useCustomization } from "../../../../hooks/useCustomization";

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const { isOpen, menuOpen, setMenu } = useCustomization();

  const Icon = item.icon;
  const itemIcon = item?.icon && <Icon stroke={1.5} size="1.3rem" />;

  let itemTarget = "_self";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={`/${item.url}`} target={itemTarget} />
    )),
  };
  if (item?.external) {
    listItemProps = { component: "a", href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    menuOpen(id);

    if (matchesSM) setMenu(false);
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      menuOpen(item.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        mb: 0.5,
        position: "relative",
        alignItems: "flex-start",
        backgroundColor:
          isOpen.findIndex((id) => id === item.id) > -1
            ? `rgba(233,240,247,0.1) !important`
            : "transparent",
        pl: `${level * 24}px`,
        opacity: isOpen.findIndex((id) => id === item.id) > -1 ? 1 : 0.8,
      }}
      selected={isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      {isOpen.findIndex((id) => id === item.id) > -1 && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            height: "100%",
            width: 3,
            top: 0,
            background: theme.palette.secondary.main,
          }}
        />
      )}
      <ListItemIcon
        sx={{
          my: "auto",
          minWidth: !item?.icon ? 18 : 36,
          color:
            isOpen.findIndex((id) => id === item.id) > -1
              ? theme.palette.onPrimary.main
              : theme.palette.primaryContainer.main,
        }}
      >
        {itemIcon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            fontWeight={
              isOpen.findIndex((id) => id === item.id) > -1 ? "500" : "normal"
            }
            color={
              isOpen.findIndex((id) => id === item.id) > -1
                ? theme.palette.onPrimary.main
                : theme.palette.primaryContainer.main
            }
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "#9e9e9e",
                textTransform: "capitalize",
              }}
              display="block"
              gutterBottom
            >
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
