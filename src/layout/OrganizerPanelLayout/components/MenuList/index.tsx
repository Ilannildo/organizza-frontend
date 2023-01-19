import { Typography } from "@mui/material";
import NavGroup from "../NavGroup";

const MenuList = ({ items }: { items: any[] }) => {
  const navItems = items.map((item: any) => {
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
