// =========================================================
// THAÍS PEREIRA CAMPOS — Design de Sobrancelhas — script.js
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Menu mobile ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* ---- Marca link ativo no menu conforme a página atual ---- */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  /* ---- Animação de entrada do arco dourado (assinatura visual) ---- */
  const arcs = document.querySelectorAll('.arc');
  if ('IntersectionObserver' in window && arcs.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    arcs.forEach(el => io.observe(el));
  } else {
    arcs.forEach(el => el.classList.add('in-view'));
  }

  /* ---- Formulário de agendamento -> monta mensagem e abre WhatsApp ---- */
  const form = document.getElementById('booking-form');
  if (form) {
    const msgBox = document.getElementById('form-msg');
    const PHONE = '5583988288770'; // (83) 98828-8770

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome    = document.getElementById('nome').value.trim();
      const telefone= document.getElementById('telefone').value.trim();
      const servico = document.getElementById('servico').value;
      const data    = document.getElementById('data').value;
      const horario = document.getElementById('horario').value;
      const obs     = document.getElementById('obs').value.trim();

      if (!nome || !telefone || !servico || !data || !horario) {
        msgBox.textContent = 'Por favor, preencha todos os campos obrigatórios antes de enviar.';
        msgBox.classList.add('show');
        return;
      }

      const dataFormatada = new Date(data + 'T00:00:00').toLocaleDateString('pt-BR');

      const texto =
`Olá, Thaís! Gostaria de marcar um horário. 💛

Nome: ${nome}
Telefone: ${telefone}
Serviço: ${servico}
Data desejada: ${dataFormatada}
Horário preferido: ${horario}
${obs ? 'Observações: ' + obs : ''}`;

      const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(texto)}`;

      msgBox.textContent = 'Tudo certo! Abrindo o WhatsApp para confirmar seu horário com a Thaís...';
      msgBox.classList.add('show');

      window.open(url, '_blank');
      form.reset();
    });
  }

  /* ---- Ano no rodapé ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
