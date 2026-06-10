# Guia de Deploy: MonteCodeSystem (Supabase + Vercel)

Este guia detalha como hospedar o sistema **MonteCodeSystem** utilizando **GitHub**, **Supabase** (PostgreSQL) e **Vercel**. O projeto já foi migrado de MySQL para PostgreSQL para total compatibilidade com o Supabase.

## 1. Preparação do Repositório (GitHub)

1. Crie um novo repositório no [GitHub](https://github.com/) chamado `MonteCodeSystem`.
2. No seu terminal local, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Migração para PostgreSQL e preparação para deploy"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/MonteCodeSystem.git
git push -u origin main
```

## 2. Configuração do Banco de Dados (Supabase)

1. Crie um projeto no [Supabase](https://supabase.com/).
2. Vá em **Project Settings** > **Database**.
3. Em **Connection string**, selecione **URI** e copie a URL. 
   - Ela será algo como: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres`
   - **Importante:** Substitua `[YOUR-PASSWORD]` pela senha que você definiu ao criar o projeto.

## 3. Configuração na Vercel

1. Importe o repositório do GitHub na [Vercel](https://vercel.com/).
2. Adicione as seguintes **Environment Variables**:

| Variável | Descrição |
| :--- | :--- |
| `DATABASE_URL` | A URI do Supabase que você copiou no passo anterior. |
| `JWT_SECRET` | Uma string aleatória (ex: `sua_chave_secreta_aqui`). |
| `VITE_APP_ID` | O ID do app (encontrado no `.project-config.json`). |
| `OAUTH_SERVER_URL` | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | `https://manus.im` |
| `OWNER_OPEN_ID` | Seu OpenID do Manus. |
| `OWNER_NAME` | Seu Nome. |

3. Clique em **Deploy**.

## 4. Criando as Tabelas (Migração)

Após o deploy, você precisa criar a estrutura do banco de dados no Supabase. No seu terminal local:

```bash
# Instale as dependências
pnpm install

# Envie o schema para o Supabase
# Certifique-se de ter o DATABASE_URL no seu arquivo .env local
pnpm run db:push
```

## Notas Técnicas da Migração
- O driver foi alterado de `mysql2` para `postgres.js`.
- Os tipos de dados no `schema.ts` foram convertidos de MySQL para PostgreSQL (ex: `serial`, `pgTable`, `pgEnum`).
- O método de "upsert" no banco de dados foi alterado de `onDuplicateKeyUpdate` (MySQL) para `onConflictDoUpdate` (PostgreSQL).
- O arquivo `vercel.json` já está configurado para lidar com o roteamento da API e do Frontend.
