import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Bounce, toast } from "react-toastify";
import { motion } from "framer-motion";

const LoginPage = () => {
  const {  location } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

      

    signInUser(email, password)
      .then(() => {
       toast.success("🎉 Login successful! Welcome to Lost & Found", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate(`${location?.state ?? "/"}`);
        
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);

    signInWithGoogle()
      .then((result) => {
        if (result.user) {
          toast.success("🎉 Google Login successful! Welcome to Lost & Found", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        }
       navigate(`${location?.state ?? "/"}`);
      })
      .catch((error) => {
        console.error("Google login failed:", error);
        toast.error("Google login failed. Check console for error details.", {
          position: "top-center",
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  useEffect(()=>{
        document.title = "Login"
      })

  return (
    <div className="min-h-screen mt-20 pb-20 flex items-center justify-center bg-gradient-to-br from-[#FFFAF0] to-[#F0EAD6] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 backdrop-blur-sm bg-opacity-80 border border-[#F0EAD6]"
        >
          {/* Logo/Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F4A261] flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#3E2F1C] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#9A8C7A]">
              Log in to your Lost & Found account
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            variants={containerVariants}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#3E2F1C] mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-[#9A8C7A]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-[#9A8C7A] rounded-lg shadow-sm placeholder-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm bg-white text-[#3E2F1C] transition-all duration-200"
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#3E2F1C] mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-[#9A8C7A]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-[#9A8C7A] rounded-lg shadow-sm placeholder-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm bg-white text-[#3E2F1C] transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-[#9A8C7A] hover:text-[#3E2F1C] transition-colors" />
                  ) : (
                    <FaEye className="text-[#9A8C7A] hover:text-[#3E2F1C] transition-colors" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#F4A261] focus:ring-[#F4A261] border-[#9A8C7A] rounded transition-all"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-[#3E2F1C]"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-[#2A9D8F] hover:text-[#1E7D74] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#F4A261] hover:bg-[#E69150] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4A261] transition-all duration-300 transform hover:scale-[1.01] ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign in
                  </span>
                )}
              </button>
            </motion.div>
          </motion.form>

          {/* Social Login Divider */}
          <motion.div variants={itemVariants} className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#9A8C7A] border-opacity-30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-[#9A8C7A] bg-opacity-80">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="mt-6 grid grid-cols-1 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className={`w-full inline-flex justify-center py-2 px-4 border border-[#9A8C7A] rounded-lg shadow-sm bg-white text-sm font-medium text-[#3E2F1C] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4A261] transition-all duration-300 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                <FaGoogle className="h-5 w-5 text-[#DB4437]" />
                <span className="ml-2">Google</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Registration Link */}
          <motion.div variants={itemVariants} className="mt-6 text-center">
            <p className="text-sm text-[#9A8C7A]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[#2A9D8F] hover:text-[#1E7D74] transition-colors"
              >
                Register here
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
