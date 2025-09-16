import React, { useState } from 'react'; // <-- 1. Corrected the import syntax
import { Link } from 'react-router-dom'; // <-- 2. Import the Link component
import { User, Mail, Lock, Eye, EyeOff, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const SignUpPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});

  // --- Form Validation Logic (Excellent!) ---
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and privacy policy';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Sign up attempt:', formData);
      alert('Account creation functionality would be implemented here');
    }
  };
  
  // --- Helper Functions (Great work!) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 1, text: 'Weak', color: 'text-red-500' };
    if (password.length < 10) return { strength: 2, text: 'Medium', color: 'text-yellow-500' };
    return { strength: 3, text: 'Strong', color: 'text-green-500' };
  };
  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Column 1: Welcome Message & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-green-50 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="mb-8">
            {/* Your excellent SVG illustration code here... */}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Join a Supportive Community.</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Create your free account to access confidential support, wellness resources, and a community that understands.
          </p>
        </div>
      </div>

      {/* Column 2: Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
          </div>

          {/* 3. USE A <form> ELEMENT WITH onSubmit */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute h-5 w-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none transition-colors ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'}`} placeholder="Enter your full name" />
              </div>
              {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
               <div className="relative">
                <Mail className="absolute h-5 w-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none transition-colors ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'}`} placeholder="Enter your email" />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute h-5 w-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleInputChange} className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none transition-colors ${errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'}`} placeholder="Create a password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">{showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}</button>
              </div>
              {formData.password && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5"><div className={`h-1.5 rounded-full ${passwordStrength.strength === 1 ? 'bg-red-500 w-1/3' : passwordStrength.strength === 2 ? 'bg-yellow-500 w-2/3' : 'bg-green-500 w-full'}`}></div></div>
                    <span className={`text-xs font-medium ${passwordStrength.color}`}>{passwordStrength.text}</span>
                  </div>
              )}
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute h-5 w-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
                <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className={`block w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none transition-colors ${errors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'}`} placeholder="Confirm password" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">{showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}</button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Terms of Service */}
            <div>
              <div className="flex items-start">
                <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5" />
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{' '}
                    {/* 4. USE LINK COMPONENT */}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">Privacy Policy</Link>
                  </label>
                </div>
              </div>
              {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}
            </div>
            
            {/* 5. BUTTON TYPE IS "submit" */}
            <button type="submit" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Create Account</span>
            </button>
            
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                {/* 4. USE LINK COMPONENT */}
                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;