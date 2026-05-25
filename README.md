# Sabor da Ilha

Site completo em React + Vite para um restaurante regional paraense, com páginas de Home, Cardápio, Delivery, Reservas e Cadastro de Clientes. A navegação usa React Router e os formulários gravam dados no Supabase.

## Instalação

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

## Tabelas no Supabase

Execute o arquivo `supabase-schema.sql` no editor SQL do Supabase. Ele recria as tabelas relacionadas:

- `clientes`: tabela principal.
- `reservas`: possui `cliente_id` referenciando `clientes.id`.
- `pedidos_delivery`: possui `cliente_id` referenciando `clientes.id`.

Assim, um cliente pode ter várias reservas e vários pedidos de delivery.

## Execução local

```bash
npm run dev
```

Acesse o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Publicação na Vercel

1. Envie o projeto para um repositório no GitHub.
2. Na Vercel, clique em `Add New Project` e importe o repositório.
3. Framework preset: `Vite`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Em `Environment Variables`, adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
7. O arquivo `vercel.json` já inclui o rewrite para o React Router funcionar ao recarregar páginas internas.
8. Clique em `Deploy`.

## PageSpeed

O projeto foi pensado para boa pontuação em computador: sem imagens pesadas, CSS único, componentes simples, layout responsivo, SVGs de ícones via biblioteca e build otimizado pelo Vite.
