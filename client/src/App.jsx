import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Explorer from "./pages/Explorer";

import ClusterDetails from "./pages/ClusterDetails";
import RollupDetails from "./pages/RollupDetails";
import OperatorDetails from "./pages/OperatorDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Explorer />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
      {
        path: "/:clusterId/details", // No index: true here
        element: <ClusterDetails />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
      {
        path: ":clusterId/details/rollup/:rollupId",
        element: <RollupDetails />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
      {
        path: ":clusterId/details/rollup/:rollupId/operator/:operatorAddress",
        element: <OperatorDetails />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
