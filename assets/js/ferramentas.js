/* ================================================================
   MARCUS ROLIM — CATÁLOGO DE FERRAMENTAS
   Para publicar uma nova ferramenta, adicione um objeto na lista
   FERRAMENTAS abaixo. Cada app roda na VPS em seu próprio subdomínio.

   Campos:
   - id        identificador único (usado no id do card)
   - nome      título exibido no card
   - descricao texto curto (até ~160 caracteres)
   - categoria 'gestao' | 'educacao' | 'tecnologia'
   - stack     tecnologias exibidas como tags
   - url       endereço do app (ex.: https://app1.marcusrolim.com.br)
   - status    'online' | 'beta' | 'em-breve'
   ================================================================ */

var FERRAMENTAS = [
  {
    id: 'exemplo',
    nome: 'Ferramenta de Exemplo',
    descricao: 'Aplicação de referência publicada na VPS para validar a infraestrutura: Docker, HTTPS automático e subdomínio próprio.',
    categoria: 'tecnologia',
    stack: ['Python', 'Flask', 'Docker'],
    url: 'https://exemplo.marcusrolim.com.br',
    status: 'em-breve'
  }
];

(function () {
  'use strict';

  var grid = document.getElementById('tools-grid');
  if (!grid) return;

  var STATUS_LABEL = { 'online': 'Online', 'beta': 'Beta', 'em-breve': 'Em breve' };
  var CATEGORIA_LABEL = { 'gestao': 'Gestão', 'educacao': 'Educação', 'tecnologia': 'Tecnologia' };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function criarCard(f, index) {
    var card = el('article', 'tool-card reveal-on-scroll');
    card.id = 'tool-' + f.id;
    card.setAttribute('data-categoria', f.categoria);

    var header = el('div', 'tool-card-header');
    header.appendChild(el('span', 'situation-num', String(index + 1).padStart(2, '0')));
    var status = el('span', 'tool-status tool-status--' + f.status, STATUS_LABEL[f.status] || f.status);
    header.appendChild(status);
    card.appendChild(header);

    card.appendChild(el('small', 'tool-category', CATEGORIA_LABEL[f.categoria] || f.categoria));
    card.appendChild(el('h2', 'situation-title', f.nome));
    card.appendChild(el('p', 'situation-desc', f.descricao));

    if (f.stack && f.stack.length) {
      var stack = el('ul', 'tool-stack');
      f.stack.forEach(function (s) { stack.appendChild(el('li', null, s)); });
      card.appendChild(stack);
    }

    var footer = el('div', 'tool-card-footer');
    if (f.status === 'em-breve') {
      footer.appendChild(el('span', 'btn-ghost tool-btn is-disabled', 'Em desenvolvimento'));
    } else {
      var link = el('a', 'btn-ghost tool-btn', 'Abrir ferramenta ↗');
      link.href = f.url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.id = 'open-' + f.id;
      footer.appendChild(link);
    }
    card.appendChild(footer);

    return card;
  }

  FERRAMENTAS.forEach(function (f, i) { grid.appendChild(criarCard(f, i)); });

  if (!FERRAMENTAS.length) {
    grid.appendChild(el('p', 'tools-empty', 'Novas ferramentas serão publicadas em breve.'));
  }

  // Filtro por categoria
  var botoes = document.querySelectorAll('.tools-filter-btn');
  botoes.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filtro = btn.getAttribute('data-filter');
      botoes.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      grid.querySelectorAll('.tool-card').forEach(function (card) {
        var visivel = filtro === 'todas' || card.getAttribute('data-categoria') === filtro;
        card.hidden = !visivel;
      });
    });
  });
})();
