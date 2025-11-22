# Komi Profile - Netlify Deployment Guide

## 🚀 Deploy to Netlify (with Global View Counter)

### Prerequisites
- GitHub account
- Netlify account (free)

### Step 1: Push to GitHub

```bash
cd "H:\du an 1\komi-profile"
git init
git add .
git commit -m "Initial commit - Komi Profile with Netlify Functions"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and select your repo
4. Deploy settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `.` (current directory)
   - Click **"Deploy site"**

### Step 3: Done! 🎉

Your site will be live at: `https://your-site.netlify.app`

The view counter will **automatically work** using Netlify Functions!

---

## 📊 How it works

### Local (localhost):
- Uses **localStorage**
- Each person tracks their own views
- Perfect for testing

### Production (Netlify):
- Uses **Netlify Functions** (serverless backend)
- Stores views in **Netlify Blobs** (persistent storage)
- **Global counter** for all visitors
- **FREE tier** includes:
  - 125,000 function requests/month
  - 100 GB Blob storage

---

## 🔧 Testing Netlify Functions Locally

Install Netlify CLI:
```bash
npm install -g netlify-cli
```

Run locally:
```bash
cd "H:\du an 1\komi-profile"
netlify dev
```

This will start a local server that simulates Netlify environment!

---

## 📁 File Structure

```
komi-profile/
├── netlify/
│   └── functions/
│       ├── views.js           # Serverless function
│       └── package.json       # Function dependencies
├── netlify.toml               # Netlify config
├── index.html
├── style.css
├── script.js                  # Calls /.netlify/functions/views
└── README.md
```

---

## 🐛 Troubleshooting

**Function not working after deploy:**
1. Check Netlify dashboard → Functions tab
2. Click on `views` function
3. Check logs for errors

**Views reset to 0:**
- Netlify Blobs are persistent
- If reset happens, check function logs

**CORS errors:**
- Already handled in `views.js`
- Headers include `Access-Control-Allow-Origin: *`

---

## 💡 Alternative: Use Netlify KV (if Blobs don't work)

Replace `views.js` content with:

```javascript
// Simple counter without external deps
let viewCount = 0;

exports.handler = async () => {
  viewCount++;
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ views: viewCount })
  };
};
```

**Note:** This resets on each deploy, but works immediately!

---

## 🎯 Next Steps

After deploy:
1. Test the live site
2. Refresh multiple times → Views should increase globally
3. Open in another browser/device → Views persist!

---

Need help? Check [Netlify Functions docs](https://docs.netlify.com/functions/overview/)
