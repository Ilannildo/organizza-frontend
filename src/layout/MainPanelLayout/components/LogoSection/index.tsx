import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";
import Logo from "../../../../assets/images/logo-white.svg";
import config from "../../../../config";
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
  <ButtonBase disableRipple component={Link} to={config.defaultPath}>
    <img
      src={Logo}
      width="150"
      // height="32"
      alt="Logo Organizza"
      draggable="false"
    />
  </ButtonBase>
);

export default LogoSection;
