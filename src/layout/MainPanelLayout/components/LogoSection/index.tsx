import { Link } from "react-router-dom";

// material-ui
import { ButtonBase } from "@mui/material";
import LogoTextWhite from "../../../../assets/images/logo-text-white.svg";
import LogoTextDark from "../../../../assets/images/logo-text.svg";
import LogoWhite from "../../../../assets/images/logo-white.svg";
import LogoDark from "../../../../assets/images/logo.svg";
import config from "../../../../config";
// ==============================|| MAIN LOGO ||============================== //

interface ILogoSection {
  dark?: boolean;
  mini?: boolean;
}

const LogoSection = ({ dark = false, mini = false }: ILogoSection) => (
  <ButtonBase disableRipple component={Link} to={config.defaultPath}>
    {mini ? (
      <img
        src={dark === true ? LogoDark : LogoWhite}
        width="100%"
        alt="Logo Organizza"
        draggable="false"
      />
    ) : (
      <img
        src={dark === true ? LogoTextDark : LogoTextWhite}
        width="200"
        alt="Logo Organizza"
        draggable="false"
      />
    )}
  </ButtonBase>
);

export default LogoSection;
