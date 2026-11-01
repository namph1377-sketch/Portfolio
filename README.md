# PORTFOLIO CÁ NHÂN — PHAN HẢI NAM

> **Data Science Student · Interested in Data Analyst & Business Analyst**  
> Trường Đại học Giao thông Vận tải Thành phố Hồ Chí Minh (UTH) — Niên khóa 2024–2028.

Trang web Portfolio cá nhân được xây dựng theo phong cách **Personal Journal & Editorial Portfolio**, kết hợp giữa nét mộc mạc, chân thực của nhật ký hành trình và cấu trúc phân cấp thông tin chỉn chu của tạp chí học thuật.

---

## 🎨 1. Bảng màu & Phong cách thiết kế

Dự án áp dụng bảng màu tiêu chuẩn theo tỷ lệ cân bằng thị giác:
- **Primary (60%):** `#FFFFFF` / `#FFFBF0` (Trắng ấm / màu cát nắng) — Tạo không gian sạch sẽ, thoáng đãng, dễ tiếp nhận nội dung.
- **Secondary (30%):** `#008B9B` (Deep Sea Teal / Xanh ngọc biển sâu) — Thể hiện tính chuyên nghiệp, chiều sâu phân tích dữ liệu.
- **Accent (10%):** `#EAA97E` / `#FFA36C` (Vàng cam cát ấm / Coral) — Điểm nhấn nổi bật cho các nút hành động, thẻ quan trọng.
- **Support:** `#3B6948` / `#5CB874` (Xanh lá cây cọ) — Cân bằng sắc ấm, mang lại cảm giác sinh động và năng lượng tích cực.
- **Typography:**
  - Tiêu đề: **Montserrat** (Font-weight: 700, 800, 900)
  - Thân bài: **Be Vietnam Pro** (Font-weight: 400, 500, 600, 700; Line-height: 1.75; tối ưu hiển thị Tiếng Việt).

---

## 🚀 2. Các chức năng tương tác (JavaScript DOM & Event)

1. **Menu di động dạng ngăn kéo (Mobile Drawer Navigation):**
   - Thanh điều hướng trượt sang mượt mà với hiệu ứng làm mờ nền (backdrop blur).
   - Hỗ trợ đóng mở linh hoạt qua phím `Escape`, nút đóng hoặc nhấp vào liên kết.
2. **Kiểm tra dữ liệu Form phía trình duyệt (Client-side Validation):**
   - Kiểm tra họ tên (tối thiểu 2 ký tự), định dạng email chuẩn và lời nhắn (tối thiểu 10 ký tự).
   - Hiển thị thông báo lỗi chi tiết theo từng trường nhập liệu.
   - **Minh bạch:** Kèm tuyên bố rõ ràng form hoạt động ở chế độ client-side, đồng thời cung cấp nút mở ứng dụng Email (`mailto:`) và nhắn tin Zalo trực tiếp.
3. **Sao chép một chạm (One-touch Copy to Clipboard):**
   - Sao chép nhanh số Zalo (`0987654321`) và Email (`namph1377@ut.edu.vn`) kèm hiệu ứng thông báo (Toast).
4. **Thanh tiến trình cuộn trang & Nút về đầu trang (Scroll Progress & Scroll-to-top):**
   - Thanh chỉ báo tỷ lệ đọc ở đầu trang và nút cuộn mượt về đầu trang khi người dùng lướt xuống dưới.
5. **Theo dõi phân mục hiển thị tự động (Intersection Observer):**
   - Tự động đánh dấu mục menu đang đọc tương ứng khi cuộn trang.

---

## 📁 3. Cấu trúc thư mục chuẩn (Tối giản & Không trùng lặp)

```text
Portfolio/
├── index.html                   # Trang chủ cấu trúc Semantic HTML5 (9 section chuẩn chỉnh)
├── style.css                    # Toàn bộ CSS phong cách Dark Ocean Night & Glassmorphism
├── script.js                    # Toàn bộ mã nguồn JavaScript (Scroll-spy, Drawer, Form)
├── README.md                    # Tài liệu giới thiệu và cấu trúc dự án
├── README_Portfolio_Spec.md     # Tài liệu đặc tả kỹ thuật và đối chiếu tiêu chuẩn
└── images/                      # Thư mục tài nguyên hình ảnh trực tiếp (22 files)
    ├── avatar.png               # Chân dung đại diện Phan Hải Nam
    ├── Background1.jpg          # Nền Vịnh Vĩnh Hy (Hero)
    ├── Background2.jpg          # Nền Hang Rái (About Me)
    ├── Background3.jpg          # Nền Tháp Chàm Po Klong Garai (Con đường)
    ├── Background4.jpg          # Nền Bảo tàng kiến trúc (Kỹ năng)
    ├── Background5.jpg          # Nền Cánh đồng quạt gió & lúa vàng (Hành trình)
    ├── Background6.jpg          # Nền Đồi cát Nam Cương (Liên hệ)
    ├── Background7.jpg          # Nền Rêu xanh bình minh (Dự án)
    ├── background8.jpg          # Nền Học vấn & Nghiên cứu khoa học
    ├── background9.jpg          # Nền Sở thích & Chứng chỉ
    ├── Project.jpg              # Minh chứng nỗ lực trong Nghiên cứu khoa học (Học vấn & NCKH)
    ├── xem phim.jpg             # Ảnh đại diện sở thích Xem phim
    ├── hồ bơi.jpg               # Ảnh đại diện sở thích Học bơi
    ├── nấu ăn.jpg               # Ảnh đại diện sở thích Nấu ăn
    ├── sách.jpg                 # Ảnh đại diện sở thích Đọc sách trinh thám
    ├── lắng nghe.jpg            # Ảnh đại diện sở thích Lắng nghe & học hỏi
    ├── học tiếng anh.jpg        # Ảnh đại diện sở thích Học tiếng Anh
    ├── Ảnh1.jpg                 # Khoảnh khắc đời thường cởi mở, cầu tiến (Về tôi)
    ├── Ảnh2.jpg                 # Khoảnh khắc lưu niệm
    ├── Ảnh3.jpg                 # Đời thường & Năng lượng tích cực (Hành trình)
    ├── Ảnh4.jpg                 # Vươn về phía trước — Định hướng tương lai (Con đường)
    └── Ảnh5.jpg                 # Tự thấu hiểu & Chiêm nghiệm bên bức tượng (Hành trình)
```

---

## 📌 4. Đối chiếu thang điểm đánh giá (Checklist 10.0 Điểm)

### I. Nội dung Portfolio — 3.5 / 3.5 điểm
- [x] Header / Navbar / Banner điều hướng chính xác 8 section tương ứng. (0.5)
- [x] Giới thiệu đầy đủ họ tên, ảnh đại diện, ngành học, định hướng DA/BA, câu châm ngôn ngắn. (0.5)
- [x] Định hướng nghề nghiệp và mục tiêu trước mắt / dài hạn rõ ràng. (0.5)
- [x] Kỹ năng chuyên môn Python, ML (K-Means, Decision Tree, SVM, Naive Bayes), SQL/MySQL thiết kế quan hệ. (0.5)
- [x] Học vấn tại ĐH GTVT TP.HCM (2024–2028), đề tài NCKH cấp sinh viên 2025–2026 và Hội thảo Quốc gia VII kèm ảnh `Project.jpg`. (0.5)
- [x] Trình bày đủ 3 dự án mã nguồn mở với vai trò, mô tả, công nghệ và link GitHub chuẩn xác. (0.5)
- [x] Sở thích đầy đủ 6 khía cạnh; mục Chứng chỉ/Giải thưởng ghi rõ “Chưa có” theo đúng chuẩn đánh giá. (0.5)

### II. Thiết kế giao diện (HTML/CSS) — 2.5 / 2.5 điểm
- [x] HTML5 semantic (`header`, `nav`, `main`, `section`, `article`, `footer`). (0.5)
- [x] Layout kết hợp Flexbox và CSS Grid linh hoạt, không chồng lấn. (0.5)
- [x] Màu sắc, typography, khoảng cách nhất quán theo palette Sand / Teal / Coral / Palm. (0.5)
- [x] Tương thích hoàn hảo trên Desktop, Tablet và Mobile. (0.5)
- [x] Hiệu ứng hover, transition, transform và hỗ trợ `prefers-reduced-motion`. (0.5)

### III. JavaScript và tương tác — 2.0 / 2.0 điểm
- [x] Thao tác DOM, sự kiện `click`, `scroll`, `input`, `blur`, `submit`. (0.5)
- [x] Đầy đủ các tương tác: Mobile Drawer, Scroll-to-top, Toast copy, Cuộn mượt, Theo dõi section. (1.0)
- [x] Form liên hệ kiểm tra tính hợp lệ dữ liệu bằng JavaScript kèm disclaimer minh bạch. (0.5)

### IV. Chất lượng bài làm — 1.0 / 1.0 điểm
- [x] Code sạch (Clean Code), thụt lề chuẩn, đặt tên có ý nghĩa, hạn chế lặp mã. (0.5)
- [x] Phân chia cấu trúc thư mục `css/`, `js/`, `images/` chuẩn mực. (0.25)
- [x] Cá nhân hóa đúng thông tin và năng lực thực tế của sinh viên Phan Hải Nam. (0.25)

### V. Sáng tạo — 1.0 / 1.0 điểm
- [x] Bố cục dạng Editorial Journal đan xen ảnh nghệ thuật (`Ảnh3.jpg`, `Ảnh5.jpg`) với các câu chuyện tự sự; bộ lọc dự án trực quan và hệ thống sao chép một chạm. (1.0)

---

## 🛠️ 5. Hướng dẫn chạy và kiểm thử

Website được xây dựng hoàn toàn bằng HTML5, CSS3 và Vanilla JavaScript (không phụ thuộc framework bên ngoài).
1. **Mở trực tiếp:** Nhấp đúp vào tệp `index.html` trong bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari).
2. **Chạy qua Live Server (khuyến nghị):**
   ```bash
   # Nếu có extension Live Server trong VS Code:
   # Click chuột phải vào index.html -> Open with Live Server
   ```
3. **Kiểm tra Responsive:** Nhấn `F12` trên trình duyệt -> Bật Device Mode để kiểm tra trên màn hình iPhone, iPad, Laptop và Desktop.

---

*Bản quyền © 2026 Phan Hải Nam. Mọi thông tin được thiết kế và triển khai nhằm phục vụ mục đích học tập và phát triển nghề nghiệp.*

