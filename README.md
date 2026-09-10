# kaben-website
Site institucional kaben

## 🔐 Segurança: reCAPTCHA v3 + Proteções

Este projeto implementa **reCAPTCHA v3** com proteções adicionais:

- **reCAPTCHA v3 (invisível)**: Valida automaticamente sem incomodar usuários
- **Score threshold (0.5)**: Rejeita submissões com baixa confiança (provável bot)
- **Rate limiting (5/IP/hora)**: Protege contra abuso e spam
- **Sanitização HTML**: Escapa tags HTML para prevenir XSS na mensagem

## ⚙️ Configuração

### Variáveis de Ambiente Obrigatórias

```bash
# reCAPTCHA
VITE_RECAPTCHA_SITE_KEY=sua_site_key_v3
RECAPTCHA_SECRET_KEY=sua_secret_key_v3

# Email SMTP (Gmail com App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_aplicativo

# Destino
MAIL_TO=destino@exemplo.com
```

**⚠️ IMPORTANTE: App Password Gmail**
- Não use a senha normal do Gmail
- Gere em: https://myaccount.google.com/apppasswords
- Selecione "Mail" e "Windows Computer" (ou o que usar)

### Teste Local

```bash
npm install          # Instalar dependências
npm run dev         # Frontend (Vite) + API proxy
# Acesse http://localhost:9000
```

## 🚀 Deployment Vercel

### 1. Configurar Variáveis de Ambiente

No painel do Vercel:
1. Projeto → Settings → Environment Variables
2. Adicione:
   - `RECAPTCHA_SECRET_KEY` (Secret)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` (Secrets)
   - `MAIL_TO` (Public)
   - `VITE_RECAPTCHA_SITE_KEY` (Public, já no .env)

### 2. Deploy

```bash
git add .
git commit -m "feat: reCAPTCHA v3 com rate limiting e sanitização"
git push origin main
```

Vercel fará deploy automaticamente via webhook.

### 3. Testar Preview

```bash
npx vercel --prod  # Deploy em preview
# Abra a URL gerada e teste o formulário de contato
```

### 4. Verificar Logs

```bash
npx vercel logs
```

Procure por:
- `reCAPTCHA validado` (score confiável)
- `reCAPTCHA score baixo` (rejeitado)
- `Rate limit atingido` (IP bloqueado por 1 hora)

## 📊 Monitoramento

### Dashboard reCAPTCHA v3

Visualize estatísticas e scores: https://www.google.com/recaptcha/admin

Interprete os scores:
- **0.9 - 1.0**: Definitivamente humano ✅
- **0.5 - 0.9**: Provável humano ✅
- **0.0 - 0.5**: Provável bot ❌ (rejeitado pela API)

### Rate Limiting

- Máximo: 5 submissões por IP por hora
- Resposta 429: "Muitas tentativas. Tente novamente em X minuto(s)"
- Storage: In-Memory (reinicia a cada deploy no Vercel)

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

## 🔄 Fluxo de Submissão

```
1. Usuário carrega formulário
   ↓
2. reCAPTCHA v3 valida invisível
   → Score retornado ao handler
   → Botão "Enviar" aparece após validação
   ↓
3. Usuário submete formulário
   ↓
4. Backend valida:
   - Campos obrigatórios ✓
   - Email válido ✓
   - reCAPTCHA score ≥ 0.5 ✓
   - Rate limit não excedido ✓
   - HTML escapado ✓
   ↓
5. Envia email via SMTP
   ↓
6. Resposta ao usuário
```
