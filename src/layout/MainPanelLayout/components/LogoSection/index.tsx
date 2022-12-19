import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";
import LogoWhite from "../../../../assets/images/logo-white.svg";
import LogoDark from "../../../../assets/images/logo-color.svg";
import config from "../../../../config";
// ==============================|| MAIN LOGO ||============================== //

interface ILogoSection {
  dark?: boolean;
}

const LogoSection = ({ dark = false }: ILogoSection) => (
  <ButtonBase disableRipple component={Link} to={config.defaultPath}>
    <img
      src={dark === true ? LogoDark : LogoWhite}
      width="150"
      // height="32"
      alt="Logo Organizza"
      draggable="false"
    />
  </ButtonBase>
);

export default LogoSection;
