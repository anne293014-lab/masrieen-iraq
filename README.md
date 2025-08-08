# Masrieen-Iraq - Starter Project

This is a minimal full-stack starter demo for "مسرعين العراق".

## Structure
- backend/: Express server with demo endpoints
- frontend/: Vite + React frontend (RTL Arabic)

## Run locally
### Backend
```
cd backend
npm install
# for development: npm run dev  (requires nodemon)
npm start
```

### Frontend
```
cd frontend
npm install
npm run dev
# open the URL printed by Vite (usually http://localhost:5173)
```

## Notes
- Google/Firebase auth is not fully configured in this demo. To enable, add Firebase project and service account.
- AI assistant endpoint is a stub — to enable real answers set OPENAI_API_KEY in backend env and implement OpenAI call in server.js.
- To deploy online: host backend on Render/Heroku/Vercel Serverless, frontend on Vercel/Netlify.
