import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
// import TotalView from "./pages/TotalView";
import TestContractFunctions from "./components/TestContractFunctions";
import TestNonContractFunctions from "./components/TestNonContractFunctions";
import Integration from "./components/Integration";

const router = createBrowserRouter([
  {
    // path: "/",
    // element: <RootLayout />,
    // children: [
    //   {
    //     index: true,
    //     path: "/",
    //     element: <TotalView />,
    //     loader: () => {
    //       window.scrollTo(0, 0);
    //       return null;
    //     },
    //   },
    // ],
  },
]);

function App() {
  // return <RouterProvider router={router} />;
  return <Integration />;
}

export default App;
