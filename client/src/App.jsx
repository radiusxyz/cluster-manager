import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Explorer from "./pages/Explorer";
import Dashboard from "./pages/Dashboard";
import ProposerSetDetails from "./pages/ProposerSetDetails";

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
        path: "dashboard", // No index: true here
        element: <Dashboard />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
      {
        path: "/:proposerSetId/details", // No index: true here
        element: <ProposerSetDetails />,
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
