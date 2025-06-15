import React, { useEffect, useState } from "react";
import Navbar from "../components/Header/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/Footer/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [location]);
  return (
    <>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main className="relative min-h-[calc(100vh-764px)]">
        {loading && <Loader />}

        <ScrollToTop/>
        <Outlet />

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
