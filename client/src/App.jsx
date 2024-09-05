import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Explore />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
