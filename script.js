document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const searchInput = document.querySelector('.search-bar input[type="search"]');

    // 1. Sticky Header Shadow on Scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
            const icon = mobileMenuToggle.querySelector('i');
            const isMobileActive = mainNav.classList.contains('mobile-active');

            if (isMobileActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Prevent body scroll
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Restore body scroll
            }
        });

        // Close mobile menu if a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('mobile-active')) {
                     mainNav.classList.remove('mobile-active');
                     const icon = mobileMenuToggle.querySelector('i');
                     icon.classList.remove('fa-times');
                     icon.classList.add('fa-bars');
                     document.body.style.overflow = '';
                }
            });
        });

        // Close mobile menu clicking outside the nav
        document.addEventListener('click', (event) => {
             if (mainNav.classList.contains('mobile-active') &&
                 !mainNav.contains(event.target) &&
                 !mobileMenuToggle.contains(event.target)) {
                 mainNav.classList.remove('mobile-active');
                 const icon = mobileMenuToggle.querySelector('i');
                 icon.classList.remove('fa-times');
                 icon.classList.add('fa-bars');
                 document.body.style.overflow = '';
             }
        });
    }


    // 3. Basic Search Input Interaction
    if (searchInput) {
        const searchButton = searchInput.nextElementSibling; // Assuming button is next sibling

        const performSearch = () => {
            if (searchInput.value.trim()) {
                 console.log(`Searching for: "${searchInput.value}"`);
                 // Add actual search logic here (e.g., redirect to search page)
                 // window.location.href = '/search?q=' + encodeURIComponent(searchInput.value);
            }
        };

        if (searchButton && searchButton.tagName === 'BUTTON') {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission if it's inside a form
                performSearch();
            });
        }

         searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
         });
    }

    // 4. Simple Fade-in Animation on Scroll
    // Selector includes hero, secondary cards, and recent news items
    const fadeElements = document.querySelectorAll('.news-card--hero, .news-card--secondary, .recent-news-list li');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a slight delay based on element type or index if desired
                    // const delay = entry.target.classList.contains('news-card--secondary') ? Math.random() * 0.2 : 0; // Example delay
                    // entry.target.style.transitionDelay = `${delay}s`;
                    entry.target.classList.add('visible');
                    // Optional: Stop observing once visible to improve performance
                    // observerInstance.unobserve(entry.target);
                } else {
                     // Optional: Remove 'visible' class if you want the animation to re-trigger when scrolling back up
                     // entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            // rootMargin: '0px 0px -50px 0px' // Optional: Adjust trigger point vertically
        });

        fadeElements.forEach(el => {
             el.classList.add('fade-in'); // Add base class for initial hidden state + transition properties
             observer.observe(el);
        });
    } else {
        // Fallback for older browsers that don't support IntersectionObserver
        console.warn("IntersectionObserver not supported, fade-in animations will show immediately.");
        fadeElements.forEach(el => el.classList.add('visible'));
    }

});