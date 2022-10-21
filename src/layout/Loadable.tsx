import { Suspense } from "react";

// project imports
import LoaderProgress from "./LoaderProgress";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

export const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<LoaderProgress />}>
      <Component {...props} />
    </Suspense>
  );
