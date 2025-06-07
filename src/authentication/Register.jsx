import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { Bounce, toast } from "react-toastify";

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { email, password, name, photoURL } = formData;
  console.log(name, photoURL);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        console.log("Registration data:", formData);
        setIsSubmitting(false);
        // Redirect or show success message
      }, 1500);
    }

    const RegExpLower = /[a-z]/;
    const RegExpUpper = /[A-Z]/;
    const RegExpLength = /^.{6,}$/;

    if (!RegExpLower.test(password)) {
      toast.error("Must have a lowercase letter in the password");
      return;
    }
    if (!RegExpUpper.test(password)) {
      toast.error("Must have an uppercase letter in the password");
      return;
    }
    if (!RegExpLength.test(password)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
         setUser(user);
        if (user) {
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
       

        //  user update profile
        updateUserProfile({ displayName: name, photoURL: photoURL }).then(
          () => {
            setUser({ ...user, displayName: name, photoURL: photoURL });
          }
        );
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div
      className="min-h-screen pt-20 flex items-center justify-center p-4"
      style={{ backgroundColor: "#FFFAF0" }} // Cream White background
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div
          className="p-8 rounded-lg shadow-md"
          style={{ backgroundColor: "#F0EAD6" }} // Light Sand card background
        >
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#3E2F1C" }} // Cocoa Brown text
          >
            Create an Account
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 font-medium"
                style={{ color: "#3E2F1C" }} // Cocoa Brown text
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#F4A261]/50"
                }`}
                style={{ backgroundColor: "#FFFAF0" }} // Cream White input background
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm"
                  style={{ color: "#E76F51" }} // Burnt Red error text
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-medium"
                style={{ color: "#3E2F1C" }} // Cocoa Brown text
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#F4A261]/50"
                }`}
                style={{ backgroundColor: "#FFFAF0" }} // Cream White input background
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm"
                  style={{ color: "#E76F51" }} // Burnt Red error text
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 font-medium"
                style={{ color: "#3E2F1C" }} // Cocoa Brown text
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 transition-all ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-[#F4A261]/50"
                }`}
                style={{ backgroundColor: "#FFFAF0" }} // Cream White input background
              />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm"
                  style={{ color: "#E76F51" }} // Burnt Red error text
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="photoURL"
                className="block mb-2 font-medium"
                style={{ color: "#3E2F1C" }} // Cocoa Brown text
              >
                Profile Photo URL (Optional)
              </label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50 transition-all"
                style={{ backgroundColor: "#FFFAF0" }} // Cream White input background
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:shadow-md"
              }`}
              style={{
                backgroundColor: "#F4A261", // Deep Mustard primary
                color: "#3E2F1C", // Cocoa Brown text
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5"
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
                  Registering...
                </span>
              ) : (
                "Register"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p
              className="text-sm"
              style={{ color: "#9A8C7A" }} // Warm Taupe muted text
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium hover:underline transition-all"
                style={{ color: "#2A9D8F" }} // Forest Green accent
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
