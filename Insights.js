document.addEventListener('DOMContentLoaded', () => {

    // --- Banner Slider (Cross-Fade Logic) ---
    const bannerWrapper = document.querySelector('.banner-slider-wrapper'); // Vẫn cần để kiểm tra tồn tại
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const dotsContainer = document.querySelector('.banner-dots-navigation');
    const prevButton = document.querySelector('.banner-prev');
    const nextButton = document.querySelector('.banner-next');
    let currentSlideIndex = 0;
    let slideInterval;
    const slideIntervalTime = 7000; // 7 seconds interval

    function createBannerDots() {
        if (!dotsContainer || bannerSlides.length <= 1) {
            if(dotsContainer) dotsContainer.style.display = 'none'; // Hide dots if only 1 slide
             if(prevButton) prevButton.style.display = 'none';
             if(nextButton) nextButton.style.display = 'none';
            return;
        };

        bannerSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('banner-dot');
            dot.setAttribute('aria-label', `Go to insight slide ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetSlideInterval();
            });
            dotsContainer.appendChild(dot);
        });
    }

    function updateDots(index) {
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.banner-dot') : [];
        if (dots.length > 0) {
             dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
    }

    function goToSlide(index) {
        // if (!bannerWrapper || !bannerSlides.length) return; // Kiểm tra bannerSlides là đủ
        if (!bannerSlides || bannerSlides.length === 0) return;

        // Ensure index is within bounds
        const newIndex = (index + bannerSlides.length) % bannerSlides.length;
        currentSlideIndex = newIndex; // Cập nhật index hiện tại

        // --- KHÔNG DÙNG TRANSFORM NỮA ---
        // bannerWrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`; // <-- XÓA DÒNG NÀY

        // Chỉ cần cập nhật class 'active' cho slide mới
        bannerSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlideIndex);
        });

        // Update dots
        updateDots(currentSlideIndex);
    }

    function nextSlide() {
        goToSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentSlideIndex - 1);
    }

    function startSlideShow() {
        // Clear existing interval
        clearInterval(slideInterval);
        if (bannerSlides.length > 1) {
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        }
    }

    function resetSlideInterval() {
        // Clear existing interval
        clearInterval(slideInterval);
        // Restart immediately after manual interaction or at beginning
        startSlideShow();
    }

    // Initialize Banner Slider
    if (bannerSlides.length > 0) {
        createBannerDots();
        goToSlide(0); // Hiển thị slide đầu tiên (set active class)
        startSlideShow(); // Start automatic sliding

        // Add event listeners for arrows
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetSlideInterval();
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetSlideInterval();
            });
        }

        // Optional: Pause on hover
        const bannerElement = document.querySelector('.insights-banner');
         if (bannerElement) {
             bannerElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
             bannerElement.addEventListener('mouseleave', startSlideShow); // Restart slideshow on mouse leave
         }
    }


    // --- Tabs Functionality ---
    const tabsNav = document.querySelector('.insights-tabs-nav');
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabsNav && tabLinks.length > 0 && tabPanes.length > 0) {
        tabsNav.addEventListener('click', (e) => {
            const clickedTab = e.target.closest('.tab-link');
            if (!clickedTab) return; // Exit if click wasn't on a tab link

            const targetTabId = clickedTab.getAttribute('data-tab');
            const targetPane = document.getElementById(targetTabId);

            if (!targetPane) return; // Exit if corresponding pane doesn't exist

            // Deactivate all links and panes
            tabLinks.forEach(link => link.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Activate clicked link and target pane
            clickedTab.classList.add('active');
            targetPane.classList.add('active');
        });
    }


    // --- Search Functionality (Placeholder) ---
    const searchForm = document.querySelector('.insights-search-form');
    const searchInput = document.getElementById('insightQuery');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission for now
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Searching insights for:', searchTerm);
                // Implement actual search logic here:
                // - Filter existing items on the page (simple)
                // - Make an AJAX request to a backend endpoint (better)
                // - Redirect to a search results page:
                //   window.location.href = `/search?q=${encodeURIComponent(searchTerm)}&type=insights`;
                alert(`Search submitted for: "${searchTerm}". (Implementation needed)`);
            } else {
                // Maybe provide feedback if search is empty
                searchInput.focus();
            }
        });
    }


    // --- View More Functionality (Placeholder) ---
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');

    viewMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pane = button.closest('.tab-pane');
            const paneId = pane ? pane.id : 'unknown';
            console.log(`"View More" clicked for section: ${paneId}`);
            alert(`"View More" for ${paneId} clicked. (Load more content logic needed)`);

            // --- Example of what you might do here ---
            // 1. Show a loading indicator
            // button.textContent = 'Loading...';
            // button.disabled = true;
            // 2. Fetch more data (e.g., using fetch API)
            // fetch(`/api/insights?category=${paneId}&page=2`) // Example endpoint
            //   .then(response => response.json())
            //   .then(data => {
            //      // 3. Append new items to the grid (data.items should be an array of HTML strings or objects to render)
            //      const grid = pane.querySelector('.insights-grid');
            //      data.items.forEach(itemHTML => {
            //          grid.insertAdjacentHTML('beforeend', itemHTML);
            //      });
            //      // 4. Hide button if no more items, or update it
            //      if (!data.hasMore) {
            //          button.style.display = 'none';
            //      } else {
            //          button.textContent = 'View More Publications'; // Reset text
            //          button.disabled = false;
            //          // Update page number for next click if needed
            //      }
            //   })
            //   .catch(error => {
            //       console.error('Error loading more insights:', error);
            //       button.textContent = 'Error loading. Try again?';
            //       button.disabled = false;
            //   });
        });
    });

     // --- Optional: Header Scroll Effect & Mobile Menu (If not handled globally) ---
     // Assuming these might be handled by a global script.js linked in the HTML.
     // If not, you'd need to include that logic here as well.
     const mobileToggle = document.querySelector('.mobile-menu-toggle');
     if (mobileToggle && typeof handleMobileMenu !== 'function') { // Example check
         console.warn("Mobile menu toggle found, but handler function might be missing or not global. Ensure script.js is loaded and includes necessary functions.");
     }

     const siteHeader = document.querySelector('.site-header');
      if (siteHeader && typeof handleHeaderScroll !== 'function') { // Example check
          console.warn("Header found, but scroll handler function might be missing or not global. Ensure script.js is loaded and includes necessary functions.");
      }

});