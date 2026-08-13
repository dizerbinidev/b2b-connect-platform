// app/sobre/page.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';

const depoimentos = [
  {
    nome: 'Julia Godoy',
    cargo: 'Representante Comercial',
    foto: '/assets/clientes/cliente1.png',
    texto:
      'A plataforma revolucionou nossa operação digital. Fácil de usar e com suporte incrível!',
  },
  {
    nome: 'Rubens Micael',
    cargo: 'Diretor de Vendas',
    foto: '/assets/clientes/cliente2.png',
    texto:
      'Conseguimos aumentar nossas vendas online em 40% após a integração com o sistema.',
  },
  {
    nome: 'Diego Handa',
    cargo: 'Gestor de Marketing',
    foto: '/assets/clientes/cliente3.png',
    texto:
      'A experiência é fluida, desde o cadastro de produtos até o atendimento ao cliente.',
  },
];

export default function SobrePage() {
  return (
    <div className='flex flex-col'>
      {/* Hero */}
      <section className='relative h-80 flex items-center justify-center text-center text-white'>
        <Image
          src='/assets/mapashoesnetworld.jpg'
          alt='Sobre nós'
          fill
          className='object-cover brightness-50'
        />
        <div className='relative z-10 max-w-2xl px-4'>
          <h1 className='text-4xl font-bold mb-3'>b2b-connect-platform</h1>
          <p className='text-lg text-gray-200'>
            Conectamos fornecedores, lojistas e representantes em uma plataforma
            única e moderna.
          </p>
        </div>
      </section>

      {/* Missão / Valores */}
      <section className='py-12 px-6 bg-gray-50'>
        <div className='max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center'>
          <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition'>
            <h3 className='text-xl font-semibold mb-2'>Nossa Missão</h3>
            <p className='text-gray-600'>
              Conectar o mercado global do setor calçadista por meio de uma
              plataforma digital completa, promovendo oportunidades de negócios
              entre fabricantes, distribuidores, lojistas, importadores e
              prestadores de serviços em todo o mundo.
            </p>
          </div>
          <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition'>
            <h3 className='text-xl font-semibold mb-2'>Nossos Valores</h3>
            <p className='text-gray-600'>
              <br />
              <strong>Inovação</strong>
              <br />
              <br />
              <strong>Transparência</strong>
              <br />
              <br />
              <strong>Valorização do setor</strong>
            </p>
          </div>
          <div className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition'>
            <h3 className='text-xl font-semibold mb-2'>Nosso Objetivo</h3>
            <p className='text-gray-600'>
              Ser a principal plataforma digital internacional voltada ao
              comércio global de calçados, acessórios, componentes, couros,
              máquinas e serviços.
            </p>
          </div>
        </div>
        <br />
        <div className='max-w-5xl mx-auto text-center mb-10'>
          <h2 className='text-3xl font-bold mb-3'>Quem somos?</h2>
          <p className='text-gray-600'>
            b2b-connect-platform é uma plataforma digital internacional voltada
            ao comércio global de calçados, acessórios, componentes, couros,
            máquinas e serviços do setor calçadista.
            <br />
            Com base no Brasil e uma rede de empresas parceiras da América
            Latina, Europa e Ásia, oferecemos um ecossistema completo para
            importadores, distribuidores, lojistas, fabricantes e representantes
            comerciais.
          </p>
        </div>
      </section>

      {/* Depoimentos */}
      <section className='py-16 px-6 bg-white'>
        <div className='max-w-5xl mx-auto text-center mb-10'>
          <h2 className='text-3xl font-bold mb-3'>
            O que nossos clientes dizem
          </h2>
          <p className='text-gray-600'>
            Feedback real de quem já utiliza a plataforma no dia a dia.
          </p>
        </div>

        <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-6'>
          {depoimentos.map((dep, idx) => (
            <div
              key={idx}
              className='bg-gray-50 rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center'
            >
              <Image
                src={dep.foto}
                alt={dep.nome}
                width={80}
                height={80}
                className='rounded-full mb-4 object-cover'
              />
              <p className='text-gray-700 italic mb-4'>“{dep.texto}”</p>
              <span className='font-semibold'>{dep.nome}</span>
              <span className='text-sm text-gray-500'>{dep.cargo}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
