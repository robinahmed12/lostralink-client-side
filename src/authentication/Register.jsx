import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { toast, Bounce } from "react-toastify";

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
  const [activeField, setActiveField] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, photoURL } = formData;

    // Password validation
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      toast.error(`Password must contain: ${passwordErrors.join(", ")}`, {
        position: "top-center",
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(email, password);
      if (result.user) {
        await updateUserProfile({
          displayName: name,
          ...(photoURL && { photoURL }),
        });

        toast.success("🎉 Registration successful! Welcome to Lost & Found", {
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
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFAF0] p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <motion.div
            className="bg-[#F0EAD6] p-6 md:p-8 rounded-2xl shadow-lg border border-[#3E2F1C]/10"
            whileHover={{
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl font-bold text-[#3E2F1C] mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Join Lost & Found
              </motion.h2>
              <p className="text-[#9A8C7A]">
                Create an account to report and find lost items
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="relative"
                onFocus={() => setActiveField("name")}
                onBlur={() => setActiveField(null)}
              >
                <label className="block mb-2 text-sm font-medium text-[#3E2F1C]">
                  Full Name
                </label>
                <motion.div
                  className="relative"
                  animate={{
                    borderColor:
                      activeField === "name" ? "#F4A261" : "#3E2F1C/20",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none bg-[#FFFAF0] text-[#3E2F1C] placeholder-[#9A8C7A]/70"
                    placeholder="John Doe"
                  />
                  {activeField === "name" && (
                    <motion.span
                      className="absolute left-0 bottom-0 h-0.5 bg-[#F4A261]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                onFocus={() => setActiveField("email")}
                onBlur={() => setActiveField(null)}
              >
                <label className="block mb-2 text-sm font-medium text-[#3E2F1C]">
                  Email
                </label>
                <motion.div
                  className="relative"
                  animate={{
                    borderColor:
                      activeField === "email" ? "#F4A261" : "#3E2F1C/20",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none bg-[#FFFAF0] text-[#3E2F1C] placeholder-[#9A8C7A]/70"
                    placeholder="your@email.com"
                  />
                  {activeField === "email" && (
                    <motion.span
                      className="absolute left-0 bottom-0 h-0.5 bg-[#F4A261]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                onFocus={() => setActiveField("password")}
                onBlur={() => setActiveField(null)}
              >
                <label className="block mb-2 text-sm font-medium text-[#3E2F1C]">
                  Password
                </label>
                <motion.div
                  className="relative"
                  animate={{
                    borderColor:
                      activeField === "password" ? "#F4A261" : "#3E2F1C/20",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none bg-[#FFFAF0] text-[#3E2F1C] placeholder-[#9A8C7A]/70"
                    placeholder="••••••••"
                  />
                  {activeField === "password" && (
                    <motion.span
                      className="absolute left-0 bottom-0 h-0.5 bg-[#F4A261]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
                <p className="mt-1 text-xs text-[#9A8C7A]">
                  Must contain uppercase, lowercase, and be at least 6
                  characters
                </p>
              </motion.div>

              <motion.div
                className="relative"
                onFocus={() => setActiveField("photoURL")}
                onBlur={() => setActiveField(null)}
              >
                <label className="block mb-2 text-sm font-medium text-[#3E2F1C]">
                  Profile Photo URL (Optional)
                </label>
                <motion.div
                  className="relative"
                  animate={{
                    borderColor:
                      activeField === "photoURL" ? "#F4A261" : "#3E2F1C/20",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none bg-[#FFFAF0] text-[#3E2F1C] placeholder-[#9A8C7A]/70"
                    placeholder="https://example.com/photo.jpg"
                  />
                  {activeField === "photoURL" && (
                    <motion.span
                      className="absolute left-0 bottom-0 h-0.5 bg-[#F4A261]"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 4px 6px -1px rgba(244, 162, 97, 0.3), 0 2px 4px -1px rgba(244, 162, 97, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-[#3E2F1C] flex justify-center items-center transition-all duration-200 ${
                  isLoading
                    ? "bg-[#F4A261]/70"
                    : "bg-[#F4A261] hover:bg-[#F4A261]/90"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#3E2F1C]"
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
                    Creating account...
                  </>
                ) : (
                  "Register Now"
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[#9A8C7A]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium hover:underline text-[#2A9D8F] hover:text-[#2A9D8F]/80 transition-colors"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Register;
