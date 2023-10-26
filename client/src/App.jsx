import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Homepage/Index";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Main from "./layouts/Main";
import Profile from "./pages/profile/Index";
import Admin from "./pages/admin/Index";
import AuthProvider from "./providers/AuthProvider";
import Details from "./pages/Homepage/Details";
import SavedProducts from "./pages/savedProduct/Index";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: (
            <AuthProvider>
              <Index />
            </AuthProvider>
          ),
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/profile",
          element: (
            <AuthProvider>
              <Profile />
            </AuthProvider>
          ),
        },
        {
          path: "/admin",
          element: (
            <AuthProvider>
              <Admin />
            </AuthProvider>
          ),
        },
        {
          path: "/products/:id",
          element: <Details />,
        },
        {
          path: "/saved-products",
          element: (
            <AuthProvider>
              <SavedProducts />
            </AuthProvider>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
