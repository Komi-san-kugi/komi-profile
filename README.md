# Komi Profile - Glassmorphism Card

Trang web profile cá nhân với **glassmorphism** effect, phong cách **guns.lol/komi_chan**.

## ✨ Tính năng

### 🎨 Giao diện
- **Full background anime** - Ảnh wallpaper chiếm toàn màn hình
- **Glassmorphism card** - Khung kính mờ bo tròn lớn ở giữa
- **Backdrop blur** - Hiệu ứng blur 20px cho nền
- **Smooth animations** - Fade in, slide up, stagger effects
- **Responsive design** - Desktop + mobile friendly

### 🖼️ Components
1. **Avatar tròn** - 110px, viền trắng, glow effect, float animation
2. **Name + Tagline** - "Komi" với text-shadow
3. **Location** - Icon map + "Đồng Nai"
4. **Subcard** - Thẻ con với username, badge "💜 KOMI", status
5. **Facebook button** - Icon tròn trắng, hover effects
6. **View counter** - Icon mắt + số lượt xem (bottom-left)
7. **Chibi character** - Icon nhỏ cute (bottom-right) với float animation

### 🎭 Interactive Features
- **Avatar spin** - Hover vào avatar → quay 360°
- **Copy username** - Click vào subcard → copy "komi_elaina"
- **Ripple effect** - Click Facebook button
- **Keyboard shortcuts**:
cd "H:\du an 1\komi-profile"
python -m http.server 8000
# Mở: http://localhost:8000
```

Hoặc dùng **Live Server** trong VS Code:
```
Right-click index.html → Open with Live Server
```

## 📝 Tùy chỉnh

### 1. Đổi ảnh nền anime
Mở `style.css`, tìm dòng:
```css
body {
    background: url('ẢNH_CỦA_BẠN.jpg') center/cover no-repeat fixed;
}
```

**Nguồn ảnh anime miễn phí:**
- [Unsplash Anime](https://unsplash.com/s/photos/anime)
- [Wallhaven](https://wallhaven.cc/)
- [Pixiv](https://www.pixiv.net/)

### 2. Đổi avatar
Mở `script.js`, tìm dòng:
```javascript
const placeholderAvatar = 'URL_AVATAR_CỦA_BẠN';
```

Hoặc trực tiếp trong HTML:
```html
<img src="YOUR_AVATAR_URL.jpg" alt="Komi" id="avatarImg">
```

### 3. Đổi thông tin cá nhân
Mở `index.html`:
- **Tên**: `<h1 class="name">Komi</h1>`
- **Tagline**: `<p class="tagline">Chỉ là 1 trang web</p>`
- **Location**: `<span>Đồng Nai</span>`
- **Username**: `<span class="username">komi_elaina</span>`
- **Link Facebook**: `<a href="https://facebook.com/YOURPROFILE">`

### 4. Đổi màu sắc
Mở `style.css`, sửa `:root` variables:
```css
:root {
    --glass-bg: rgba(5, 10, 20, 0.65);      /* Nền khung */
    --subcard-bg: rgba(20, 25, 40, 0.8);    /* Nền subcard */
    --purple-accent: #c471ed;                /* Màu tím accent */
}
```

### 5. Thay đổi badge
Mở `index.html`, tìm:
```html
<span class="badge">💜 KOMI</span>
```

Thay emoji và text tùy ý: `💙 VIP`, `✨ PRO`, `🔥 HOT`

## 🎨 Cấu trúc file

```
komi-profile/
├── index.html      # Cấu trúc HTML
├── style.css       # Glassmorphism styles
├── script.js       # Interactions
└── README.md       # Hướng dẫn này
```

## 🔥 Animations chi tiết

### Card fade-in
```css
@keyframes cardFadeIn {
    0.8s cubic-bezier (0.16, 1, 0.3, 1)
    Từ opacity 0, translateY 30px → 1, 0
}
```

### Avatar
```css
- Scale 1.05 on hover
- 360° spin on mouseenter
- Float animation (chậm, tự động)
```

### Subcard
```css
- Hover: Sáng hơn + viền rõ hơn
- Click: Copy username + notification
```

### Chibi character
```css
@keyframes chibiFloat {
    3s infinite ease-in-out
    TranslateY 0 → -8px → 0
    Rotate 0 → 5° → 0
}
```

## 📱 Responsive breakpoints

| Screen | Max-width | Changes |
|--------|-----------|---------|
| Desktop | > 640px | Full size |
| Tablet | ≤ 640px | Avatar 90px, font smaller |
| Mobile | ≤ 480px | Compact padding, chibi 32px |

## 🎯 Browser support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS 14+)
- ⚠️ Note: `backdrop-filter` cần browser mới

## 💡 Tips

### Tối ưu ảnh nền
- Dùng ảnh 1920x1080 hoặc lớn hơn
- Nén qua [TinyPNG](https://tinypng.com/)
- Format WebP cho tốc độ tải nhanh

### Custom cursor
- Bật/tắt mouse trail trong `script.js`
- Thay đổi `Math.random() > 0.9` để điều chỉnh tần suất

### SEO
Thêm meta tags vào `<head>`:
```html
<meta name="description" content="Komi's profile - Đồng Nai">
<meta property="og:image" content="YOUR_AVATAR_URL">
<meta property="og:title" content="Komi - Profile">
```

## 🐛 Troubleshooting

**❓ Backdrop blur không hoạt động:**
- Kiểm tra browser có support không
- Thêm fallback: `-webkit-backdrop-filter: blur(20px);`

**❓ Ảnh nền không hiện:**
- Kiểm tra URL ảnh có đúng không
- Thử dùng ảnh từ CDN hoặc Unsplash

**❓ View counter reset:**
- localStorage bị clear
- Dùng backend (PHP/Node.js) để lưu persistent

**❓ Animations giật:**
- Kiểm tra GPU acceleration
- Thêm `will-change: transform` cho elements

## 🌐 Deploy

### Netlify (Free)
```bash
# Drag & drop thư mục vào netlify.com/drop
```

### Vercel
```bash
vercel --prod
```

### GitHub Pages
```bash
git init
git add .
git commit -m "Komi profile"
git branch -M main
git remote add origin YOUR_REPO
git push -u origin main
# Enable Pages in repo Settings
```

## 📚 Customization examples

### Example 1: Thêm social buttons
```html
<div class="social-links">
    <a href="#" class="social-btn">FB</a>
    <a href="#" class="social-btn">IG</a>
    <a href="#" class="social-btn">TW</a>
</div>
```

### Example 2: Music player
```html
<audio id="bgMusic" src="music.mp3" loop></audio>
<button onclick="document.getElementById('bgMusic').play()">
    🎵 Play
</button>
```

### Example 3: Multi-language
```javascript
const lang = {
    vi: { tagline: "Chỉ là 1 trang web" },
    en: { tagline: "Just a website" }
};
```

## 📞 Support

Nếu cần giúp đỡ:
- Email: komi@example.com
- Discord: komi_elaina#0001

---

Made with 💜 by Komi | Inspired by guns.lol
