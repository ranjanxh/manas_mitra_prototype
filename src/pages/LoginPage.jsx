import React, {useState} from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // <-- 1. IMPORT THE LINK COMPONENT

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    alert('Login functionality would be implemented here');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Column 1: Welcome Message & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-teal-50 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="mb-8">
            {/* Your beautiful SVG illustration code here... */}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome Back.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Your journey to wellness continues here. We're glad to see you again.
          </p>
        </div>
      </div>

      {/* Column 2: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            {/* We'll add the logo here later from src/assets */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Log in to your Account
            </h2>
            <p className="text-gray-600">
              Access your personalized wellness dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute h-5 w-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute h-5 w-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              {/* 2. USE LINK FOR FORGOT PASSWORD */}
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                Forgot Password?
              </Link>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group">
              <span>Login Securely</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                {/* 3. USE LINK FOR SIGN UP */}
                <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;