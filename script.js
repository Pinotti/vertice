const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
const sections = [...document.querySelectorAll('main section[id]')];

document.getElementById('current-year').textContent = new Date().getFullYear();

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const willOpen = !navigation.classList.contains('open');
  navigation.classList.toggle('open', willOpen);
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
  document.body.classList.toggle('menu-open', willOpen);
});

navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 40);

  let current = 'inicio';
  for (const section of sections) {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  }
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });
updateHeader();
