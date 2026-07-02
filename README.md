# kaben-website
Site institucional kaben

## Docker local

O Dockerfile agora aceita a variável de ambiente `VITE_RECAPTCHA_SITE_KEY` no build para que o frontend receba a chave pública do reCAPTCHA.

Para construir a imagem Docker localmente, execute:

```bash
export VITE_RECAPTCHA_SITE_KEY=$(grep '^VITE_RECAPTCHA_SITE_KEY=' .env.local | cut -d'=' -f2-)
docker build -f Dockerfile.vercel --build-arg VITE_RECAPTCHA_SITE_KEY="$VITE_RECAPTCHA_SITE_KEY" -t kaben-vercel-local .
```

Em seguida, execute o container usando o arquivo `.env.local` com as variáveis de runtime:

```bash
docker run --rm -p 3000:3000 --name kaben-vercel-local-test --env-file .env.local kaben-vercel-local
```

Se preferir, passe as variáveis explicitamente:

```bash
docker run --rm -p 3000:3000 --name kaben-vercel-local-test \
  -e RECAPTCHA_SECRET_KEY=SUA_SECRET_KEY \
  -e SMTP_HOST=smtp.gmail.com \
  -e SMTP_PORT=465 \
  -e SMTP_SECURE=true \
  -e SMTP_USER=EMAIL_DO_APLICATIVO_GMAIL \
  -e SMTP_PASS=SENHA_DO_APLICATIVO_GMAIL \
  -e MAIL_TO=EMAIL_DESTINO_CONTATO \
  kaben-vercel-local
```

> Observação: o `.env.local` não é incluído no contexto do Docker build, então ele só precisa ser fornecido em tempo de execução.
