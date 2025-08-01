// Fluid/Particle Effect for Studio 0172

(function() {
    'use strict';

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    // Find hero section and append canvas to it
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) {
        console.error('Hero section not found');
        return;
    }
    
    // Make hero section relative positioned for absolute canvas
    heroSection.style.position = 'relative';
    heroSection.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = heroSection.offsetHeight;

    // Particle system
    const particles = [];
    const maxParticles = 100;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 20 + 10;
            this.speedX = (Math.random() - 0.5) * 0.5; // Much slower speed
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.life = 1.0;
            this.decay = Math.random() * 0.004 + 0.001; // Even slower decay for longer life
            
            // Random color with low opacity
            const hue = Math.random() * 360;
            this.color = `hsla(${hue}, 70%, 50%, 0.4)`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.size *= 0.98;
            
            // Add gentle waviness
            this.speedX += (Math.random() - 0.5) * 0.02;
            this.speedY += (Math.random() - 0.5) * 0.02;
        }

        draw() {
            if (this.life <= 0) return;
            
            ctx.save();
            ctx.globalAlpha = this.life * 0.2; // More subtle
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 30; // Softer glow
            ctx.shadowColor = this.color;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Create particles on mouse move
    function createParticles(x, y) {
        for (let i = 0; i < 3; i++) {
            if (particles.length < maxParticles) {
                particles.push(new Particle(x, y));
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.update();
            particle.draw();
            
            // Remove dead particles
            if (particle.life <= 0 || particle.size <= 0.5) {
                particles.splice(i, 1);
            }
        }
        
        // Create trail effect when mouse is moving
        if (isMouseMoving && particles.length < maxParticles) {
            createParticles(mouseX, mouseY);
        }
        
        // Always maintain some ambient particles
        if (particles.length < maxParticles / 2) {
            // Create random particles at random positions
            const x = Math.random() * width;
            const y = Math.random() * height;
            particles.push(new Particle(x, y));
        }
        
        // Occasionally spawn particles near existing ones for fluid effect
        if (Math.random() < 0.1 && particles.length < maxParticles) {
            const randomParticle = particles[Math.floor(Math.random() * particles.length)];
            if (randomParticle) {
                particles.push(new Particle(
                    randomParticle.x + (Math.random() - 0.5) * 50,
                    randomParticle.y + (Math.random() - 0.5) * 50
                ));
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Mouse events
    let mouseTimeout;
    
    window.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Only create particles if mouse is within hero section
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            isMouseMoving = true;
            
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                isMouseMoving = false;
            }, 100);
        }
    });

    // Touch events for mobile
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const rect = heroSection.getBoundingClientRect();
            mouseX = e.touches[0].clientX - rect.left;
            mouseY = e.touches[0].clientY - rect.top;
            
            // Only create particles if touch is within hero section
            if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
                isMouseMoving = true;
                
                clearTimeout(mouseTimeout);
                mouseTimeout = setTimeout(() => {
                    isMouseMoving = false;
                }, 100);
            }
        }
    });

    // Handle resize
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = heroSection.offsetHeight;
    });

    // Start animation
    animate();

    // Add some initial particles for effect
    setTimeout(() => {
        for (let i = 0; i < 20; i++) {
            particles.push(new Particle(
                Math.random() * width,
                Math.random() * height
            ));
        }
    }, 100);

})();