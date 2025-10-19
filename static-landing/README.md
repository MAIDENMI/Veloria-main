# Veloria Landing Page - Static Version

This is a static HTML version of the Veloria landing page that can be deployed anywhere.

## Files Included:
- `index.html` - Main landing page
- `logon2.png` - Header logo
- `footern2.png` - Footer logo  
- `veloriavideo1.mp4` - Demo video

## Deployment Options:

### 1. Netlify (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `static-landing` folder onto Netlify
3. Your site will be live instantly!

### 2. Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import project and select this folder
3. Deploy as static site

### 3. GitHub Pages
1. Create a new repository
2. Upload these files
3. Enable GitHub Pages in settings

### 4. Any Web Host
Upload all files to your web hosting provider's public folder.

## Connect Your GoDaddy Domain:

Once deployed, you'll get a URL like `https://your-site.netlify.app`

### In GoDaddy DNS:
1. Go to DNS Management
2. Add these records:
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app

   Type: A  
   Name: @
   Value: 75.2.60.5 (for Netlify)
   ```

### In Your Hosting Platform:
1. Go to domain settings
2. Add your GoDaddy domain
3. SSL will be automatically configured

## Features:
- ✅ Fully responsive design
- ✅ Smooth animations
- ✅ Working video player
- ✅ Email signup form (stores in localStorage)
- ✅ All styling included (Tailwind CSS via CDN)
- ✅ No server dependencies
- ✅ Works everywhere!

Your Veloria landing page is ready to go live! 🚀
