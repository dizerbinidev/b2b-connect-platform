'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LogoutButton from 'components/ui/auth/LogoutButton';
import WhatsappButton from 'components/shared/WhatsappButton';
import Carousel from 'components/shared/Carousel';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Loader from 'components/shared/Loader';
import LanguageSwitcher from 'components/shared/LanguageSwitcher';

export default function DashboardLayout({ children }) {
  const t = useTranslations('DashboardLojista');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/dashboard/lojista', label: t('Home') },
    { href: '/dashboard/lojista/vitrines/principal', label: t('Search') },
    { href: '/dashboard/lojista/mensagens', label: t('Messages') },
    {
      href: 'https://calçadistabrasil.com.br',
      label: t('InternationalGallery'),
    },
  ];

  const produtos = [
    {
      nome: 'Palm Springs',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/catalogos/8c32b935-4770-41bb-aebe-9b90b05c0d07',
      imagemUrl: '/assets/destaques/palm_springs.png',
    },
    {
      nome: 'Sneaker Bota',
      status: t('Available'),
      rating: 5,
      criadoEm: '2025-09-30T15:49:17Z',
      link: '/dashboard/lojista/vitrines/catalogos/f4e9d37b-9461-43f1-86d6-ad8d3aa9a011',
      imagemUrl: '/assets/destaques/Bott.png',
    },
    {
      nome: 'Sneaker Brasil',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/catalogos/8378af3c-9252-4c98-816a-4559b64ddec2',
      imagemUrl: '/assets/destaques/Sneaker_Preto_Destaque.png',
    },
    {
      nome: 'Micassim',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/catalogos/754e12ed-2b35-4145-9ced-ad769106ca27',
      imagemUrl: '/assets/destaques/hoje_2.png',
    },
    {
      nome: 'Arakelian',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/principal',
      imagemUrl: '/assets/destaques/Calçado.png',
    },
    {
      nome: 'Sneaker Brasil',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/catalogos/8378af3c-9252-4c98-816a-4559b64ddec2',
      imagemUrl: '/assets/destaques/PC_001_Destaque.png',
    },
    {
      nome: 'Chinelos',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/principal',
      imagemUrl: '/assets/destaques/Chinelo_destaque.png',
    },
    {
      nome: 'Full Sneaker',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/principal',
      imagemUrl: '/assets/destaques/full_sneaker.png',
    },
    {
      nome: 'Arakelian',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/principal',
      imagemUrl: '/assets/destaques/Arakelian.png',
    },
    {
      nome: 'Sneaker Brasil',
      status: t('Available'),
      rating: 5,
      criadoEm: '',
      link: '/dashboard/lojista/vitrines/catalogos/8378af3c-9252-4c98-816a-4559b64ddec2',
      imagemUrl: '/assets/destaques/Sneaker_Branco_Destaque.png',
    },
  ];
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Header */}
      <header className='bg-gray-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center justify-between w-full sm:w-auto'>
          <div className='flex items-center space-x-4'>
            <Image
              src='/assets/logos/b2b-connect-platform-Logo.png'
              width={50}
              height={50}
              alt='b2b-connect-platform-logo'
            />
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
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className='flex-1 p-2 sm:py-1 sm:px-6 my-auto justify-items-center'>
        {children}
      </main>

      {/* Seção de cards */}
      <Carousel items={produtos} />

      {/* Whatsapp flutuante */}
      <WhatsappButton />

      {/* Footer */}
      <footer className='bg-gray-900 px-6 py-4 text-sm text-white'>
        <div className='flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0'>
          <span>&copy; {new Date().getFullYear()} b2b-connect-platform</span>
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
