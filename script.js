// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Quiz Elements
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const submitQuizBtn = document.getElementById('submit-quiz');
    const retakeQuizBtn = document.getElementById('retake-quiz');
    const resultDosha = document.getElementById('result-dosha');
    const resultDescription = document.getElementById('result-description');
    const resultTips = document.getElementById('result-tips');
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    // Mobile Navigation Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll Animation
    function fadeInOnScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('fade-in');
            }
        });
    }
    
    // Initial check for elements in view
    fadeInOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Dosha Quiz Functionality
    if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', calculateDoshaResult);
    }
    
    if (retakeQuizBtn) {
        retakeQuizBtn.addEventListener('click', () => {
            quizResults.style.display = 'none';
            quizQuestions.style.display = 'block';
            
            // Clear all selected radio buttons
            const radioButtons = document.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.checked = false;
            });
        });
    }
    
    function calculateDoshaResult() {
        // Check if all questions are answered
        const questions = document.querySelectorAll('.question');
        let allAnswered = true;
        
        questions.forEach(question => {
            const questionNumber = question.getAttribute('data-question');
            const answered = document.querySelector(`input[name="q${questionNumber}"]:checked`);
            
            if (!answered) {
                allAnswered = false;
                question.style.border = '2px solid #f44336';
                question.style.padding = '1rem';
                question.style.borderRadius = '5px';
            } else {
                question.style.border = 'none';
                question.style.padding = '0';
            }
        });
        
        if (!allAnswered) {
            alert('Please answer all questions to find your dosha.');
            return;
        }
        
        // Count dosha results
        let vataCount = 0;
        let pittaCount = 0;
        let kaphaCount = 0;
        
        for (let i = 1; i <= 7; i++) {
            const selectedOption = document.querySelector(`input[name="q${i}"]:checked`).value;
            
            if (selectedOption === 'vata') vataCount++;
            if (selectedOption === 'pitta') pittaCount++;
            if (selectedOption === 'kapha') kaphaCount++;
        }
        
        // Determine dominant dosha
        let dominantDosha;
        let doshaSymbol;
        let doshaDescription;
        let doshaTips;
        
        if (vataCount >= pittaCount && vataCount >= kaphaCount) {
            dominantDosha = 'Vata';
            doshaSymbol = '🌬️';
            doshaDescription = 'You have a Vata-dominant constitution. Vata types are creative, energetic, and quick-thinking. You likely have a thin build, dry skin, and an active mind. You may be prone to anxiety and irregular routines.';
            doshaTips = '<h4>Balancing Tips for Vata:</h4><ul><li>Maintain regular daily routines</li><li>Stay warm and grounded</li><li>Practice calming activities like gentle yoga and meditation</li><li>Eat warm, nourishing foods with healthy fats</li><li>Get adequate rest and avoid excessive stimulation</li></ul>';
        } else if (pittaCount >= vataCount && pittaCount >= kaphaCount) {
            dominantDosha = 'Pitta';
            doshaSymbol = '🔥';
            doshaDescription = 'You have a Pitta-dominant constitution. Pitta types are focused, organized, and ambitious. You likely have a medium build, warm skin, and a sharp intellect. You may be prone to irritability and impatience when out of balance.';
            doshaTips = '<h4>Balancing Tips for Pitta:</h4><ul><li>Stay cool and avoid overheating</li><li>Practice moderation in all activities</li><li>Engage in calming recreation and sports</li><li>Eat cooling, fresh foods and avoid excessive spices</li><li>Make time for relaxation and avoid excessive competition</li></ul>';
        } else {
            dominantDosha = 'Kapha';
            doshaSymbol = '🌿';
            doshaDescription = 'You have a Kapha-dominant constitution. Kapha types are calm, nurturing, and patient. You likely have a solid build, smooth skin, and a steady mind. You may be prone to attachment and resistance to change.';
            doshaTips = '<h4>Balancing Tips for Kapha:</h4><ul><li>Stay active and maintain regular exercise</li><li>Embrace change and new experiences</li><li>Practice energizing activities</li><li>Eat light, warming foods and avoid excessive heavy foods</li><li>Maintain a stimulating environment and avoid excessive sleep</li></ul>';
        }
        
        // Display results
        resultDosha.innerHTML = `${doshaSymbol} ${dominantDosha} ${doshaSymbol}`;
        resultDescription.innerHTML = `<p>${doshaDescription}</p>`;
        resultTips.innerHTML = doshaTips;
        
        // Hide questions, show results
        quizQuestions.style.display = 'none';
        quizResults.style.display = 'block';
    }
    
    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            // Validate email
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.style.color = '#f44336';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.5rem';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = '#f44336';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes to elements
    function addAnimationClasses() {
        // Add fade-in class to all sections initially
        sections.forEach(section => {
            section.classList.add('fade-in');
        });
        
        // Add hover effects to dosha cards
        const doshaCards = document.querySelectorAll('.dosha-card');
        doshaCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Call the function to add animation classes
    addAnimationClasses();
});