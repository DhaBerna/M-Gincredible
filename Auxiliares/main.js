// Exibir ao carregar a página
window.onload = function() {
  document.getElementById("meuPopup").style.display = "flex";
};

// Função para fechar
function fecharPopup() {
  document.getElementById("meuPopup").style.display = "none";
}

// ============= VALIDAÇÃO DE NIF COM FEEDBACK VISUAL =============
class NIFValidator {
    constructor(inputSelector, buttonSelector) {
        this.input = document.querySelector(inputSelector);
        this.button = document.querySelector(buttonSelector);
        this.validNIF = '31072009';
        
        if (this.input) {
            this.input.addEventListener('input', (e) => this.validate(e));
            this.input.addEventListener('keypress', (e) => this.handleKeyPress(e));
        }
    }

    validate(event) {
        const value = this.input.value;
        
        if (value.length === 0) {
            this.resetState();
            return;
        }

        if (value === this.validNIF) {
            this.setSuccess(value);
        } else if (value.length === 8) {
            this.setError(value);
        } else {
            this.setValidating(value);
        }
    }

    setSuccess(value) {
        this.input.style.borderColor = '#48bb78';
        this.input.style.boxShadow = '0 0 0 3px rgba(72, 187, 120, 0.1)';
        this.input.style.color = '#48bb78';
        
        if (this.button) {
            this.button.classList.remove('btn-bloqueado');
            this.button.classList.add('btn-ativo');
        }

        this.showFeedback('success', '✓ Acesso autorizado!');
    }

    setError(value) {
        this.input.style.borderColor = '#f56565';
        this.input.style.boxShadow = '0 0 0 3px rgba(245, 101, 101, 0.1)';
        this.input.style.color = '#f56565';
        
        if (this.button) {
            this.button.classList.add('btn-bloqueado');
            this.button.classList.remove('btn-ativo');
        }

        this.showFeedback('error', '✗ Código inválido');
    }

    setValidating(value) {
        this.input.style.borderColor = '#ed8936';
        this.input.style.boxShadow = '0 0 0 3px rgba(237, 137, 54, 0.1)';
        this.input.style.color = '#1a202c';
        
        if (this.button) {
            this.button.classList.add('btn-bloqueado');
            this.button.classList.remove('btn-ativo');
        }
    }

    resetState() {
        this.input.style.borderColor = '#edf2f7';
        this.input.style.boxShadow = 'none';
        this.input.style.color = '#1a202c';
        
        if (this.button) {
            this.button.classList.add('btn-bloqueado');
            this.button.classList.remove('btn-ativo');
        }

        this.removeFeedback();
    }

    showFeedback(type, message) {
        this.removeFeedback();
        
        const feedback = document.createElement('div');
        feedback.className = `nif-feedback nif-feedback-${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            margin-top: 10px;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            animation: slideDown 0.3s ease;
            ${type === 'success' 
                ? 'background: rgba(72, 187, 120, 0.1); color: #22543d; border: 1px solid #9ae6b4;'
                : 'background: rgba(245, 101, 101, 0.1); color: #742a2a; border: 1px solid #fc8181;'
            }
        `;
        
        this.input.parentElement.appendChild(feedback);
    }

    removeFeedback() {
        const existing = this.input.parentElement.querySelector('.nif-feedback');
        if (existing) existing.remove();
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && this.button && this.button.classList.contains('btn-ativo')) {
            this.button.click();
        }
    }
}

// ============= PAGE TRANSITIONS =============
class PageTransition {
    constructor() {
        this.setupPageLoad();
    }

    setupPageLoad() {
        // Fade in animação ao carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.pageEnter());
        } else {
            this.pageEnter();
        }

        // Setup para links internos
        document.querySelectorAll('a').forEach(link => {
            if (!link.getAttribute('href').startsWith('http')) {
                link.addEventListener('click', (e) => this.handleLinkClick(e));
            }
        });
    }

    pageEnter() {
        document.body.style.animation = 'fadeIn 0.6s ease-in-out';
    }

    handleLinkClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (!href || href === '#') {
            e.preventDefault();
            return;
        }

        // Para links internos, adiciona transição suave
        if (!href.startsWith('http')) {
            e.preventDefault();
            this.pageExit(() => {
                window.location.href = href;
            });
        }
    }

    pageExit(callback) {
        const elements = document.querySelectorAll('main, .hotel-header, .header-catalogo');
        elements.forEach(el => {
            el.style.animation = 'fadeOut 0.4s ease-in-out forwards';
        });

        setTimeout(callback, 400);
    }
}

// ============= SCROLL ANIMATIONS =============
class ScrollAnimations {
    constructor() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar cards
        document.querySelectorAll('.card-produto').forEach(card => {
            card.classList.add('scroll-animate');
            observer.observe(card);
        });
    }
}

// ============= ANIMATIONS CSS INJECTION =============
function injectAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .scroll-animate {
            opacity: 0;
            animation: fadeIn 0.6s ease-in-out forwards;
        }

        .scroll-animate:nth-child(1) { animation-delay: 0.1s; }
        .scroll-animate:nth-child(2) { animation-delay: 0.2s; }
        .scroll-animate:nth-child(3) { animation-delay: 0.3s; }
        .scroll-animate:nth-child(4) { animation-delay: 0.4s; }
        .scroll-animate:nth-child(5) { animation-delay: 0.5s; }
    `;
    document.head.appendChild(style);
}

// ============= INICIALIZAÇÃO =============
document.addEventListener('DOMContentLoaded', () => {
    // Injetar animações
    injectAnimations();

    // Inicializar validador de NIF (se o elemento existir)
    const nifInput = document.querySelector('#nif-input');
    if (nifInput) {
        new NIFValidator('#nif-input', '#link-catalogo');
    }

    // Inicializar transições de página
    new PageTransition();

    // Inicializar animações de scroll
    new ScrollAnimations();

    // Ripple effect nos botões
    document.querySelectorAll('button, .botao-comprar, .btn-ativo, .btn-bloqueado, .botao-acomprar-grande').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('btn-bloqueado')) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;

            if (this.style.position !== 'relative') {
                this.style.position = 'relative';
            }
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Injetar animação ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// ============= SMOOTH SCROLL BEHAVIOR =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
