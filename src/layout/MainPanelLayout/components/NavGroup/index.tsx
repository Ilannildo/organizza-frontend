// material-ui
import { List, Typography } from "@mui/material";

// project imports
import NavCollapse from "../NavCollapse";
import NavItem from "../NavItem/index";

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item, event }: any) => {
  // menu list collapse & items
  const items = item.children?.map((menu: any) => {
    switch (menu.type) {
      case "collapse":
        return <NavCollapse key={menu.id} menu={menu} level={1} event={event} />;
      case "item":
        return <NavItem key={menu.id} item={menu} level={1} event={event} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#212121",
                padding: "6px",
                textTransform: "capitalize",
                marginTop: "10px",
              }}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                  display="block"
                  sx={{
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    color: '#9e9e9e',
                    textTransform: "capitalize",
                  }}
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>
    </>
  );
};

export default NavGroup;
