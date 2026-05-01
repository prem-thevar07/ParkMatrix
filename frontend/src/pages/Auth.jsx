import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { Lock, Mail, User, ShieldCheck, ArrowRight, CarFront } from "lucide-react";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Clear errors and form when switching modes
  useEffect(() => {
    setError("");
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
  }, [isLogin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // clear error on typing
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!isLogin) {
      if (!form.name) {
        setError("Name is required.");
        return false;
      }
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        return false;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: form.email,
          password: form.password
        });
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        await API.post("/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password
        });
        alert("Account Created Successfully!");
        // Switch to login after successful registration
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 border border-white/20">
        
        {/* Left Side - Branding (Visible on Desktop) */}
        <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-between bg-gradient-to-br from-indigo-900/80 to-purple-900/80 relative overflow-hidden hidden md:flex">
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-white mb-10">
              <CarFront size={36} className="text-blue-400" />
              <h1 className="text-3xl font-extrabold tracking-tight">ParkMatrix</h1>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {isLogin ? "Welcome Back" : "Join the Matrix"}
            </h2>
            <p className="text-indigo-200 text-lg max-w-sm">
              {isLogin 
                ? "Manage your parking spaces efficiently. Log in to access your dashboard and metrics."
                : "Create an account to streamline your parking experience with our smart platform."}
            </p>
          </div>
          
          <div className="relative z-10 mt-16">
            <div className="flex items-center gap-4 text-sm text-indigo-300">
              <span>Secure authentication</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>Fast access</span>
            </div>
          </div>

          {/* Decorative Pattern */}
          <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFFFFF" d="M42.7,-73.4C55.9,-67.5,67.6,-56.3,76.5,-43.1C85.4,-29.9,91.5,-14.9,90.4,-0.6C89.3,13.7,81,27.4,72.4,40.1C63.8,52.8,54.9,64.5,42.8,72.6C30.7,80.7,15.3,85.2,0.4,84.6C-14.6,83.9,-29.1,78,-41.8,70.1C-54.5,62.2,-65.4,52.3,-72.6,40.1C-79.8,27.9,-83.3,13.9,-83.4,-0.1C-83.4,-14.1,-80,-28.2,-73.3,-40.7C-66.6,-53.2,-56.6,-64.1,-44.1,-70.7C-31.6,-77.3,-15.8,-79.6,-0.1,-79.4C15.6,-79.2,31.2,-76.5,42.7,-73.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>

        {/* Right Side - Form Container */}
        <div className="w-full md:w-1/2 p-8 lg:p-14 bg-white">
          
          {/* Mobile Branding */}
          <div className="md:hidden flex items-center justify-center gap-2 mb-8 text-indigo-900">
            <CarFront size={28} className="text-indigo-600" />
            <h1 className="text-2xl font-bold tracking-tight">ParkMatrix</h1>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8 relative">
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${isLogin ? 'left-1' : 'left-[calc(50%+3px)]'}`}
            ></div>
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg z-10 transition-colors ${isLogin ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg z-10 transition-colors ${!isLogin ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800">
              {isLogin ? "Sign in to your account" : "Create a new account"}
            </h3>
            <p className="text-slate-500 mt-2 text-sm">
              {isLogin ? "Enter your email and password to access your dashboard." : "Fill in your details below to get started."}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm animate-fade-in flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
            
            <div className={`transition-all duration-300 ease-in-out ${!isLogin ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden m-0 p-0'}`}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              />
            </div>

            <div className={`transition-all duration-300 ease-in-out ${!isLogin ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0 overflow-hidden m-0 p-0'}`}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck size={18} />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              disabled={isLoading}
              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
            
          </form>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}

export default Auth;
