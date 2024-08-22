import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ExplorePage from "./pages/ExplorePage";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <ExplorePage />,
        loader: () => {
          window.scrollTo(0, 0);
          return null;
        },
      },
      {
        path: "dashboard", // No index: true here
        element: <DashboardPage />,
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
