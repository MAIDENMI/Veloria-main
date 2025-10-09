# # 🌿 Veloria - AI Therapy Application

A modern, AI-powered therapy application built with Next.js, featuring real-time voice conversations, emotional analysis, and personalized therapeutic sessions.

## ✨ Features

- **🎤 Real-time Voice Conversations** - Powered by ElevenLabs WebSocket integration
- **🤖 AI Therapy Sessions** - Intelligent conversational AI for therapeutic support
- **👤 3D Avatar Integration** - Interactive talking head with lip-sync
- **📊 Session History** - Track and review past therapy sessions
- **📄 PDF Export** - Export session transcripts and insights
- **🔐 Secure Authentication** - Google OAuth integration with NextAuth
- **📱 Responsive Design** - Works seamlessly on desktop and mobile
- **🎨 Modern UI** - Beautiful, accessible interface with Tailwind CSS

## 🚀 Live Demo

- **Frontend**: [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/MAIDENMI/Veloria-main&project-name=veloria-ai-therapy&root-directory=frontend)
- **Repository**: https://github.com/MAIDENMI/Veloria-main

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **NextAuth.js** - Authentication solution
- **ElevenLabs** - Voice AI integration
- **TalkingHead** - 3D avatar system

### Backend Services
- **Python FastAPI** - AI processing and Gemini integration
- **Node.js Express** - Voice processing service
- **TalkingHead Server** - Avatar rendering service

## 📦 Project Structure

```
Veloria-main/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable components
│   │   ├── hooks/           # Custom React hooks
│   │   └── types/           # TypeScript definitions
│   ├── public/              # Static assets
│   └── package.json
├── Backend/
│   ├── python-service/      # AI processing service
│   ├── node-service/        # Voice processing service
│   └── talkinghead/         # Avatar service
└── start-all-services.sh    # Development startup script
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- ElevenLabs API key and Agent ID
- Google OAuth credentials (for authentication)
- Gemini API key (for AI processing)

### 1. Clone Repository
```bash
git clone https://github.com/MAIDENMI/Veloria-main.git
cd Veloria-main
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
```

### 3. Configure Environment Variables

Edit `frontend/.env.local`:
```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ElevenLabs
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id

# Backend Services
NEXT_PUBLIC_BACKEND_CHAT_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_VOICE_URL=http://localhost:8001
NEXT_PUBLIC_TALKINGHEAD_URL=http://localhost:8080
```

### 4. Backend Setup

**Python Service:**
```bash
cd Backend/python-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

**Node Service:**
```bash
cd Backend/node-service
npm install
cp .env.example .env
# Edit .env and add your ELEVENLABS_API_KEY
```

### 5. Start All Services
```bash
# From project root
chmod +x start-all-services.sh
./start-all-services.sh
```

Or start individually:
```bash
# Terminal 1: Frontend
cd frontend && npm run dev

# Terminal 2: Python AI Service
cd Backend/python-service && python main.py

# Terminal 3: Node Voice Service
cd Backend/node-service && npm start

# Terminal 4: TalkingHead Service
cd Backend/talkinghead && python -m http.server 8080
```

### 6. Access Application
- **Frontend**: http://localhost:3000
- **Therapy Session**: http://localhost:3000/call

## 🔧 API Keys Setup

### ElevenLabs
1. Go to [ElevenLabs Dashboard](https://elevenlabs.io/app/conversational-ai)
2. Create or select an agent
3. Copy the Agent ID and API key

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### Gemini API
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Generate an API key for Gemini

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done!)
2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Add environment variables in Vercel dashboard

3. **Environment Variables for Production**:
   ```bash
   NEXTAUTH_URL=https://your-vercel-url.vercel.app
   NEXTAUTH_SECRET=your_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
   NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
   ```

### Deploy Backend Services
- **Railway**: Easy deployment for Python/Node services
- **Render**: Free tier available
- **Heroku**: Traditional platform
- **AWS/GCP**: Enterprise solutions

## 📚 Documentation

- [Frontend Setup Guide](frontend/README.md)
- [Authentication Setup](frontend/AUTH_SETUP.md)
- [ElevenLabs Integration](frontend/ELEVENLABS_WEBSOCKET_SETUP.md)
- [Environment Variables](frontend/ENV_SETUP.md)
- [Quick Start Guide](frontend/QUICK_START.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/MAIDENMI/Veloria-main/issues)
- **Discussions**: [GitHub Discussions](https://github.com/MAIDENMI/Veloria-main/discussions)

## 🙏 Acknowledgments

- [ElevenLabs](https://elevenlabs.io) for voice AI technology
- [Next.js](https://nextjs.org) team for the amazing framework
- [TalkingHead](https://github.com/met4citizen/TalkingHead) for 3D avatar integration
- [Vercel](https://vercel.com) for seamless deployment

---

**Built with ❤️ for mental health and AI innovation**