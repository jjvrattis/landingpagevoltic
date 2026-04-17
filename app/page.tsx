export const dynamic = 'force-dynamic';

import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import HorizontalScroll from '@/components/sections/HorizontalScroll';
import Diferenciais from '@/components/sections/Diferenciais';
import Precos from '@/components/sections/Precos';
import Calculadora from '@/components/sections/Calculadora';
import AreaAtuacao from '@/components/sections/AreaAtuacao';
import Plataformas from '@/components/sections/Plataformas';
import CTAFinal from '@/components/sections/CTAFinal';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HorizontalScroll />
        <Diferenciais />
        <Precos />
        <Calculadora />
        <AreaAtuacao />
        <Plataformas />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
