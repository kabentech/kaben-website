# kaben-website
Site institucional kaben

## Desenvolvimento local

```bash
npm install
npm run dev
```

O frontend roda em `http://localhost:9000`. O endpoint `/api/send-contact-email` é uma Vercel Serverless Function ([api/send-contact-email.js](api/send-contact-email.js)); para testá-lo localmente use a Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Configure as variáveis de ambiente em `.env.local` a partir de [.env.example](.env.example) (chaves de reCAPTCHA e credenciais SMTP).

## Deploy

O deploy é feito na Vercel via `vercel.json` (build estático do Vite + funções serverless em `api/`). Configure as variáveis de ambiente do projeto no painel da Vercel.

