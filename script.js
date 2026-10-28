// =====================================
// 1. MENU ĐIỀU HƯỚNG TRÊN ĐIỆN THOẠI
// =====================================

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Đóng menu" : "Mở menu"
        );
    });

    // Đóng menu sau khi người dùng chọn một mục
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("is-open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Mở menu");
        });
    });
}


// =====================================
// 2. CHUYỂN ĐỔI GIAO DIỆN SÁNG / TỐI
// =====================================

const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");

function setTheme(theme) {
    const isLight = theme === "light";

    document.body.classList.toggle("light-theme", isLight);

    if (themeIcon) {
        themeIcon.textContent = isLight ? "☀" : "☾";
    }

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            isLight
                ? "Chuyển sang giao diện tối"
                : "Chuyển sang giao diện sáng"
        );
    }
}

// Mặc định sử dụng giao diện tối
setTheme("dark");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight =
            document.body.classList.contains("light-theme");

        setTheme(isLight ? "dark" : "light");
    });
}


// =====================================
// 3. TỰ ĐỘNG CẬP NHẬT NĂM
// =====================================

const currentYear = document.querySelector("#currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


// =====================================
// 4. ĐÁNH DẤU MỤC MENU ĐANG ĐƯỢC XEM
// =====================================

const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    const isCurrent =
                        link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", isCurrent);
                });
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}


// =====================================
// 5. HIỆU ỨNG XUẤT HIỆN KHI CUỘN TRANG
// =====================================

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-card, " +
    ".skill-card, " +
    ".project-card, " +
    ".timeline-item, " +
    ".contact-form"
);

if ("IntersectionObserver" in window) {
    // Thêm trạng thái ban đầu cho các phần tử
    revealElements.forEach((element) => {
        element.classList.add("js-reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");

                    // Ngừng theo dõi sau khi phần tử xuất hiện
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    // Hiển thị bình thường nếu trình duyệt không hỗ trợ
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}


// =====================================
// 6. FORM LIÊN HỆ
// Mở ứng dụng email để soạn thư
// =====================================

const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const recipient = contactForm.dataset.email;

        const name =
            document.querySelector("#name")?.value.trim() ?? "";

        const senderEmail =
            document.querySelector("#email")?.value.trim() ?? "";

        const message =
            document.querySelector("#message")?.value.trim() ?? "";

        // Kiểm tra email nhận thư đã được cập nhật chưa
        if (
            !recipient ||
            recipient === "your.email@example.com"
        ) {
            if (formNote) {
                formNote.textContent =
                    "Vui lòng thay email mẫu bằng email thật trong file index.html.";
            }

            return;
        }

        // Tạo tiêu đề và nội dung email
        const subject = encodeURIComponent(
            `Liên hệ từ portfolio: ${name}`
        );

        const body = encodeURIComponent(
            `Họ tên: ${name}\n` +
            `Email: ${senderEmail}\n\n` +
            `Nội dung:\n${message}`
        );

        if (formNote) {
            formNote.textContent =
                "Đang mở ứng dụng email. Hãy kiểm tra và gửi thư.";
        }

        // Mở ứng dụng email mặc định trên thiết bị
        window.location.href =
            `mailto:${recipient}?subject=${subject}&body=${body}`;
    });
}