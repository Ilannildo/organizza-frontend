// material-ui
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import useMountTransition from "./useFade";

const Bubble = styled("div")({
  position: "absolute",
  width: "150px",
  height: "150px",
  borderRadius: "100%",
  top: 0,
  background:
    "radial-gradient(76.75% 76.75% at 70% 23.25%, #E7CE4A 0%, #E64467 100%)",
  animation: "bounce 5s ease-in-out infinite",
  "@keyframes bounce": {
    "0%, 100%": {
      transform: "scale( 0.0 )",
    },
    "50%": {
      transform: "scale( 1.0 )",
    },
  },
});
const Bubble1 = styled("div")({
  position: "absolute",
  width: "150px",
  height: "150px",
  borderRadius: "100%",
  top: "auto",
  bottom: 0,
  background:
    "radial-gradient(76.75% 76.75% at 70% 23.25%, #7717B3 0%, #DF09CA 100%)",
  animation: "bounce 5s ease-in-out infinite",
  animationDelay: "-1.5s",
  "@keyframes bounce": {
    "0%, 100%": {
      transform: "scale( 0.0 )",
    },
    "50%": {
      transform: "scale( 1.0 )",
    },
  },
});
const Bubble2 = styled("div")({
  position: "absolute",
  width: "125px",
  height: "125px",
  borderRadius: "100%",
  top: "auto",
  bottom: 0,
  background:
    "radial-gradient(81.25% 81.25% at 67.32% 18.75%, #17B3A9 0%, #0945DF 100%)",
  animation: "bounce 5s ease-in-out infinite",
  animationDelay: "-3.0s",
  "@keyframes bounce": {
    "0%, 100%": {
      transform: "scale( 0.0 )",
    },
    "50%": {
      transform: "scale( 1.0 )",
    },
  },
});
const Load = styled("div")({
  position: "absolute",
  width: "200px",
  height: "200px",
  animation: "spin 10s ease-in-out infinite",
  "@keyframes spin": {
    "100%": {
      transform: "rotate( 360deg )",
    },
  },
});

// styles
const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100%",
  zIndex: 100,
  width: "100%",
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  "@keyframes fadeOut": {
    "0%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0,
    },
  },
});
// styles
const LoaderContent = styled("div")({
  position: "relative",
  height: "100%",
  zIndex: 110,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const LoaderContainer = styled("div")({
  position: "fixed",
  height: "100%",
  top: 0,
  left: 0,
  background:
    "linear-gradient(152.97deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
  backdropFilter: "blur(20px)",
  zIndex: 120,
  width: "100%",
});

// ==============================|| LOADER ||============================== //
const Loader = ({
  isLoading = true,
  progressBar = false,
}: {
  isLoading: boolean;
  progressBar?: boolean;
}) => {
  const hasTransitionedIn = useMountTransition({
    isMounted: isLoading,
    unmountDelay: 500,
  });

  return (
    <>
      {hasTransitionedIn && (
        <LoaderWrapper
          style={{
            animation: `${!isLoading && "fadeOut"} .6s`,
          }}
        >
          <LoaderContent>
            <Load>
              <Bubble />
              <Bubble1 />
              <Bubble2 />
            </Load>
          </LoaderContent>
          <LoaderContainer>
            {progressBar === true && <LinearProgress color="primary" />}
          </LoaderContainer>
        </LoaderWrapper>
      )}
    </>
  );
};

export default Loader;
