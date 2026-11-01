/**
 * PORTFOLIO - PHAN HẢI NAM
 * Script hỗ trợ giao diện cuộn dọc tự nhiên & tối ưu trải nghiệm di động
 * Bao gồm: Tiến trình đọc, Menu di động drawer, Cuộn mượt,
 *          Sao chép một chạm và Kiểm tra form liên hệ JavaScript.
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

    // Form liên hệ & Xác thực dữ liệu
    const contactForm = document.getElementById('verticalContactForm');
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const msgInput = document.getElementById('contactMessage');
    const fieldWrapName = document.getElementById('fieldWrapName');
    const fieldWrapEmail = document.getElementById('fieldWrapEmail');
    const fieldWrapMsg = document.getElementById('fieldWrapMsg');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const msgError = document.getElementById('msgError');
    const submitBtn = document.getElementById('submitBtn');
    const formAlertBox = document.getElementById('formAlertBox');
    const mailtoActionBtn = document.getElementById('mailtoActionBtn');

    // -------------------------------------------------------------------------
    // 2. CẬP NHẬT TRẠNG THÁI ACTIVE TRÊN MENU (SCROLL-SPY & CLICK)
    // -------------------------------------------------------------------------
    function setActiveNavLink(targetId) {
        if (!targetId) return;

        // Cập nhật menu desktop
        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${targetId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Cập nhật menu di động (drawer)
        drawerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${targetId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Gán sự kiện click ngay lập tức cho các mục menu desktop và drawer
    desktopLinks.forEach(link => {
        link.addEventListener('click', function () {
            this.blur(); // Xóa focus của trình duyệt để gạch dưới không bị kẹt
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                setActiveNavLink(href.substring(1));
            }
        });
    });

    drawerLinks.forEach(link => {
        link.addEventListener('click', function () {
            this.blur();
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                setActiveNavLink(href.substring(1));
            }
        });
    });

    function updateActiveNavOnScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const triggerOffset = 160; // Khoảng đệm quan sát dưới thanh header cố định
        let currentId = 'hero';

        // 1. Khi ở gần đầu trang (hero)
        if (scrollY < 100) {
            currentId = 'hero';
        } 
        // 2. Khi cuộn chạm hoặc gần sát chân trang (contact)
        else if ((window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 60) {
            currentId = 'contact';
        } 
        // 3. Quét tuần tự vị trí từng section từ trên xuống
        else {
            allSections.forEach(section => {
                const top = section.offsetTop;
                if (scrollY >= top - triggerOffset) {
                    currentId = section.getAttribute('id');
                }
            });
        }

        if (currentId) {
            setActiveNavLink(currentId);
        }
    }

    // -------------------------------------------------------------------------
    // 3. THEO DÕI CUỘN TRANG (PROGRESS BAR, HEADER BACKGROUND, SCROLL TO TOP)
    // -------------------------------------------------------------------------
    let isScrollTicking = false;

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
            if (scrollY > 350) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }

        // Cập nhật gạch dưới menu đồng bộ theo vị trí cuộn trang
        if (!isScrollTicking) {
            window.requestAnimationFrame(() => {
                updateActiveNavOnScroll();
                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Kích hoạt ngay khi tải trang

    // -------------------------------------------------------------------------
    // 4. MENU NGĂN KÉO DI ĐỘNG (MOBILE HAMBURGER DRAWER)
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

        // Đóng menu khi bấm phím Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
                mobileDrawer.classList.remove('open');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

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
        }, 3200);
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
    // 7. XỬ LÝ FORM LIÊN HỆ & KIỂM TRA DỮ LIỆU JAVASCRIPT (VALIDATION)
    // -------------------------------------------------------------------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, wrapper, errorEl, validator, errorText) {
        if (!input || !wrapper || !errorEl) return true;
        const value = input.value.trim();
        const isValid = validator(value);

        if (!isValid) {
            wrapper.classList.add('has-error');
            errorEl.textContent = errorText;
            return false;
        } else {
            wrapper.classList.remove('has-error');
            errorEl.textContent = '';
            return true;
        }
    }

    function checkName() {
        return validateField(
            nameInput,
            fieldWrapName,
            nameError,
            (val) => val.length >= 2,
            'Vui lòng nhập họ và tên của bạn (tối thiểu 2 ký tự).'
        );
    }

    function checkEmail() {
        return validateField(
            emailInput,
            fieldWrapEmail,
            emailError,
            (val) => emailRegex.test(val),
            'Vui lòng nhập định dạng email hợp lệ (ví dụ: ban@gmail.com).'
        );
    }

    function checkMessage() {
        return validateField(
            msgInput,
            fieldWrapMsg,
            msgError,
            (val) => val.length >= 10,
            'Lời nhắn quá ngắn, vui lòng nhập ít nhất 10 ký tự.'
        );
    }

    if (nameInput) {
        nameInput.addEventListener('blur', checkName);
        nameInput.addEventListener('input', () => {
            if (fieldWrapName && fieldWrapName.classList.contains('has-error')) checkName();
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', checkEmail);
        emailInput.addEventListener('input', () => {
            if (fieldWrapEmail && fieldWrapEmail.classList.contains('has-error')) checkEmail();
        });
    }

    if (msgInput) {
        msgInput.addEventListener('blur', checkMessage);
        msgInput.addEventListener('input', () => {
            if (fieldWrapMsg && fieldWrapMsg.classList.contains('has-error')) checkMessage();
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const isNameValid = checkName();
            const isEmailValid = checkEmail();
            const isMsgValid = checkMessage();

            if (!isNameValid || !isEmailValid || !isMsgValid) {
                if (!isNameValid && nameInput) nameInput.focus();
                else if (!isEmailValid && emailInput) emailInput.focus();
                else if (!isMsgValid && msgInput) msgInput.focus();

                showToast('Vui lòng kiểm tra lại các trường thông tin còn lỗi.');
                return;
            }

            // Dữ liệu hợp lệ: Cấu hình liên kết mở email ứng dụng (mailto:)
            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const msgVal = msgInput.value.trim();

            if (mailtoActionBtn) {
                const mailSubject = encodeURIComponent(`[Portfolio] Liên hệ từ ${nameVal}`);
                const mailBody = encodeURIComponent(
                    `Chào Phan Hải Nam,\n\nTôi là: ${nameVal}\nEmail của tôi: ${emailVal}\n\nNội dung lời nhắn:\n${msgVal}\n\n---\nGửi từ Portfolio Website`
                );
                mailtoActionBtn.setAttribute('href', `mailto:namph1377@ut.edu.vn?subject=${mailSubject}&body=${mailBody}`);
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Đang xác nhận dữ liệu...</span>';
            }

            setTimeout(() => {
                if (formAlertBox) {
                    formAlertBox.classList.add('is-visible');
                    formAlertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }

                showToast('Dữ liệu hợp lệ! Mời bạn chọn cách liên hệ nhanh.');

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Gửi lời nhắn</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                }
            }, 500);
        });
    }
});
