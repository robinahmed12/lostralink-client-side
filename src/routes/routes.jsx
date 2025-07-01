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
import AboutUs from "../pages/AboutUs";
import ContactPage from "../components/ContactPage";
import BlogPage from "../pages/BlogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
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
        element: (
          <PrivateRoutes>
            <RecoverItem />
          </PrivateRoutes>
        ),
      },

      {
        path: "/allItems",
        element: <LostFoundItem />,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoutes>
            <ItemDetails></ItemDetails>
          </PrivateRoutes>
        ),
      },
      {
        path: "/manage-items",
        element: (
          <PrivateRoutes>
            <MyItems />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoutes>
            <UpdateItem />
          </PrivateRoutes>
        ),
      },

      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactPage/>
      },
      {
        path: "/blog",
        element: <BlogPage/>
      }
    ],
  },
]);
