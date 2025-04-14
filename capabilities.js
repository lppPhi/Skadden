document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const searchInput = document.querySelector('.search-bar input[type="search"]'); // Search ở header

    // --- === LOGIC CHO TABS === ---
    const tabButtons = document.querySelectorAll('.tab-button[data-tab-target]');
    const tabContents = document.querySelectorAll('.tab-content[data-tab-content]');

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.dataset.tabTarget; // Lấy giá trị của data-tab-target (vd: "#practices")
                const targetContent = document.querySelector(targetId);

                if (targetContent) {
                    // Ẩn tất cả nội dung tab và bỏ active button
                    tabContents.forEach(content => {
                        content.classList.remove('active');
                    });
                    tabButtons.forEach(btn => {
                        btn.classList.remove('active');
                    });

                    // Hiện nội dung tab được chọn và thêm active vào button
                    targetContent.classList.add('active');
                    button.classList.add('active');

                    // Trigger fade-in for newly activated tab content if needed (IntersectionObserver handles this generally)
                }
            });
        });
    }
    // --- === KẾT THÚC LOGIC TABS === ---


    // --- === LOGIC MỚI CHO SUBMENU COLLAPSE (PRACTICES LIST) === ---
    const practiceList = document.querySelector('#practices .capabilities-list'); // Target list within #practices tab

    if (practiceList) {
        const expandableItems = practiceList.querySelectorAll('li.has-submenu');

        expandableItems.forEach(item => {
            // Select the link that acts as the trigger (direct child 'a')
            const triggerLink = item.querySelector(':scope > a');

            if (triggerLink) {
                triggerLink.addEventListener('click', (e) => {
                    // Prevent default link behavior ONLY if it has a submenu
                    e.preventDefault();

                    const currentLi = item; // The LI element itself (which has .has-submenu)
                    const wasActive = currentLi.classList.contains('active');

                    // --- Optional: Close all other submenus first (single open behavior) ---
                    // expandableItems.forEach(otherItem => {
                    //     if (otherItem !== currentLi) {
                    //         otherItem.classList.remove('active');
                    //     }
                    // });
                    // --- End Optional ---

                    // Toggle the 'active' class on the current LI
                    currentLi.classList.toggle('active');

                    // --- Alternative: Single open behavior (explicit add/remove) ---
                    // if (wasActive) {
                    //     currentLi.classList.remove('active'); // If it was active, close it
                    // } else {
                    //     // Close others first
                    //     expandableItems.forEach(otherItem => {
                    //         if (otherItem !== currentLi) {
                    //             otherItem.classList.remove('active');
                    //         }
                    //     });
                    //     // Then open the current one
                    //     currentLi.classList.add('active');
                    // }
                    // --- End Alternative ---
                });
            }
        });
    }
    // --- === KẾT THÚC LOGIC SUBMENU COLLAPSE === ---


    // 1. Sticky Header Shadow on Scroll (Giữ nguyên)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle (Giữ nguyên)
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('mobile-active');
            const icon = mobileMenuToggle.querySelector('i');
            if (mainNav.classList.contains('mobile-active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // Optionally disable body scroll when menu is open
                // document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // document.body.style.overflow = '';
            }
        });

        // Close mobile menu when a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('mobile-active')) {
                     mainNav.classList.remove('mobile-active');
                     mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                     mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                     // document.body.style.overflow = '';
                }
            });
        });
    }

    // 3. Basic Search Input Interaction (Header) (Giữ nguyên)
    if (searchInput) {
        const searchForm = searchInput.closest('form') || searchInput.parentElement;
         if(searchForm) {
            // Prevent default if it's a real form, handle submission via JS if needed
             searchForm.addEventListener('submit', (e) => {
                 e.preventDefault();
                 console.log(`Header searching for: "${searchInput.value}"`);
                 // Add actual search logic here if needed
             });
         }
         // Add keypress listener anyway for immediate feedback or if not in a form
         searchInput.addEventListener('keypress', (e) => {
             if (e.key === 'Enter') {
                 e.preventDefault(); // Prevent default even if not in form
                 console.log(`Header searching for: "${searchInput.value}"`);
                 // Add actual search logic here if needed
             }
         });
    }

    // Optional: Add search logic for capabilities search bar (Giữ nguyên)
    const capabilitiesSearchInput = document.querySelector('.capabilities-search-bar input[type="search"]');
    if (capabilitiesSearchInput) {
        const capabilitiesSearchForm = capabilitiesSearchInput.closest('.capabilities-search-bar');
         const capabilitiesSearchButton = capabilitiesSearchForm?.querySelector('button');

        if (capabilitiesSearchForm) {
             // Handle form submission OR button click
             const handleSearch = (e) => {
                 e.preventDefault();
                 console.log(`Capabilities searching for: "${capabilitiesSearchInput.value}"`);
                 // Add actual filtering/search logic here
             };

             capabilitiesSearchForm.addEventListener('submit', handleSearch);
             if(capabilitiesSearchButton) {
                 capabilitiesSearchButton.addEventListener('click', handleSearch);
             }

             // Handle Enter key press on input
             capabilitiesSearchInput.addEventListener('keypress', (e) => {
                 if(e.key === 'Enter'){
                     handleSearch(e);
                 }
             });
        }
    }


    // 4. Simple Fade-in Animation on Scroll (Giữ nguyên, target các class fade-in)
    const fadeElements = document.querySelectorAll('.fade-in');

    if ("IntersectionObserver" in window && fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Stop observing after the element is visible once
                    // observer.unobserve(entry.target);
                }
                 // Optional: remove visible class when scrolling out of view
                 // else {
                 //    entry.target.classList.remove('visible');
                 // }
            });
        }, {
            threshold: 0.1 // Element is considered intersecting when 10% is visible
        });

        fadeElements.forEach(el => {
             // Ensure initial state opacity is 0 if not set by CSS default for .fade-in
             // (CSS already handles this, but this is a safety fallback)
             if (!el.classList.contains('visible') && getComputedStyle(el).opacity !== '0') {
                 el.style.opacity = '0';
             }
             observer.observe(el);
        });
    } else if (fadeElements.length > 0) {
        // Fallback for older browsers - make elements visible immediately
        console.warn("IntersectionObserver not supported, fallback: making fade-in elements visible.");
        fadeElements.forEach(el => el.classList.add('visible'));
    }

});