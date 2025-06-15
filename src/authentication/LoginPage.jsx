import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub, FaEnvelope, FaLock } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Bounce, toast } from "react-toastify";

const LoginPage = () => {
  const { location } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInUser(email, password)
      .then(() => {
        toast.success("🦄 Login successful", {
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
      .then(
        (result) => {
          if (result.user) {
            toast.success("🦄 Google Login successful", {
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
        },
        (error) => {
          console.error("Google login failed:", error);
          toast.error("Google login failed. Check console for error details.", {
            position: "top-center",
            autoClose: 5000,
          });
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-[#FFFAF0] p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#F0EAD6] rounded-lg shadow-lg overflow-hidden p-8 transition-all duration-300 hover:shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#3E2F1C] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#9A8C7A]">Log in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
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
                  className="block w-full pl-10 pr-3 py-2 border border-[#9A8C7A] rounded-md shadow-sm placeholder-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm bg-white text-[#3E2F1C]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
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
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-[#9A8C7A] rounded-md shadow-sm placeholder-[#9A8C7A] focus:outline-none focus:ring-2 focus:ring-[#F4A261] focus:border-[#F4A261] sm:text-sm bg-white text-[#3E2F1C]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#F4A261] focus:ring-[#F4A261] border-[#9A8C7A] rounded"
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
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F4A261] hover:bg-[#E69150] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4A261] transition-all duration-300 ${
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
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#9A8C7A]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#F0EAD6] text-[#9A8C7A]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className={`w-full inline-flex justify-center py-2 px-4 border border-[#9A8C7A] rounded-md shadow-sm bg-white text-sm font-medium text-[#3E2F1C] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4A261] transition-all duration-300 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                <FaGoogle className="h-5 w-5 text-[#DB4437]" />
                <span className="ml-2">Google</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#9A8C7A]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[#2A9D8F] hover:text-[#1E7D74] transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
