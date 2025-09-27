
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

        // Hide/show navbar on scroll with floating effect
        if (window.scrollY > lastScrollY && window.scrollY > 200) {
            navbar.style.transform = 'translateX(-50%) translateY(-120%)';
            navbar.style.opacity = '0.8';
        } else {
            if (window.scrollY > 100) {
                navbar.style.transform = 'translateX(-50%) translateY(-5px)';
            } else {
                navbar.style.transform = 'translateX(-50%)';
            }
            navbar.style.opacity = '1';
            }
            lastScrollY = window.scrollY;
        });
    }

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Timeline Interactive Effects
    const timelinePoints = document.querySelectorAll('.timeline-point-vertical');
    const timelineProgress = document.getElementById('timelineProgressVertical');

    timelinePoints.forEach((point, index) => {
        point.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'timeline-tooltip';
            tooltip.innerHTML = `
                <strong>${point.dataset.location}</strong>
                <span>${point.dataset.day}</span>
            `;
            tooltip.style.cssText = `
                position: absolute;
                top: -60px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.8rem;
                white-space: nowrap;
                z-index: 100;
                pointer-events: none;
            `;
            point.appendChild(tooltip);

            // Animate timeline progress
            if (timelineProgress) {
                const progressWidth = ((index + 1) / timelinePoints.length) * 100;
                timelineProgress.style.width = progressWidth + '%';
            }
        });

        point.addEventListener('mouseleave', () => {
            const tooltip = point.querySelector('.timeline-tooltip');
            if (tooltip) tooltip.remove();

            // Reset progress to active point (index 5 = Ella)
            if (timelineProgress) {
                timelineProgress.style.width = '62.5%';
            }
        });

        point.addEventListener('click', () => {
            timelinePoints.forEach(p => p.classList.remove('active-point'));
            point.classList.add('active-point');
            updateDestinationCard(point.dataset.location);
        });
    });

    // View Toggle for Journey Grid
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const journeyGrid = document.getElementById('journeyGrid');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view;
            if (view === 'list') {
                journeyGrid.style.gridTemplateColumns = '1fr';
                journeyGrid.style.gap = '1rem';
            } else {
                journeyGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
                journeyGrid.style.gap = '1.5rem';
            }
        });
    });

    // Journey Items Interactive Effects
    const journeyItems = document.querySelectorAll('.journey-item');

    journeyItems.forEach(item => {
        item.addEventListener('click', () => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(102, 126, 234, 0.3);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
            `;

            item.style.position = 'relative';
            item.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });

        // Parallax effect on scroll
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.02)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section, .journey-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Action buttons functionality
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            

            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);

       
            showNotification('Action completed!');
        });
    });

    // Image indicators functionality
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            indicators.forEach(ind => ind.classList.remove('active'));
            indicator.classList.add('active');
            
        
            showNotification(`Viewing image ${index + 1}`);
        });
    });


    // Date tabs 
    const dateTabs = document.querySelectorAll('.date-tab');
    const pricingHeading = document.getElementById('pricingHeading');
    const pricingTableBody = document.querySelector('.pricing-table tbody');

    
    const pricingData = {
        '1st Aug - 31st October, 2025': [
            ['8','HighRoof Van','44000','66600','83600'],
            ['7','HighRoof Van','45600','68200','85200'],
            ['6','HighRoof Van','47700','70300','87300'],
            ['5','Flatroof Van','48100','70700','87700'],
            ['4','Flatroof Van','51900','74500','91500'],
            ['3','Large Comfortable Car/ Flat Roof Van','55700','78400','95300'],
            ['2','Large Comfortable Car','66500','89100','106100']
        ],
        '1st Nov - 20th December 2025': [
            ['8','HighRoof Van','46000','69000','87000'],
            ['7','HighRoof Van','47600','70600','88600'],
            ['6','HighRoof Van','49700','72700','90700'],
            ['5','Flatroof Van','50100','73100','91100'],
            ['4','Flatroof Van','53900','76900','94900'],
            ['3','Large Comfortable Car/ Flat Roof Van','57700','80800','98700'],
            ['2','Large Comfortable Car','68500','91500','110500']
        ],
        '20th Dec 2025 - 10th Jan 2026': [
            ['8','HighRoof Van','52000','78000','98000'],
            ['7','HighRoof Van','53600','79600','99600'],
            ['6','HighRoof Van','55700','81700','101700'],
            ['5','Flatroof Van','56100','82100','102100'],
            ['4','Flatroof Van','59900','85900','105900'],
            ['3','Large Comfortable Car/ Flat Roof Van','63700','89800','109700'],
            ['2','Large Comfortable Car','74500','100500','121500']
        ],
        '11th Jan - Feb 28, 2026': [
            ['8','HighRoof Van','45000','67500','85000'],
            ['7','HighRoof Van','46600','69100','86600'],
            ['6','HighRoof Van','48700','71200','88700'],
            ['5','Flatroof Van','49100','71600','89100'],
            ['4','Flatroof Van','52900','75400','92900'],
            ['3','Large Comfortable Car/ Flat Roof Van','56700','79300','96700'],
            ['2','Large Comfortable Car','67500','90000','106000']
        ],
        '1st March - 31st March 2026': [
            ['8','HighRoof Van','43000','64500','81000'],
            ['7','HighRoof Van','44600','66100','82600'],
            ['6','HighRoof Van','46700','68200','84700'],
            ['5','Flatroof Van','47100','68600','85100'],
            ['4','Flatroof Van','50900','72400','88900'],
            ['3','Large Comfortable Car/ Flat Roof Van','54700','76300','92700'],
            ['2','Large Comfortable Car','65500','87000','103000']
        ]
    };

    function formatNumber(n) {
        return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function renderPricingTable(rows) {
        if (!pricingTableBody) return;
        pricingTableBody.style.opacity = '0';
        setTimeout(() => {
            pricingTableBody.innerHTML = rows.map(r => `
                <tr>
                    <td data-label="Group size">${r[0]}</td>
                    <td data-label="Vehicle">${r[1]}</td>
                    <td data-label="Economy" class="text-right">${formatNumber(r[2])}</td>
                    <td data-label="Premium" class="text-right">${formatNumber(r[3])}</td>
                    <td data-label="Premium Luxury" class="text-right">${formatNumber(r[4])}</td>
                </tr>
            `).join('');
            pricingTableBody.style.opacity = '1';
        }, 180);
    }

    // Wire tabs and initial render
    dateTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dateTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const range = tab.dataset.range;
            if (pricingHeading) pricingHeading.textContent = `Ramayana Trail Sri Lanka Prices (${range})`;

            const rows = pricingData[range];
            if (rows) {
                renderPricingTable(rows);
            } else {
                const firstKey = Object.keys(pricingData)[0];
                renderPricingTable(pricingData[firstKey]);
            }
        });
    });

    // Initial render based on active tab 
    (function initialPricingRender() {
        const active = document.querySelector('.date-tab.active');
        const range = active ? active.dataset.range : Object.keys(pricingData)[0];
        const rows = pricingData[range] || pricingData[Object.keys(pricingData)[0]];
        renderPricingTable(rows);
    })();
    document.querySelectorAll('.book-now-btn, .cta-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                showNotification('Booking form would open here!');
            }, 2000);
        });
    });

    // Utility Functions
    function updateDestinationCard(location) {
        const destinations = {
            'Airport': {
                name: 'Bandaranaike International Airport',
                tagline: 'Gateway to Sacred Lanka',
                description: 'Your spiritual journey begins here. Welcome to the pearl of the Indian Ocean.',
                image:'image/airport.jpg'
            },
            'Chilaw': {
                name: 'Chilaw',
                tagline: 'Coastal Temple Town',
                description: 'Visit the ancient Manawari Temple and experience the coastal spiritual heritage.',
                image:'image/chillaw.jpg'
            },
            'Dambulla': {
                name: 'Dambulla',
                tagline: 'Land of Ancient Cave Temples',
                description: 'Dambulla is known for its ancient cave temples and cultural heritage. It lies on the path believed to be taken by Ravana while moving Sita.',
                image:'image/dumbulla.jpg'
            },
             'Trincomalee': {
                name: 'Tricomalee',
                tagline: 'Harbor City of Devotion',
                description: 'Trincomalee is a port city with a natural harbor. It hosts the Koneswaram Temple, which is connected to Ravana’s devotion to Lord Shiva..',
                image:'image/trinco.jpg'
            },
             'Nuwara Eliya': {
                name: 'Nuwara Eliya',
                tagline: 'Hill Country Sanctuary of Sita',
                description: 'This hill station is home to the sacred Sita Eliya Temple and Ashok Vatika - where Sita was held captive by Ravana.',
                image:'image/neliya.jpg'  
            },
            'Ella': {
                name: 'Ella',
                tagline: 'Mountain Town of Ravana\'s Cave',
                description: 'Nestled in the misty mountains, Ella offers breathtaking panoramic views and houses the legendary Ravana\'s Cave.',
                image:'image/ella.jpg'
            },
             'Colombo': {
                name: 'Colombo',
                tagline: 'Modern Capital with Ancient Echoes',
                description: 'Colombo, Sri Lanka’s bustling capital, offers a modern contrast to the ancient legends along the Ramayana Trail.',
                image:'image/colombo.jpg'
            },
           
        };

        const dest = destinations[location];
        if (dest) {
            document.querySelector('.destination-name').textContent = dest.name;
            document.querySelector('.destination-tagline').textContent = dest.tagline;
            document.querySelector('.destination-description').textContent = dest.description;
            
        
            const destinationImageDiv = document.querySelector('.destination-image');
            if (destinationImageDiv && dest.image) {
           
                let imgElement = destinationImageDiv.querySelector('img');
                if (!imgElement) {
                    imgElement = document.createElement('img');
                    imgElement.alt = dest.name;
                    imgElement.style.width = '100%';
                    imgElement.style.height = '200px';
                    imgElement.style.objectFit = 'cover';
                    imgElement.style.borderRadius = '12px';
                    destinationImageDiv.insertBefore(imgElement, destinationImageDiv.firstChild);
                }
                imgElement.src = dest.image;
            }
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            @keyframes ripple {
                to {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

document.querySelectorAll(".faq h3").forEach(faqHeader => {
  faqHeader.addEventListener("click", () => {
    const content = faqHeader.nextElementSibling;
    content.classList.toggle("active");

    if (content.classList.contains("active")) {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  });
});

document.querySelectorAll(".day-card").forEach(card => {
  const header = card.querySelector(".day-header");
  const content = card.querySelector(".day-content");
  const toggleBtn = card.querySelector(".toggle-btn");

  header.addEventListener("click", () => {
    content.style.display = content.style.display === "block" ? "none" : "block";
    toggleBtn.style.transform = content.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
  });
});

        // Observe all elements with animate-on-scroll class for animations
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animateObserver.observe(el);
        });

        // Add click handlers for excursion cards
        document.querySelectorAll('.excursion-card').forEach((card, index) => {
            card.addEventListener('click', () => {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(102, 126, 234, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: 100px;
                    height: 100px;
                    left: 50%;
                    top: 50%;
                    margin-left: -50px;
                    margin-top: -50px;
                `;
                
                card.style.position = 'relative';
                card.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
                
                // Simulate navigation
                console.log(`Navigating to Trail ${index + 1}`);
            });
        });

        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Add hover sound effect (optional)
        document.querySelectorAll('.excursion-card, .feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });
        });

        // Parallax effect for floating shapes
        window.addEventListener('mousemove', (e) => {
            const shapes = document.querySelectorAll('.floating-shape');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                shape.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
            });
        });

        // Button interactions
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Add loading effect
                const originalText = button.textContent;
                button.textContent = 'Loading...';
                button.style.opacity = '0.7';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.opacity = '1';
                    
                    // Show success feedback
                    const success = document.createElement('div');
                    success.textContent = '✓ Redirecting...';
                    success.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: linear-gradient(135deg, #10b981, #059669);
                        color: white;
                        padding: 1rem 1.5rem;
                        border-radius: 10px;
                        z-index: 1000;
                        animation: slideInRight 0.5s ease-out;
                    `;
                    
                    document.body.appendChild(success);
                    setTimeout(() => success.remove(), 2000);
                }, 1000);
            });
        });

        // Add slide-in animation for success message
        const successStyle = document.createElement('style');
        successStyle.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(successStyle);

    // Excursion Cards Interaction
    const excursionCards = document.querySelectorAll('.excursion-card');
    
    excursionCards.forEach((card, index) => {
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            card.appendChild(ripple);
            
            // Add click feedback
            card.style.transform = 'translateY(-12px) scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
            
            // Handle navigation based on card type
            const cardTitle = card.querySelector('.card-title').textContent;
            handleCardClick(cardTitle, index + 1);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg) rotateY(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Handle card click actions
    function handleCardClick(cardTitle, cardNumber) {
        // Show loading overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(102, 126, 234, 0.9);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const loadingContent = document.createElement('div');
        loadingContent.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="width: 60px; height: 60px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <h3 style="margin: 0 0 10px 0; font-size: 1.5rem;">Loading ${cardTitle}</h3>
                <p style="margin: 0; opacity: 0.8;">Preparing your sacred journey...</p>
            </div>
        `;
        
        overlay.appendChild(loadingContent);
        document.body.appendChild(overlay);
        
        // Simulate navigation after loading
        setTimeout(() => {
            overlay.remove();
            
            // Show success message
            const success = document.createElement('div');
            success.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.2rem;">✓</span>
                    <span>Redirecting to ${cardTitle}...</span>
                </div>
            `;
            success.style.cssText = `
                position: fixed;
                top: 30px;
                right: 30px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                z-index: 10000;
                animation: slideInRight 0.5s ease-out;
                backdrop-filter: blur(10px);
            `;
            
            document.body.appendChild(success);
            setTimeout(() => success.remove(), 3000);
            
            console.log(`Navigating to Trail ${cardNumber}: ${cardTitle}`);
        }, 2000);
    }
    
    // Add ripple animation keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Section Button Interaction
    const sectionCtaButton = document.querySelector('.section-cta .cta-button.large');
    if (sectionCtaButton) {
        sectionCtaButton.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Preparing Journey...';
            this.style.opacity = '0.8';
            
            // Create booking modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            `;
            
            modal.innerHTML = `
                <div style="
                    background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9));
                    backdrop-filter: blur(20px);
                    padding: 2rem;
                    border-radius: 24px;
                    max-width: 400px;
                    text-align: center;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
                    animation: modalSlideIn 0.4s ease-out;
                ">
                    <div style="margin-bottom: 1.5rem;">
                        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; animation: pulse 2s infinite;">
                            <span style="font-size: 1.5rem;">🚕</span>
                        </div>
                        <h3 style="margin: 0 0 0.5rem 0; color: #1e293b;">Booking Your Journey</h3>
                        <p style="margin: 0; color: #64748b;">Connecting you with our sacred travel experts...</p>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button onclick="this.closest('.modal-overlay').remove(); document.querySelector('.section-cta .cta-button.large').textContent = '${originalText}'; document.querySelector('.section-cta .cta-button.large').style.opacity = '1';" style="background: #64748b; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 20px; cursor: pointer;">Cancel</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            setTimeout(() => {
                modal.remove();
                this.textContent = originalText;
                this.style.opacity = '1';
                
                // Show success message
                const success = document.createElement('div');
                success.innerHTML = `
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.2rem;">✓</span>
                        <span>Redirecting to booking page...</span>
                    </div>
                `;
                success.style.cssText = `
                    position: fixed;
                    top: 30px;
                    right: 30px;
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                    z-index: 10000;
                    animation: slideInRight 0.5s ease-out;
                    backdrop-filter: blur(10px);
                `;
                
                document.body.appendChild(success);
                setTimeout(() => success.remove(), 3000);
            }, 3000);
        });
    }

    // Enhanced card animations with stagger effect
    const cardObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                }, index * 100);
            }
        });
    }, cardObserverOptions);

    // Observe excursion cards for enhanced animations
    document.querySelectorAll('.excursion-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(15deg)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        cardObserver.observe(card);
    });

    // Add modal animations
    if (!document.querySelector('#modal-styles')) {
        const modalStyle = document.createElement('style');
        modalStyle.id = 'modal-styles';
        modalStyle.textContent = `
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(modalStyle);
    }

    // Scroll to top functionality
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add ripple effect to social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: 20px;
                height: 20px;
                left: 50%;
                top: 50%;
                margin-left: -10px;
                margin-top: -10px;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Enhanced hover effects for payment methods
    document.querySelectorAll('.payment-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click feedback to navigation links
    document.querySelectorAll('.footer .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });

    // Contact info click actions
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent;
            if (text.includes('Hotline') || text.includes('WhatsApp')) {
                // Simulate phone call action
                console.log('Initiating call...');
            } else if (text.includes('hello@lesstaxi.com')) {
                // Simulate email action
                console.log('Opening email client...');
            }
            
            // Visual feedback
            this.style.color = '#fbbf24';
            setTimeout(() => {
                this.style.color = 'rgba(255, 255, 255, 0.9)';
            }, 300);
        });
    });

    const brandLogo = document.querySelector('.brand-logo');
    let isFloating = false;

    if (brandLogo) {
        setInterval(() => {
            if (!isFloating && Math.random() < 0.3) {
                isFloating = true;
                brandLogo.classList.add('pulse-animation');
                setTimeout(() => {
                    brandLogo.classList.remove('pulse-animation');
                    isFloating = false;
                }, 2000);
            }
        }, 5000);
    }

    // Intersection Observer for footer animations
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe footer elements
    document.querySelectorAll('.footer-brand, .social-links, .payment-methods').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        footerObserver.observe(el);
    });

    if (!document.querySelector('#footer-ripple-styles')) {
        const footerRippleStyle = document.createElement('style');
        footerRippleStyle.id = 'footer-ripple-styles';
        footerRippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(footerRippleStyle);
    }

    //Promo Section Interactive Effects
    const promoCTAButton = document.querySelector('.promo-cta-button');
    if (promoCTAButton) {
        promoCTAButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.8s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 800);
            
            // Simulate booking action
            console.log('Redirecting to WhatsApp booking with RAMAYANAEARLYBIRD promo code...');
        });

        promoCTAButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        promoCTAButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Add entrance animation to promo section
    const promoSection = document.querySelector('.modern-promo-section');
    if (promoSection) {
        const promoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    const childElements = entry.target.querySelectorAll('.promo-main-title, .promo-highlight-title, .promo-description, .promo-sub-text, .promo-cta-button');
                    childElements.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.2 });

        promoSection.style.opacity = '0';
        promoSection.style.transform = 'translateY(50px)';
        promoSection.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        const childElements = promoSection.querySelectorAll('.promo-main-title, .promo-highlight-title, .promo-description, .promo-sub-text, .promo-cta-button');
        childElements.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'all 0.6s ease';
        });

        promoObserver.observe(promoSection);
    }

    document.querySelectorAll('.hero-cta-primary, .hero-cta-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            
          
            if (this.classList.contains('hero-cta-primary')) {
                document.querySelector('.main-container')?.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });

    // Hero stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const heroStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                if (finalValue.includes('K+')) {
                    const finalNum = parseInt(finalValue.replace('K+', ''));
                    let currentNum = 0;
                    const increment = finalNum / 30;
                    
                    const timer = setInterval(() => {
                        currentNum += increment;
                        if (currentNum >= finalNum) {
                            currentNum = finalNum;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(currentNum) + 'K+';
                    }, 50);
                } else if (/^\d+$/.test(finalValue)) {
                    const finalNum = parseInt(finalValue);
                    let currentNum = 0;
                    const increment = finalNum / 30;
                    
                    const timer = setInterval(() => {
                        currentNum += increment;
                        if (currentNum >= finalNum) {
                            currentNum = finalNum;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(currentNum);
                    }, 50);
                }
                
                heroStatsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        heroStatsObserver.observe(stat);
    });