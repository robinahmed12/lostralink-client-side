import React from "react";
import Navbar from "../components/Header/Navbar";
import { Outlet, useNavigation } from "react-router";
import Footer from "../components/Footer/Footer";
import { Bounce, ToastContainer } from "react-toastify";
import Loader from "../components/Loader";

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>
      <main className="relative min-h-[calc(100vh-764px)]">
        {/* Full-page loader during route transitions */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFAF0]/80">
            <Loader />
          </div>
        )}

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
