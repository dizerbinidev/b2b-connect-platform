// app/(dashboard)/lojista/suporte/page.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, LifeBuoy } from 'lucide-react';

const faqs = [
  {
    pergunta: 'Como redefinir minha senha?',
    resposta:
      'Você pode redefinir sua senha acessando a página de login e clicando em "Esqueci minha senha". Um link de recuperação será enviado para seu e-mail.',
  },
  {
    pergunta: 'Como entro em contato com o suporte?',
    resposta:
      'Através do botão de WhatsApp no rodapé do site ou enviando um e-mail para suporte@b2b-connect-platform.com.',
  },
  {
    pergunta: 'Onde acompanho meus pedidos?',
    resposta:
      'Se você é lojista, pode acessar o painel do dashboard e verificar todos os pedidos na seção "Meus Pedidos".',
  },
  {
    pergunta: 'Qual o tempo médio de resposta?',
    resposta:
      'Nossa equipe responde geralmente em até 24h úteis. Para casos urgentes, utilize o botão de WhatsApp no rodapé.',
  },
];

function FAQItem({ pergunta, resposta }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='border rounded-lg mb-3 overflow-hidden bg-white shadow-sm'>
      <button
        onClick={() => setOpen(!open)}
        className={`flex justify-between items-center w-full px-4 py-3 
        ${open ? 'bg-purple-600 text-white' : 'bg-gray-50 text-gray-800'} 
        hover:bg-purple-700 hover:text-white transition-colors`}
      >
        <span className='font-medium'>{pergunta}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden 
        ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className='px-4 py-3 text-gray-700 bg-gray-50 border-t'>
          {resposta}
        </div>
      </div>
    </div>
  );
}

export default function SuportePage() {
  return (
    <div className='flex flex-col'>
      {/* Faixa hero */}
      <div className='relative h-64 w-full overflow-hidden'>
        <img
          src='/assets/mapab2b-connect-platform.jpg'
          alt='Suporte'
          className='absolute inset-0 h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
          <h1 className='text-3xl sm:text-4xl font-bold text-white flex items-center gap-2'>
            <LifeBuoy size={32} /> Suporte ao Cliente
          </h1>
        </div>
      </div>

      {/* Sessão de FAQ */}
      <section className='max-w-3xl mx-auto py-12 px-4'>
        <h2 className='text-2xl font-semibold text-center mb-6'>
          Perguntas Frequentes
        </h2>
        <div>
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              pergunta={faq.pergunta}
              resposta={faq.resposta}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
