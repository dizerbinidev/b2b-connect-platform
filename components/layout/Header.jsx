'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import LanguageSwitcher from 'components/shared/LanguageSwitcher';
import Avatar from 'components/ui/Avatar';

/**
 * Header Component - Premium Design
 *
 * Features:
 * - Glass effect background
 * - User dropdown menu
 * - Notifications badge
 * - Search bar (optional)
 * - Breadcrumbs
 */

export default function Header({
  user,
  showSearch = false,
  onLogout,
  className = '',
}) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header
      className={`
        sticky top-0 z-30
        bg-white/80 backdrop-blur-md
        border-b border-[var(--color-gray-200)]
        px-6 py-3
        ${className}
      `}
    >
      <div className='flex items-center justify-between'>
        {/* Left side - Logo and search */}
        <div className='flex items-center gap-6'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center gap-3 hover:opacity-80 transition-opacity'
          >
            <Image
              src='/assets/logos/b2b-connect-platform.png'
              width={40}
              height={40}
              alt='b2b-connect-platform'
              className='rounded-lg'
            />
            <span className='font-heading font-bold text-lg text-[var(--color-gray-900)] hidden sm:block'>
              b2b-connect-platform
            </span>
          </Link>

          {/* Search bar */}
          {showSearch && (
            <div className='hidden md:flex items-center'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gray-400)]' />
                <input
                  type='text'
                  placeholder='Buscar...'
                  className='
                    w-64 pl-10 pr-4 py-2
                    text-sm
                    bg-[var(--color-gray-100)]
                    border border-transparent
                    rounded-[var(--radius-lg)]
                    placeholder:text-[var(--color-gray-400)]
                    focus:outline-none focus:bg-white focus:border-[var(--color-primary-300)]
                    transition-all
                  '
                />
              </div>
            </div>
          )}
        </div>

        {/* Right side - Actions */}
        <div className='flex items-center gap-3'>
          {/* Notifications */}
          <button
            className='
            relative p-2
            rounded-[var(--radius-lg)]
            text-[var(--color-gray-500)]
            hover:bg-[var(--color-gray-100)]
            transition-colors
          '
          >
            <Bell size={20} />
            {/* Notification badge */}
            <span
              className='
              absolute top-1 right-1
              w-2 h-2
              bg-[var(--color-accent-rose)]
              rounded-full
            '
            />
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* User Menu */}
          <div className='relative' ref={menuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className='
                flex items-center gap-2 p-1.5
                rounded-[var(--radius-lg)]
                hover:bg-[var(--color-gray-100)]
                transition-colors
              '
            >
              <Avatar name={user?.nome || 'User'} size='sm' status='online' />
              <span className='hidden sm:block text-sm font-medium text-[var(--color-gray-700)]'>
                {user?.nome?.split(' ')[0] || 'Usuário'}
              </span>
              <ChevronDown
                size={16}
                className={`
                  text-[var(--color-gray-400)]
                  transition-transform
                  ${userMenuOpen ? 'rotate-180' : ''}
                `}
              />
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div
                className='
                absolute right-0 mt-2
                w-56
                bg-white
                rounded-[var(--radius-xl)]
                shadow-[var(--shadow-lg)]
                border border-[var(--color-gray-100)]
                py-2
                animate-fade-in-down
              '
              >
                {/* User info */}
                <div className='px-4 py-3 border-b border-[var(--color-gray-100)]'>
                  <p className='font-semibold text-[var(--color-gray-900)]'>
                    {user?.nome || 'Usuário'}
                  </p>
                  <p className='text-sm text-[var(--color-gray-500)]'>
                    {user?.email || 'email@exemplo.com'}
                  </p>
                </div>

                {/* Menu items */}
                <div className='py-1'>
                  <Link
                    href='/perfil'
                    className='
                      flex items-center gap-3 px-4 py-2
                      text-sm text-[var(--color-gray-700)]
                      hover:bg-[var(--color-gray-50)]
                      transition-colors
                    '
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <User size={16} />
                    Meu Perfil
                  </Link>
                  <Link
                    href='/configuracoes'
                    className='
                      flex items-center gap-3 px-4 py-2
                      text-sm text-[var(--color-gray-700)]
                      hover:bg-[var(--color-gray-50)]
                      transition-colors
                    '
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <Settings size={16} />
                    Configurações
                  </Link>
                </div>

                {/* Logout */}
                <div className='border-t border-[var(--color-gray-100)] pt-1 mt-1'>
                  <button
                    onClick={handleLogout}
                    className='
                      flex items-center gap-3 w-full px-4 py-2
                      text-sm text-[var(--color-accent-rose)]
                      hover:bg-[var(--color-error-bg)]
                      transition-colors
                    '
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
