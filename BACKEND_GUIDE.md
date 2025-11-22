# 🚀 Hướng dẫn chạy Backend API

## Bước 1: Cài đặt Node.js

Tải và cài Node.js từ [nodejs.org](https://nodejs.org/) (khuyên dùng LTS version)

Kiểm tra:
```bash
node --version
npm --version
```

## Bước 2: Cài dependencies

Mở terminal tại thư mục `komi-profile`:

```bash
cd "H:\du an 1\komi-profile"
npm install
```

Lệnh này sẽ cài:
- `express` - Web framework
- `cors` - Enable CORS cho frontend

## Bước 3: Chạy backend server

```bash
npm start
```

Hoặc dùng nodemon (auto-restart khi code thay đổi):
```bash
npm run dev
```

Server sẽ chạy tại: **http://localhost:3000**

## Bước 4: Chạy frontend

**Option 1: Dùng Live Server (VS Code)**
- Cài Live Server extension
- Right-click `index.html` → Open with Live Server

**Option 2: Python server**
```bash
# Mở terminal khác
cd "H:\du an 1\komi-profile"
python -m http.server 8080
```

Frontend chạy tại: **http://localhost:8080**

## ✅ Kiểm tra hoạt động

1. **Backend**: Mở http://localhost:3000/api/health
   - Kết quả: `{"status":"OK",...}`

2. **Frontend**: Mở http://localhost:8080
   - View counter sẽ tăng mỗi lần refresh!

## 📡 API Endpoints

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/views` | Tăng view count +1 và trả về số mới |
| GET | `/api/views/current` | Lấy view count hiện tại (không tăng) |
| POST | `/api/views/reset` | Reset view về 0 |
| GET | `/api/health` | Health check |

## 🧪 Test API

### Tăng view count
```bash
curl http://localhost:3000/api/views
```

### Xem current views
```bash
curl http://localhost:3000/api/views/current
```

### Reset views
```bash
curl -X POST http://localhost:3000/api/views/reset
```

## 🐛 Troubleshooting

### ❓ "npm: command not found"
- Chưa cài Node.js
- Restart terminal sau khi cài

### ❓ "Port 3000 already in use"
- Đổi PORT trong `server.js`:
  ```javascript
  const PORT = 3001; // Thay vì 3000
  ```
- Update API_URL trong `script.js`:
  ```javascript
  const API_URL = 'http://localhost:3001/api/views';
  ```

### ❓ Frontend hiện "—" thay vì số
- Backend chưa chạy
- Check console: F12 → Console tab
- Đảm bảo cả backend và frontend đều chạy

### ❓ CORS error
- Đã include `cors` package trong server.js
- Nếu vẫn lỗi, check `app.use(cors())`

## 📁 File structure

```
komi-profile/
├── server.js          # Backend API
├── views.json         # View count data
├── package.json       # Dependencies
├── index.html         # Frontend
├── style.css
├── script.js          # Calls backend API
└── BACKEND_GUIDE.md   # File này
```

## 🌐 Deploy to Production

### Backend (Backend-as-a-Service)

**Vercel:**
```bash
vercel --prod
```

**Heroku:**
```bash
heroku create
git push heroku main
```

**Railway:**
- Link GitHub repo
- Auto-deploy

### Frontend
- Deploy bình thường (Netlify/Vercel/GitHub Pages)
- Update `API_URL` trong `script.js` thành production URL

### Database upgrade
Nếu traffic cao, thay `views.json` bằng:
- **MongoDB** - Dùng MongoDB Atlas (free tier)
- **PostgreSQL** - Dùng Supabase/Railway
- **Redis** - Upstash Redis (free tier)

## 💡 Tips

1. **Chạy background**: Dùng PM2
   ```bash
   npm install -g pm2
   pm2 start server.js --name komi-api
   pm2 save
   ```

2. **View logs**:
   ```bash
   pm2 logs komi-api
   ```

3. **Stop server**:
   ```bash
   pm2 stop komi-api
   ```

4. **Environment variables**: Tạo `.env`
   ```
   PORT=3000
   NODE_ENV=production
   ```

---

Need help? Check console logs hoặc liên hệ! 🚀
