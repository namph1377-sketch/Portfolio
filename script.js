/**
 * PORTFOLIO - PHAN HẢI NAM
 * Script hỗ trợ giao diện cuộn dọc tự nhiên & tối ưu trải nghiệm di động
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. CÁC PHẦN TỬ CHÍNH
    // -------------------------------------------------------------------------
    const headerNav = document.getElementById('headerNav');
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Menu di động
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const desktopLinks = document.querySelectorAll('.desktop-menu .nav-item');
    const allSections = document.querySelectorAll('.section-full');

    // Toast & Copy
    const copyBtns = document.querySelectorAll('.copy-btn');
    const toastBubble = document.getElementById('toastBubble');
    const toastMsg = document.getElementById('toastMsg');
    let toastTimer = null;

    // Form liên hệ
    const contactForm = document.getElementById('verticalContactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formAlertSuccess = document.getElementById('formAlertSuccess');

    // -------------------------------------------------------------------------
    // 2. THEO DÕI CUỘN TRANG (PROGRESS BAR, HEADER BACKGROUND, SCROLL TO TOP)
    // -------------------------------------------------------------------------
    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Cập nhật thanh tiến trình cuộn dọc
        if (totalHeight > 0 && scrollProgress) {
            const progressPercent = (scrollY / totalHeight) * 100;
            scrollProgress.style.width = `${progressPercent}%`;
        }

        // Đổi màu nền thanh điều hướng khi cuộn
        if (headerNav) {
            if (scrollY > 50) {
                headerNav.classList.add('scrolled');
            } else {
                headerNav.classList.remove('scrolled');
            }
        }

        // Hiện / ẩn nút về đầu trang
        if (scrollTopBtn) {
            if (scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Kích hoạt ngay khi tải trang

    // -------------------------------------------------------------------------
    // 3. MENU NGĂN KÉO DI ĐỘNG (MOBILE HAMBURGER DRAWER)
    // -------------------------------------------------------------------------
    if (mobileMenuBtn && mobileDrawer) {
        function toggleMobileMenu() {
            const isOpen = mobileDrawer.classList.toggle('open');
            mobileMenuBtn.classList.toggle('active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Đóng menu khi nhấp vào bất kỳ liên kết nào
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // -------------------------------------------------------------------------
    // 4. THEO DÕI MỤC ĐANG HIỂN THỊ (INTERSECTION OBSERVER)
    // -------------------------------------------------------------------------
    const sectionObserverOptions = {
        root: null,
        rootMargin: '-25% 0px -40% 0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (!id) return;

                // Cập nhật menu desktop
                desktopLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Cập nhật menu di động
                drawerLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    allSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // -------------------------------------------------------------------------
    // 5. CUỘN MƯỢT KHI BẤM LIÊN KẾT NỘI BỘ (SMOOTH SCROLL)
    // -------------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // -------------------------------------------------------------------------
    // 6. CHỨC NĂNG SAO CHÉP NHANH (COPY TO CLIPBOARD & TOAST)
    // -------------------------------------------------------------------------
    function showToast(message) {
        if (!toastBubble || !toastMsg) return;

        toastMsg.textContent = message;
        toastBubble.classList.add('shown');

        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastBubble.classList.remove('shown');
        }, 3000);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const textToCopy = btn.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    const tempInput = document.createElement('input');
                    tempInput.value = textToCopy;
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }

                const originalText = btn.textContent;
                btn.textContent = 'Đã chép!';
                btn.style.backgroundColor = '#ffa36c';
                btn.style.color = '#1a0f07';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 2000);

                showToast(`Đã sao chép: ${textToCopy}`);
            } catch (err) {
                console.error(err);
                showToast(`Hãy sao chép: ${textToCopy}`);
            }
        });
    });

    // -------------------------------------------------------------------------
    // 7. XỬ LÝ FORM LIÊN HỆ TRỰC TIẾP (CONTACT FORM)
    // -------------------------------------------------------------------------
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Đang gửi lời nhắn...</span>';
            }

            setTimeout(() => {
                if (formAlertSuccess) {
                    formAlertSuccess.classList.add('is-visible');
                }
                showToast('Lời nhắn của bạn đã được gửi thành công!');
                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Gửi lời nhắn</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                }

                setTimeout(() => {
                    if (formAlertSuccess) {
                        formAlertSuccess.classList.remove('is-visible');
                    }
                }, 6000);
            }, 600);
        });
    }
});
