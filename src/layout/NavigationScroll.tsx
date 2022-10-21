import React, { useEffect } from "react";
// import { useLocation } from "react-router-dom";

type NavigationScrollProps = {
  children: any;
};

export const NavigationScroll: React.FC<NavigationScrollProps> = ({
  children,
}) => {
  // const location = useLocation();
  // const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // }, [pathname]);

  return children;
};
