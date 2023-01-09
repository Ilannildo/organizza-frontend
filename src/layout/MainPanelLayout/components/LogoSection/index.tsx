import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";
import LogoWhite from "../../../../assets/images/logo-text-white.svg";
import LogoDark from "../../../../assets/images/logo-text.svg";
import config from "../../../../config";
// ==============================|| MAIN LOGO ||============================== //

interface ILogoSection {
  dark?: boolean;
}

const LogoSection = ({ dark = false }: ILogoSection) => (
  <ButtonBase disableRipple component={Link} to={config.defaultPath}>
    <img
      src={dark === true ? LogoDark : LogoWhite}
      width="200"
      // height="32"
      alt="Logo Organizza"
      draggable="false"
    />
  </ButtonBase>
);

export default LogoSection;
