# Deploy Instructions - MonteCodeSystem

## GitHub Export

1. Acesse: https://github.com/kennedyglobank-bot
2. Crie um novo repositório chamado: `MonteCodeSystem_Vercel_Supabase`
3. Clone este projeto localmente
4. Faça push para o GitHub

```bash
git remote add github https://github.com/kennedyglobank-bot/MonteCodeSystem_Vercel_Supabase.git
git push -u github main
```

## Vercel Deployment

1. Acesse: https://vercel.com/new
2. Selecione "Import Git Repository"
3. Cole a URL: https://github.com/kennedyglobank-bot/MonteCodeSystem_Vercel_Supabase
4. Configure as variáveis de ambiente:
   - DATABASE_URL (do Supabase)
   - JWT_SECRET
   - VITE_APP_ID
   - OAUTH_SERVER_URL
   - VITE_OAUTH_PORTAL_URL

## Supabase Setup

1. Acesse: https://supabase.com
2. Crie um novo projeto
3. Copie a connection string (DATABASE_URL)
4. Execute as migrações do banco de dados

```bash
pnpm drizzle-kit migrate
```

## Environment Variables

Adicione no Vercel:
- DATABASE_URL
- JWT_SECRET
- VITE_APP_ID
- OAUTH_SERVER_URL
- VITE_OAUTH_PORTAL_URL
- OWNER_OPEN_ID
- OWNER_NAME
