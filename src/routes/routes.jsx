import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/Home/Home";
import LoginPage from "../authentication/LoginPage";
import Register from "../authentication/Register";
import AddItemsPage from "../pages/AddItemsPage ";
import PrivateRoutes from "../privates/PrivateRoutes";
import LostFoundItem from "../pages/LostFoundItem";
import ItemDetails from "../pages/ItemDetails";
import RecoverItem from "../pages/RecoverItem";
import MyItems from "../pages/MyItems";
import UpdateItem from "../pages/UpdateItem";
import NotFoundPage from "../components/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage/>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-item",
        element: (
          <PrivateRoutes>
            <AddItemsPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/recovered-items",
        element: <PrivateRoutes><RecoverItem /></PrivateRoutes>,
      },

      {
        path: "/allItems",
        element: <LostFoundItem />,
      },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allItems/${params.id}`),
        element: <PrivateRoutes><ItemDetails></ItemDetails></PrivateRoutes>,
      },
      {
        path: "/manage-items",
        element: <PrivateRoutes><MyItems /></PrivateRoutes>,
      },
      {
        path: "/update/:id",
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:3000/allItems/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Item not found");
          }
          return response.json();
        },
        element: <UpdateItem />,
      },
    ],
  },
]);
