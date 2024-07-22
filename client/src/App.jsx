import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TotalView from "./pages/TotalView";
import RootLayout from "./pages/RootLayout";
// import { ethers } from 'ethers';

// (async () => {
//   let addresses = [];
//   for (let i = 0; i < 100; i++) {
//     let wallet = ethers.Wallet.createRandom();
//     addresses.push(wallet.address);
//   }
//   console.log(addresses);
// })();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <TotalView />,
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
