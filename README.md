# Fluxy Entregas Front End
 
Aplicação desenvolvida em **React + Vite**, utilizando **React Router** para gerenciamento de rotas e componentes separados para organização. O objetivo deste projeto é gerenciar os serviços de entregas que uma empresa precisa fazer.

## Tecnologias Utilizadas

- **React**
- **Vite**
- **React Router DOM**
- **CSS Modules**
- **Axios**

---

## Estrutura do Projeto (simplificado)

- Temos a pasta src que possui nossos componentes, routes, services e styles


## Como rodar o projeto?

Clone o repositorio abaixo:
https://github.com/GabrielLS88/fluxy_entregas_frontend

Apos baixar você precisa configurar o .env na raiz do projeto com as variaveis de ambiente:
VITE_API_URL="http://localhost:5090" -> URL do backend
VITE_TOKEN_API_URL="Bearer 795b57b1-0d5c-4f77-9259-473afafac234-1960657" -> Token fixo que o backend esta esperando receber

Agora vamos baixar as dependencias com o comando "npm i" no terminal de comando dentro da raiz do projeto
Depois rodar "npm run dev" que ele começa a fica disponivel na url  "http://localhost:3494/"