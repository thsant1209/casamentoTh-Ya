document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // CONTROLE DO BANNER FIXO
    // =============================================
    const fixedBanner = document.querySelector('.fixed-banner');
    const mainBanner = document.querySelector('.main-banner');
    
    function handleScroll() {
        // Mostrar banner fixo quando o usuário rolar para baixo do banner principal
        if (window.scrollY > mainBanner.offsetHeight - 100) {
            fixedBanner.classList.add('visible');
        } else {
            fixedBanner.classList.remove('visible');
        }
    }
    
    // =============================================
    // NAVEGAÇÃO SUAVE E MENU ATIVO
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Ajuste para altura do banner fixo
                    behavior: 'smooth'
                });
                
                // Adiciona classe ativa ao menu
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // =============================================
    // FORMULÁRIO DE CONFIRMAÇÃO DE PRESENÇA
    // =============================================
    const confirmacaoForm = document.getElementById('confirmacao-form');
    const confirmacaoSucesso = document.getElementById('confirmacao-sucesso');
    
    if (confirmacaoForm) {
        confirmacaoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            setTimeout(() => {
                confirmacaoForm.style.display = 'none';
                confirmacaoSucesso.style.display = 'block';
                
                // Rolagem suave para o topo da mensagem de sucesso
                window.scrollTo({
                    top: confirmacaoSucesso.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Resetar formulário (opcional)
                confirmacaoForm.reset();
            }, 1000);
        });
    }
    
    // =============================================
    // CARROSSEL DE FOTOS
    // =============================================
    const carrosselContainer = document.querySelector('.carrossel-container');
    const carrosselItems = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.carrossel-controle.prev');
    const nextBtn = document.querySelector('.carrossel-controle.next');
    let currentIndex = 0;
    
    function showSlide(index) {
        carrosselItems.forEach(item => item.classList.remove('active'));
        carrosselItems[index].classList.add('active');
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carrosselItems.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carrosselItems.length) % carrosselItems.length;
        showSlide(currentIndex);
    }
    
    // Event listeners para os botões
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Auto-play (opcional)
    let carrosselInterval = setInterval(nextSlide, 5000);
    
    // Pausar auto-play quando o mouse estiver sobre o carrossel
    const carrossel = document.querySelector('.carrossel');
    if (carrossel) {
        carrossel.addEventListener('mouseenter', () => {
            clearInterval(carrosselInterval);
        });
        
        carrossel.addEventListener('mouseleave', () => {
            carrosselInterval = setInterval(nextSlide, 5000);
        });
    }
 // =============================================
// MODAL DE PAGAMENTO (VERSÃO CORRIGIDA)
// =============================================
const modal = document.getElementById('modal-pagamento');
const btnPresentear = document.querySelectorAll('.btn-presentear');
const closeModal = document.querySelector('.close-modal');
const copiarChave = document.getElementById('copiar-chave');
const linkPagamento = document.getElementById('link-pagamento');

// Abrir modal ao clicar em "Presentear"
btnPresentear.forEach(btn => {
    btn.addEventListener('click', function() {
        const presente = this.getAttribute('data-presente');
        const valor = this.getAttribute('data-valor');
        const link = this.getAttribute('data-link');
        
        // Atualizar modal
        document.getElementById('modal-titulo').textContent = `Presentear com ${presente} - R$ ${valor}`;
        
        // Configurar link de pagamento
        linkPagamento.href = link;
        linkPagamento.onclick = function(e) {
            e.preventDefault(); // Previne o comportamento padrão
            window.open(link, '_blank'); // Abre em nova aba
            modal.style.display = 'none'; // Fecha o modal
            document.body.style.overflow = 'auto'; // Restaura scroll
        };
        
        // Mostrar modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

// Fechar modal
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fechar modal ao clicar fora
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Copiar chave PIX
copiarChave.addEventListener('click', function() {
    const chavePix = 'yasmin.thiago@casamento.com';
    navigator.clipboard.writeText(chavePix).then(() => {
        this.textContent = 'Copiado!';
        setTimeout(() => {
            this.textContent = 'Copiar Chave';
        }, 2000);
    });
});
    
    // =============================================
    // ANIMAÇÃO DE ELEMENTOS AO ROLAR
    // =============================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.secao').forEach(section => {
        observer.observe(section);
    });
    
    // =============================================
    // MENU ATIVO CONFORME ROLAGEM
    // =============================================
    window.addEventListener('scroll', function() {
        // Controle do banner fixo
        handleScroll();
        
        // Controle do menu ativo
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.secao').forEach(section => {
            const sectionTop = section.offsetTop - 160; // Ajuste para banner fixo
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // =============================================
    // RESPONSIVIDADE - TROCA DE IMAGEM DE FUNDO
    // =============================================
    function handleResponsiveImages() {
        const banner = document.querySelector('.main-banner');
        if (banner) {
            if (window.innerWidth <= 768) {
                banner.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('img/fotobuffet-mobile.jpg')";
            } else {
                banner.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('img/fotobuffet-desktop.jpg')";
            }
        }
    }
    
    window.addEventListener('resize', handleResponsiveImages);
    handleResponsiveImages(); // Executar ao carregar
});

// Adicione isso ao seu script.js
document.getElementById('confirmacao-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      convidados: document.getElementById('convidados').value,
      mensagem: document.getElementById('mensagem').value
    };
  
    try {
      // URL do seu Web App (substitua pelo seu URL real)
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbzci0bYDHsoGIbXj39POoZT1oRka-lMPg6tPTjqd50TPWR7K3SOjhbUxBiOy_BMdE_lcw/exec';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Adicione esta linha para contornar problemas CORS
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      // Mesmo com no-cors, você não terá acesso à resposta completa
      document.getElementById('confirmacao-form').style.display = 'none';
      document.getElementById('confirmacao-sucesso').style.display = 'block';
      
    } catch (error) {
      console.error('Erro detalhado:', error);
      alert('Houve um problema ao enviar. Por favor, tente novamente ou entre em contato conosco.');
    }
  });
  