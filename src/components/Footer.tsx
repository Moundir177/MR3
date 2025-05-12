'use client';

import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin 
} from 'react-icons/fi';

export default function Footer() {
  const { locale } = useLocale();

  const translations: Record<string, Record<string, string>> = {
    fr: {
      'common.home': 'Accueil',
      'common.about': 'À propos',
      'common.courses': 'Formations',
      'common.contact': 'Contact',
      'footer.rights': 'Tous droits réservés',
      'footer.privacy': 'Politique de confidentialité',
      'footer.terms': 'Conditions d\'utilisation',
      'contact.address': 'Adresse',
      'contact.phone': 'Téléphone',
      'contact.email': 'Email',
      'footer.quickLinks': 'Liens rapides',
      'footer.followUs': 'Suivez-nous',
      'footer.address': 'Alger, Algérie',
      'footer.subscribeTitle': 'Inscrivez-vous à notre newsletter',
      'footer.subscribeText': 'Recevez nos dernières actualités et offres',
      'footer.subscribe': 'S\'inscrire',
      'footer.yourEmail': 'Votre email',
      'footer.copyright': 'Copyright'
    },
    ar: {
      'common.home': 'الرئيسية',
      'common.about': 'من نحن',
      'common.courses': 'الدورات التدريبية',
      'common.contact': 'اتصل بنا',
      'footer.rights': 'جميع الحقوق محفوظة',
      'footer.privacy': 'سياسة الخصوصية',
      'footer.terms': 'شروط الاستخدام',
      'contact.address': 'العنوان',
      'contact.phone': 'الهاتف',
      'contact.email': 'البريد الإلكتروني',
      'footer.quickLinks': 'روابط سريعة',
      'footer.followUs': 'تابعنا',
      'footer.address': 'الجزائر، الجزائر',
      'footer.subscribeTitle': 'اشترك في نشرتنا الإخبارية',
      'footer.subscribeText': 'احصل على آخر الأخبار والعروض',
      'footer.subscribe': 'اشتراك',
      'footer.yourEmail': 'بريدك الإلكتروني',
      'footer.copyright': 'حقوق النشر'
    },
    en: {
      'common.home': 'Home',
      'common.about': 'About',
      'common.courses': 'Courses',
      'common.contact': 'Contact',
      'footer.rights': 'All rights reserved',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Use',
      'contact.address': 'Address',
      'contact.phone': 'Phone',
      'contact.email': 'Email',
      'footer.quickLinks': 'Quick Links',
      'footer.followUs': 'Follow Us',
      'footer.address': 'Algiers, Algeria',
      'footer.subscribeTitle': 'Subscribe to our newsletter',
      'footer.subscribeText': 'Get our latest news and offers',
      'footer.subscribe': 'Subscribe',
      'footer.yourEmail': 'Your email',
      'footer.copyright': 'Copyright'
    }
  };

  const t = (key: string) => {
    return translations[locale]?.[key] || key;
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-white">MIRA <span className="text-secondary">ACADEMY</span></span>
            </Link>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-secondary" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-secondary" />
                <span>+213 123 456 789</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-secondary" />
                <span>contact@miracademy.dz</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-secondary transition-colors">
                  {t('common.courses')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  {t('common.contact')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-secondary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-secondary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.subscribeTitle')}</h3>
            <p className="mb-4 text-gray-400">{t('footer.subscribeText')}</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t('footer.yourEmail')}
                className="flex-grow px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-secondary hover:bg-secondary-dark rounded-md transition-colors"
              >
                {t('footer.subscribe')}
              </button>
            </form>

            {/* Social Media Links */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.followUs')}</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <FiFacebook size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-sky-500 rounded-full hover:bg-sky-600 transition-colors"
                >
                  <FiTwitter size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors"
                >
                  <FiInstagram size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors"
                >
                  <FiLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            © {currentYear} MIRA ACADEMY. {t('footer.copyright')} | {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
} 