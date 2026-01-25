import React, { useState } from 'react';
import { Zap, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../AuthContext';
import { toast } from 'react-toastify';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    gender: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(?:\+?880|0)?1[3-9]\d{8}$/;
    const digitsOnly = phone.replace(/[\s\-()]/g, '');
    return phoneRegex.test(digitsOnly);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      isValid: minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Password does not meet requirements';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the Terms and Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    console.log('Registration data:', {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password, 
      phoneNumber: formData.phoneNumber,
      gender: formData.gender
    });

    try {
      const response = await fetch('https://task-pilot-server-iota.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,        
          email: formData.email,
          password: formData.password,
          phone: formData.phoneNumber,    
          gender: formData.gender
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Registration successful!');
        navigate('/');
      } else {
        setErrors({ email: data.message });
        toast.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-3xl mb-4 shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-transform">
            <Zap className="w-10 h-10 text-white" strokeWidth={2.5} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">FlowSync</h1>
          <p className="text-purple-200">Start your productivity journey</p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6">Create an account</h2>
          
          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-purple-100 mb-2">
                Full Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border ${errors.fullName ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none backdrop-blur-sm`}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-300">{errors.fullName}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100 mb-2">
                Email Address <span className="text-cyan-400">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none backdrop-blur-sm`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-purple-100 mb-2">
                Phone Number <span className="text-cyan-400">*</span>
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border ${errors.phoneNumber ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none backdrop-blur-sm`}
                placeholder="+8801712345678"
              />
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-300">{errors.phoneNumber}</p>}
            </div>

            {/* Gender Selection */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-purple-100 mb-2">
                Gender <span className="text-cyan-400">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-white/10 border ${errors.gender ? 'border-red-400' : 'border-white/20'} rounded-xl text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none backdrop-blur-sm`}
              >
                <option value="" className="bg-slate-800">Select gender</option>
                <option value="male" className="bg-slate-800">Male</option>
                <option value="female" className="bg-slate-800">Female</option>
              </select>
              {errors.gender && <p className="mt-1 text-xs text-red-300">{errors.gender}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-purple-100 mb-2">
                Password <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.password ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none backdrop-blur-sm pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <p className={`text-xs ${passwordValidation.minLength ? 'text-cyan-400' : 'text-purple-300'}`}>
                    ✓ At least 8 characters
                  </p>
                  <p className={`text-xs ${passwordValidation.hasUpperCase ? 'text-cyan-400' : 'text-purple-300'}`}>
                    ✓ One uppercase letter
                  </p>
                  <p className={`text-xs ${passwordValidation.hasLowerCase ? 'text-cyan-400' : 'text-purple-300'}`}>
                    ✓ One lowercase letter
                  </p>
                  <p className={`text-xs ${passwordValidation.hasNumber ? 'text-cyan-400' : 'text-purple-300'}`}>
                    ✓ One number
                  </p>
                  <p className={`text-xs ${passwordValidation.hasSpecialChar ? 'text-cyan-400' : 'text-purple-300'}`}>
                    ✓ One special character
                  </p>
                </div>
              )}
              {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple-100 mb-2">
                Confirm Password <span className="text-cyan-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/10 border ${errors.confirmPassword ? 'border-red-400' : 'border-white/20'} rounded-xl text-white placeholder-purple-300 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all outline-none backdrop-blur-sm pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-300">{errors.confirmPassword}</p>}
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors({ ...errors, terms: '' });
                    }
                  }}
                  className="w-4 h-4 mt-1 text-cyan-400 bg-white/10 border-white/30 rounded focus:ring-2 focus:ring-cyan-400"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-purple-100">
                  I agree to the{' '}
                  <button type="button" className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors">
                    Terms and Conditions
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors">
                    Privacy Policy
                  </button>
                </label>
              </div>
              {errors.terms && <p className="mt-1 text-xs text-red-300">{errors.terms}</p>}
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transform hover:scale-105 mt-2"
            >
              Create account
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/10 text-purple-200 backdrop-blur-sm rounded-full">Or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-white">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5 mr-2 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium text-white">GitHub</span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-purple-200">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-purple-300/60">
          © 2024 FlowSync. All rights reserved.
        </p>
      </div>
    </div>
  );
}