import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from 'src/i18n/routing';
import { Toaster } from 'react-hot-toast';
import OnboardingProvider from 'components/onboarding/OnboardingProvider';
import './globals.css';

// Primary font - Body text
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Display font - Headings
const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

// Monospace font - Code, prices
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata = {
  title: 'b2b-connect-platform',
  description:
    'O maior hub do mercado calçadista global | The largest global footwear market hub',
  keywords: [
    'calçados',
    'footwear',
    'marketplace',
    'B2B',
    'shoes',
    'leather',
    'fornecedores',
  ],
  authors: [{ name: 'b2b-connect-platform' }],
  openGraph: {
    title: 'b2b-connect-platform',
    description: 'O maior hub do mercado calçadista global',
    type: 'website',
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className='font-sans antialiased bg-[var(--background)] text-[var(--foreground)]'>
        <NextIntlClientProvider locale={locale}>
          <OnboardingProvider>{children}</OnboardingProvider>
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                color: 'var(--color-gray-900)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '12px 16px',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: 'var(--color-accent-emerald)',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--color-accent-rose)',
                  secondary: 'white',
                },
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
