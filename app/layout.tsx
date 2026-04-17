import type { Metadata } from 'next';
import { Inter, Rajdhani } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Voltic — Logística Same Day · São Paulo & Região Metropolitana',
  description:
    'O cliente compra de manhã e recebe ainda hoje. Coleta nos polos, entrega same day em toda SP e região metropolitana. R$ 11,50 por pacote no Mercado Livre.',
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'Voltic — Logística Same Day',
    description: 'Coleta nos polos. Entrega hoje. R$ 11,50 por pacote.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#06040F" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${rajdhani.variable} font-body grain`}>
        {children}
      </body>
    </html>
  );
}
