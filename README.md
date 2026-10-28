# Yomi Fabiyi — Portfolio

Django + DRF API (`backend/`) and a Next.js App Router frontend (`frontend/`) with Tailwind CSS and Framer Motion.

## Prerequisites
- Python 3.11+  ·  Node.js 20.9+ (LTS 22 recommended) with npm  ·  Git

## Run locally

### 1. Backend (http://localhost:8000)
```bash
cd backend
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations portfolio              # migrations are not pre-generated
python manage.py migrate
python manage.py seed                                  # loads portfolio/fixtures/content.json
python manage.py createsuperuser                       # then manage content at /admin/
python manage.py runserver
python manage.py test                                  # optional: API tests
```

### 2. Frontend (http://localhost:3000)
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```
If the API is down, the site still renders from the bundled `src/lib/content.json`.

## API
`GET /api/profile/` · `/api/projects/` (`?featured=true`) · `/api/projects/<slug>/` · `/api/skills/` · `/api/resume/` · `/api/resume/download/` · `POST /api/contact/`
Upload your resume PDF on the Profile in `/admin/` to enable the Download PDF button.

## Replace before publishing (placeholders)
- `yomi@example.com`, GitHub/LinkedIn URLs, project demo/source/docs URLs
- Corpsly metrics (1.8k / 99.9% / <45ms) and the code snippet: make sure they are true
- Experience entry on the resume; add Education in `/admin/`
- Project screenshots: upload `cover_image` on each Project (a placeholder mock shows until then)

## Deploy
`render.yaml` defines Postgres + Django + Next.js services. Set `BACKEND_URL` / `NEXT_PUBLIC_API_URL` to the API's public URL, and add the site URL to `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`. Uploaded media (covers, resume) lives on Render's ephemeral disk; move to S3 for permanence.
