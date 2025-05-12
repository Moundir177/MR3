'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiGithub, FiTwitter, FiFacebook } from 'react-icons/fi';
import { useLocale } from '@/app/providers';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit?: (data: any) => void;
  className?: string;
}

/**
 * Authentication form component that handles both login and registration
 */
const AuthForm: React.FC<AuthFormProps> = ({
  type,
  onSubmit,
  className = '',
}) => {
  const { locale } = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });

  const translations: Record<string, Record<string, string>> = {
    en: {
      login: 'Login',
      register: 'Register',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      dontHaveAccount: 'Don\'t have an account?',
      alreadyHaveAccount: 'Already have an account?',
      registerHere: 'Register here',
      loginHere: 'Login here',
      orContinueWith: 'Or continue with',
      termsAgreement: 'By registering, you agree to our',
      termsOfService: 'Terms of Service',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
    },
    fr: {
      login: 'Connexion',
      register: 'Inscription',
      name: 'Nom',
      email: 'Email',
      password: 'Mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      dontHaveAccount: 'Vous n\'avez pas de compte ?',
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      registerHere: 'Inscrivez-vous ici',
      loginHere: 'Connectez-vous ici',
      orContinueWith: 'Ou continuer avec',
      termsAgreement: 'En vous inscrivant, vous acceptez nos',
      termsOfService: 'Conditions d\'utilisation',
      and: 'et',
      privacyPolicy: 'Politique de confidentialité',
    },
    ar: {
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      dontHaveAccount: 'ليس لديك حساب؟',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      registerHere: 'سجل هنا',
      loginHere: 'تسجيل الدخول هنا',
      orContinueWith: 'أو تابع باستخدام',
      termsAgreement: 'بالتسجيل، فإنك توافق على',
      termsOfService: 'شروط الخدمة',
      and: 'و',
      privacyPolicy: 'سياسة الخصوصية',
    },
  };

  const t = (key: string) => {
    return translations[locale]?.[key] || translations.en[key] || key;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`card glass p-8 max-w-md mx-auto ${className}`}>
      <h2 className="text-2xl font-bold gradient-text mb-6">
        {type === 'login' ? t('login') : t('register')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name field - only for registration */}
        {type === 'register' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('name')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>
        )}
        
        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('email')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        </div>
        
        {/* Password field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('password')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-blue focus:border-blue dark:bg-gray-700 dark:text-white"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Remember me & Forgot password - only for login */}
        {type === 'login' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue focus:ring-blue border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                {t('rememberMe')}
              </label>
            </div>
            
            <Link href={`/${locale}/forgot-password`} className="text-sm text-blue hover:underline">
              {t('forgotPassword')}
            </Link>
          </div>
        )}
        
        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-blue w-full"
        >
          {type === 'login' ? t('login') : t('register')}
        </button>
        
        {/* Social login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">
                {t('orContinueWith')}
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="btn-outline w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiGithub />
            </button>
            <button
              type="button"
              className="btn-outline w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiTwitter />
            </button>
            <button
              type="button"
              className="btn-outline w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <FiFacebook />
            </button>
          </div>
        </div>
      </form>
      
      {/* Footer - Switch between login and register */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        {type === 'login' ? (
          <>
            {t('dontHaveAccount')}{' '}
            <Link href={`/${locale}/register`} className="text-blue hover:underline">
              {t('registerHere')}
            </Link>
          </>
        ) : (
          <>
            {t('alreadyHaveAccount')}{' '}
            <Link href={`/${locale}/login`} className="text-blue hover:underline">
              {t('loginHere')}
            </Link>
          </>
        )}
      </div>
      
      {/* Terms agreement - only for registration */}
      {type === 'register' && (
        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          {t('termsAgreement')}{' '}
          <Link href={`/${locale}/terms`} className="text-blue hover:underline">
            {t('termsOfService')}
          </Link>{' '}
          {t('and')}{' '}
          <Link href={`/${locale}/privacy`} className="text-blue hover:underline">
            {t('privacyPolicy')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm; 