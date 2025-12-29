// DOM Ready
document.addEventListener('DOMContentLoaded', function() {

    // ===== THEME TOGGLE =====
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeIcon = themeSwitcher.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // ===== MOBILE MENU TOGGLE & OUTSIDE CLICK =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navbar.contains(e.target) && 
            !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== CURRENT YEAR IN FOOTER =====
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ===== ENHANCED SCROLL ANIMATIONS =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right');
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Check if element is in viewport (with 100px offset)
            if (elementBottom >= windowTop + 100 && elementTop <= windowBottom - 100) {
                element.classList.add('animated');
            } else {
                // REMOVE CLASS WHEN SCROLLING AWAY (bidirectional)
                element.classList.remove('animated');
            }
        });
    };

    // Initial check and add scroll event listener
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // ===== WHATSAPP CONTACT FORM =====
    const whatsappForm = document.getElementById('whatsappContactForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('clientName').value;
            const email = document.getElementById('clientEmail').value;
            const project = document.getElementById('projectDetails').value;
            
            const message = `Hello AMSUCC Studio!%0A%0A*New Project Inquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A%0A*Project Details:*%0A${project}%0A%0AI'd like to discuss this further.`;
            const phoneNumber = '2347041169276';
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // ===== WHATSAPP WIDGET =====
    const whatsappButton = document.getElementById('whatsappWidgetButton');
    const whatsappChatBox = document.getElementById('whatsappChatBox');
    const closeChatBox = document.getElementById('closeChatBox');
    const sendWhatsAppBtn = document.getElementById('sendWhatsAppMessage');
    const whatsappMessageInput = document.getElementById('whatsappMessage');

    // Open/close chat box
    if (whatsappButton && whatsappChatBox) {
        whatsappButton.addEventListener('click', (e) => {
            e.stopPropagation();
            whatsappChatBox.classList.toggle('active');
            if (whatsappChatBox.classList.contains('active')) {
                whatsappMessageInput.focus();
            }
        });

        closeChatBox.addEventListener('click', () => {
            whatsappChatBox.classList.remove('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (whatsappChatBox.classList.contains('active') && 
                !whatsappChatBox.contains(e.target) && 
                !whatsappButton.contains(e.target)) {
                whatsappChatBox.classList.remove('active');
            }
        });

        // Send message functionality
        sendWhatsAppBtn.addEventListener('click', () => {
            const message = whatsappMessageInput.value.trim();
            if (message) {
                const phoneNumber = '2347041169276';
                const encodedMessage = encodeURIComponent(`Hello AMSUCC Studio! I have a question: ${message}`);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                
                window.open(whatsappUrl, '_blank');
                whatsappMessageInput.value = '';
                whatsappChatBox.classList.remove('active');
                
                // Add sent message to chat
                const chatBody = document.querySelector('.chat-body');
                const sentMessage = document.createElement('div');
                sentMessage.className = 'chat-message chat-message-sent';
                sentMessage.innerHTML = `<p>${message}</p>`;
                chatBody.appendChild(sentMessage);
                chatBody.scrollTop = chatBody.scrollHeight;
            } else {
                whatsappMessageInput.focus();
            }
        });

        // Send on Enter (Ctrl+Enter for new line)
        whatsappMessageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
                e.preventDefault();
                sendWhatsAppBtn.click();
            }
        });
    }

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // ===== CONSOLE GREETING =====
    console.log('%c👋 Hello! Thanks for checking out AMSUCC Studio.', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cPortfolio website crafted with precision.', 'color: #6b7280;');
});