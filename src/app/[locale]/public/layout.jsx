'use client';
// app/mapa/layout.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Loader from 'components/shared/Loader';
import GradientButton from 'components/shared/GradientButton';
import WhatsappButton from 'components/shared/WhatsappButton';
import LanguageSwitcher from 'components/shared/LanguageSwitcher';
import { Menu } from 'lucide-react';
import { useState } from 'react';

// const marcas = [
//   { src: '/assets/logos/logo_palm_springs.jpg', alt: 'Palm Springs' },
//   { src: '/assets/logos/logo_akelian.png', alt: 'Akelian' },
//   { src: '/assets/logos/b2b-connect-platform_old.png', alt: 'b2b-connect-platform' },
//   { src: '/assets/logos/logo_palm_springs.jpg', alt: 'Palm Springs' },
//   { src: '/assets/logos/logo_akelian.png', alt: 'Akelian' },
//   { src: '/assets/logos/logo_palm_springs.jpg', alt: 'Palm Springs' },
//   { src: '/assets/logos/logo_akelian.png', alt: 'Akelian' },
//   { src: '/assets/logos/b2b-connect-platform_old.png', alt: 'b2b-connect-platform' },
//   { src: '/assets/logos/logo_palm_springs.jpg', alt: 'Palm Springs' },
//   { src: '/assets/logos/logo_akelian.png', alt: 'AkeliBronzean' },
//   { src: '/assets/logos/logo_sneakers_brasil.png', alt: 'Sneakers Brasil' },
// ];

export default function MapaLayout({ children }) {
  const t = useTranslations('MapPage');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/public/contato', label: t('Contact') },
    { href: '/public/suporte', label: t('Support') },
    { href: '/public/sobre', label: t('About') },
    {
      href: 'https://calçadistabrasil.com.br',
      label: t('InternationalGallery'),
    },
  ];

  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header */}
      <header className='flex items-center justify-between bg-gray-900 px-6 py-4 text-white'>
        <div className='flex items-center justify-between w-full sm:w-auto'>
          <div className='flex items-center space-x-4'>
            <Link href='/public/mapa'>
              <Image
                src='/assets/logos/b2b-connect-platform-Logo.png'
                width={50}
                height={50}
                alt='b2b-connect-platform-Logo'
              />
            </Link>
            <h1 className='text-lg font-bold'>b2b-connect-platform</h1>
            <Loader />
          </div>
          <button
            className='sm:hidden p-2'
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`flex-col sm:flex-row sm:flex sm:items-center sm:justify-between w-full sm:w-auto mt-3 sm:mt-0 ${
            menuOpen ? 'flex' : 'hidden sm:flex'
          } gap-4`}
        >
          <nav className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center flex-1'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-white font-medium hover:text-blue-400 transition-colors duration-200'
                onClick={() => setMenuOpen(false)} // fecha menu ao clicar
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className='mt-2 sm:mt-0 flex items-center gap-4'>
            <LanguageSwitcher />
            <GradientButton text={t('Login')} href='/login' />
          </div>
        </div>
      </header>

      {/* Conteúdo da página */}
      <main className='flex-1'>{children}</main>

      <WhatsappButton />

      {/* Footer */}
      <footer className='bg-gray-900 px-6 py-4 text-sm text-white'>
        <div className='flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0'>
          <span>
            &copy; {new Date().getFullYear()} {t('Owner')}
          </span>
          <div className='flex space-x-4'>
            <Link href='/public/contato'>{t('Contact')}</Link>
            <Link href='/public/suporte'>{t('Support')}</Link>
            <Link href='/public/sobre'>{t('About')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
