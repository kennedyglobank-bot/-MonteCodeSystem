# Manual de Deploy Simplificado: MonteCodeSystem

Olá! Este manual foi feito para você, que está começando e quer colocar seu sistema no ar. Vamos juntos, passo a passo, para publicar o seu projeto **MonteCodeSystem** usando o **GitHub** (para guardar seu código), o **Supabase** (para o banco de dados) e o **Vercel** (para hospedar seu site).

Não se preocupe com termos técnicos. Vou explicar tudo de forma simples e direta!

---

## Parte 1: Guardando seu Código no GitHub

O GitHub é como um 
grande armário onde você guarda todo o seu código. Ele também ajuda a controlar as mudanças que você faz.

### Passo 1.1: Criar sua Conta no GitHub (se já não tiver)

1.  Acesse o site do [GitHub](https://github.com/).
2.  Clique em **"Sign up"** (Registrar-se) e siga as instruções para criar sua conta. É grátis!

### Passo 1.2: Criar um Novo "Armário" (Repositório)

1.  Depois de fazer login, clique no sinal de **"+"** no canto superior direito da tela e selecione **"New repository"** (Novo repositório).

    *   **Nome do repositório:** `MonteCodeSystem` (ou um nome que você goste).
    *   **Descrição:** (Opcional) `Meu sistema de gerenciamento.`
    *   **Público ou Privado:** Escolha **"Private"** (Privado) se você não quiser que outras pessoas vejam seu código, ou **"Public"** (Público) se quiser compartilhar.
    *   **NÃO** marque as opções "Add a README file", "Add .gitignore" ou "Choose a license".

2.  Clique em **"Create repository"** (Criar repositório).

    *   **O que você verá:** Uma página com algumas instruções de linha de comando. Não se preocupe, vamos usá-las agora.

### Passo 1.3: Colocar seu Código no GitHub

Agora, vamos "empacotar" seu projeto e enviá-lo para o GitHub. Você precisará usar o **Terminal** (no Windows, pode ser o `Git Bash` ou `Prompt de Comando`; no Mac/Linux, é o `Terminal`).

1.  **Abra o Terminal** na pasta onde você descompactou o projeto `MonteCodeSystem_Supabase_Ready.tar.gz`.
    *   **Dica:** No Windows, você pode clicar com o botão direito na pasta e procurar por "Abrir Git Bash aqui" ou "Abrir no Terminal".

2.  **Copie e cole os seguintes comandos, um por um, e pressione Enter após cada um:**

    ```bash
    # Isso diz ao seu computador que esta pasta é um projeto Git
    git init

    # Isso adiciona todos os arquivos do seu projeto para serem enviados
    git add .

    # Isso cria um "pacote" com seus arquivos e uma mensagem sobre o que você fez
    git commit -m "Primeiro envio do MonteCodeSystem para o GitHub"

    # Isso conecta seu projeto local com o "armário" que você criou no GitHub
    # ATENÇÃO: Substitua SEU_USUARIO pelo seu nome de usuário do GitHub!
    git remote add origin https://github.com/SEU_USUARIO/MonteCodeSystem.git

    # Isso define o nome da sua "ramificação" principal como 'main'
    git branch -M main

    # E finalmente, isso envia todo o seu código para o GitHub!
    git push -u origin main
    ```

    *   **O que esperar:** O terminal vai pedir seu nome de usuário e senha do GitHub (ou um Token de Acesso Pessoal, se você configurou). Depois de autenticar, você verá mensagens indicando que os arquivos estão sendo enviados.

3.  **Verifique no GitHub:** Volte para a página do seu repositório no GitHub e atualize a página. Você deverá ver todos os seus arquivos lá!

---

## Parte 2: Configurando o Banco de Dados no Supabase

O Supabase é onde seu sistema vai guardar todas as informações (usuários, reservas, contratos, etc.). Ele usa um tipo de banco de dados chamado PostgreSQL, que já preparamos seu projeto para usar.

### Passo 2.1: Criar sua Conta no Supabase (se já não tiver)

1.  Acesse o site do [Supabase](https://supabase.com/).
2.  Clique em **"Start your project"** (Comece seu projeto) ou **"Sign up"** e crie sua conta. Você pode usar sua conta do GitHub para facilitar.

### Passo 2.2: Criar um Novo Projeto no Supabase

1.  Depois de fazer login, clique em **"New project"** (Novo projeto).

    *   **Name:** `MonteCodeSystem-DB` (ou um nome que você goste).
    *   **Database Password:** Crie uma senha **FORTE** e **ANOTE-A** em um lugar seguro. Você vai precisar dela!
    *   **Region:** Escolha a região mais próxima de você ou dos seus usuários (ex: `São Paulo, Brazil`).

2.  Clique em **"Create new project"** (Criar novo projeto).

    *   **O que você verá:** O Supabase vai levar alguns minutos para configurar seu banco de dados.

### Passo 2.3: Pegar a "Chave" do seu Banco de Dados (DATABASE_URL)

Essa chave é o endereço que seu sistema usará para se conectar ao banco de dados.

1.  No painel do seu projeto Supabase, vá em **"Project Settings"** (Configurações do Projeto) no menu lateral esquerdo.
2.  Clique em **"Database"** (Banco de Dados).
3.  Role a página até a seção **"Connection string"** (String de Conexão).
4.  Certifique-se de que a opção **"URI"** esteja selecionada.
5.  **Copie a string de conexão completa.** Ela começa com `postgresql://`.

    *   **ATENÇÃO:** A string de conexão terá `[YOUR-PASSWORD]` no meio. Você **DEVE** substituir `[YOUR-PASSWORD]` pela senha forte que você criou no Passo 2.2. Por exemplo:
        `postgresql://postgres:MINHA_SENHA_FORTE@db.abc123xyz.supabase.co:5432/postgres`

    *   **Guarde esta string de conexão em um lugar seguro!** Você vai precisar dela em breve.

---

## Parte 3: Publicando seu Site no Vercel

O Vercel é o serviço que vai "colocar seu site no ar" para que qualquer pessoa possa acessá-lo pela internet.

### Passo 3.1: Criar sua Conta no Vercel (se já não tiver)

1.  Acesse o site do [Vercel](https://vercel.com/).
2.  Clique em **"Sign Up"** (Registrar-se) e escolha **"Continue with GitHub"** (Continuar com GitHub). Isso facilita muito a conexão com seu código.

### Passo 3.2: Importar seu Projeto do GitHub para o Vercel

1.  Depois de fazer login, clique em **"Add New..."** (Adicionar Novo...) no canto superior direito e selecione **"Project"** (Projeto).
2.  O Vercel vai mostrar uma lista dos seus repositórios do GitHub. Encontre e clique em **"Import"** (Importar) ao lado do repositório `MonteCodeSystem` que você criou.

### Passo 3.3: Configurar as "Chaves Secretas" (Variáveis de Ambiente)

Esta é uma parte muito importante! Seu sistema precisa de algumas informações secretas para funcionar, como a chave do banco de dados e outras configurações.

1.  Na tela de configuração do projeto no Vercel, role a página até a seção **"Environment Variables"** (Variáveis de Ambiente).
2.  Você precisará adicionar as seguintes variáveis, uma por uma. Para cada uma, digite o **Nome** e o **Valor** e clique em **"Add"** (Adicionar).

    | Nome da Variável | Onde Encontrar o Valor (ou o que fazer) |
    | :--- | :--- |
    | `DATABASE_URL` | A string de conexão do Supabase que você pegou no **Passo 2.3**. **Lembre-se de substituir `[YOUR-PASSWORD]` pela sua senha!** |
    | `JWT_SECRET` | Crie uma frase ou sequência de letras e números **BEM LONGA E ALEATÓRIA**. Exemplo: `minha_super_chave_secreta_para_o_sistema_montecode_2024_xyz123abc` |
    | `VITE_APP_ID` | Este valor está no arquivo `.project-config.json` que você baixou do Manus. Procure por `"VITE_APP_ID": "seu_valor_aqui"`. |
    | `OAUTH_SERVER_URL` | `https://api.manus.im` |
    | `VITE_OAUTH_PORTAL_URL` | `https://manus.im` |
    | `OWNER_OPEN_ID` | Este valor está no arquivo `.project-config.json`. Procure por `"OWNER_OPEN_ID": "seu_valor_aqui"`. |
    | `OWNER_NAME` | Este valor está no arquivo `.project-config.json`. Procure por `"OWNER_NAME": "seu_valor_aqui"`. |
    | `BUILT_IN_FORGE_API_URL` | `https://forge.manus.ai` |
    | `BUILT_IN_FORGE_API_KEY` | Este valor está no arquivo `.project-config.json`. Procure por `"BUILT_IN_FORGE_API_KEY": "seu_valor_aqui"`. |

    *   **Dica:** O arquivo `.project-config.json` está dentro da pasta raiz do seu projeto. Você pode abri-lo com um editor de texto simples (como Bloco de Notas no Windows ou TextEdit no Mac).

### Passo 3.4: Fazer o Deploy (Publicar)

1.  Depois de adicionar todas as variáveis de ambiente, clique em **"Deploy"** (Publicar).

    *   **O que esperar:** O Vercel vai começar a construir seu projeto e publicá-lo. Isso pode levar alguns minutos. Você verá uma tela de progresso.

2.  **Sucesso!** Quando terminar, o Vercel vai te mostrar uma tela de sucesso com um link para o seu site. Clique nele para ver seu sistema funcionando!

---

## Parte 4: Criando as Tabelas no seu Banco de Dados (Migração)

Mesmo com o site no ar, o banco de dados ainda está "vazio". Precisamos dizer ao Supabase quais tabelas e colunas seu sistema precisa.

1.  **Volte para o Terminal** na pasta do seu projeto.

2.  **Instale as ferramentas necessárias:**

    ```bash
    # Isso instala todas as dependências do projeto
    pnpm install
    ```

    *   **O que esperar:** O terminal vai baixar e instalar vários pacotes. Pode demorar um pouco.

3.  **Crie um arquivo `.env`:** Na raiz da pasta do seu projeto, crie um novo arquivo chamado `.env` (sim, com um ponto na frente e sem nome antes do ponto).

4.  **Dentro do arquivo `.env`, cole a sua `DATABASE_URL`:**

    ```
    DATABASE_URL="sua_string_de_conexao_do_supabase_aqui"
    ```

    *   **Lembre-se:** Use a string de conexão **COMPLETA** do Supabase, com a senha já substituída!

5.  **Execute o comando de migração:**

    ```bash
    # Isso envia a "planta" do seu banco de dados para o Supabase
    pnpm run db:push
    ```

    *   **O que esperar:** O terminal vai se conectar ao seu Supabase e criar todas as tabelas (usuários, reservas, contratos, etc.) que seu sistema precisa. Você verá mensagens de sucesso.

6.  **Verifique no Supabase:** Você pode ir no painel do seu projeto Supabase, clicar em **"Table Editor"** (Editor de Tabelas) no menu lateral, e deverá ver as tabelas criadas.

---

## Parabéns!

Seu sistema **MonteCodeSystem** está agora hospedado no Vercel, usando o GitHub para o código e o Supabase para o banco de dados. Você conseguiu!
