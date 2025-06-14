import { useContext, useState } from "react";
import { Link,   useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Bounce, toast } from "react-toastify";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/Animation - 1749544429039.json";

const Register = () => {
  const { location } = useLocation();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    const errors = [];
    if (!/[a-z]/.test(password)) errors.push("lowercase letter");
    if (!/[A-Z]/.test(password)) errors.push("uppercase letter");
    if (password.length < 6) errors.push("at least 6 characters");
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    // Password validation
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      toast.error(`Password must contain: ${passwordErrors.join(", ")}`);
      return;
    }

    setIsLoading(true);

    createUser(email, password)
      .then((result) => {
        if (result.user) {
          toast.success("🦄 Registration successful", {
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
        toast(error.message);
      });

    updateUserProfile({
      displayName: name,
      ...(photoURL && { photoURL }),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFAF0] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#F0EAD6] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#3E2F1C]">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-[#3E2F1C]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 bg-[#FFFAF0]"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-[#3E2F1C]">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 bg-[#FFFAF0]"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium text-[#3E2F1C]">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 bg-[#FFFAF0]"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium text-[#3E2F1C]">
                Profile Photo URL (Optional)
              </label>
              <input
                type="url"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 bg-[#FFFAF0]"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-md font-medium bg-[#F4A261] text-[#3E2F1C] hover:shadow-md flex justify-center items-center"
            >
              {isLoading ? (
                <Lottie
                  animationData={loadingAnimation}
                  loop={true}
                  style={{ width: 32, height: 32 }}
                />
              ) : (
                "Register"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#9A8C7A]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium hover:underline text-[#2A9D8F]"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
