# Simple Twitter API example

Essa API é responsável por gerenciar operações básicas de um sistema de posts similar ao Twitter. Ela oferece funcionalidades para criar, visualizar, atualizar e excluir posts, além de permitir a contagem de favoritos para cada post individualmente.

Os principais recursos disponíveis na API são:

1. **Listar Posts:** Retorna todos os posts existentes, ordenados por ID.
2. **Buscar Post por ID:** Obtém informações detalhadas de um post específico com base no seu ID.
3. **Criar Post:** Adiciona um novo post ao sistema, gerando um ID único automaticamente.
4. **Atualizar Post:** Permite a modificação dos dados de um post existente, identificado pelo seu ID.
5. **Atualizar Favoritos:** Incrementa a contagem de favoritos de um post específico.
6. **Excluir Post:** Remove um post do sistema com base no seu ID.

Essa API é útil para sistemas que requerem funcionalidades básicas de gerenciamento de posts, como redes sociais, blogs ou plataformas de compartilhamento de conteúdo.

## Rotas da API de Posts

### Obter todos os posts

- **URL:** `/posts`
- **Método:** `GET`
- **Descrição:** Retorna todos os posts existentes.
- **Resposta de Sucesso:**
    - **Código:** `200 OK`
    - **Conteúdo:** Array de objetos representando os posts.

### Obter um post específico por ID

- **URL:** `/posts/:id`
- **Método:** `GET`
- **Parâmetros de URL:** `id` (ID do post a ser buscado)
- **Descrição:** Retorna um post específico com base no ID fornecido.
- **Resposta de Sucesso:**
    - **Código:** `200 OK`
    - **Conteúdo:** Objeto representando o post encontrado.
- **Resposta de Erro:**
    - **Código:** `404 Not Found`
    - **Conteúdo:** `{ "error": "Post not found" }`

### Criar um novo post

- **URL:** `/posts`
- **Método:** `POST`
- **Descrição:** Cria um novo post.
- **Corpo da Requisição:** Objeto representando o novo post.
- **Resposta de Sucesso:**
    - **Código:** `200 OK`
    - **Conteúdo:** Objeto representando o post recém-criado.
- **Resposta de Erro:**
    - **Código:** `500 Internal Server Error`
    - **Conteúdo:** `{ "error": "Failed to save posts" }`

### Atualizar um post existente por ID

- **URL:** `/posts/:id`
- **Método:** `PUT`
- **Parâmetros de URL:** `id` (ID do post a ser atualizado)
- **Descrição:** Atualiza um post existente com base no ID fornecido.
- **Corpo da Requisição:** Objeto com os campos a serem atualizados.
- **Resposta de Sucesso:**
    - **Código:** `200 OK`
    - **Conteúdo:** Objeto representando o post atualizado.
- **Resposta de Erro:**
    - **Código:** `404 Not Found`
    - **Conteúdo:** `{ "error": "Post not found" }`
    - **Código:** `500 Internal Server Error`
    - **Conteúdo:** `{ "error": "Failed to save posts" }`

### Atualizar a quantidade de favoritos de um post

- **URL:** `/posts/:id/favorite`
- **Método:** `PUT`
- **Parâmetros de URL:** `id` (ID do post a ter a contagem de favoritos atualizada)
- **Descrição:** Incrementa a quantidade de favoritos de um post específico.
- **Resposta de Sucesso:**
    - **Código:** `200 OK`
    - **Conteúdo:** Objeto representando o post com a contagem de favoritos atualizada.
- **Resposta de Erro:**
    - **Código:** `404 Not Found`
    - **Conteúdo:** `{ "error": "Post not found" }`
    - **Código:** `500 Internal Server Error`
    - **Conteúdo:** `{ "error": "Failed to save posts" }`

### Excluir um post por ID

- **URL:** `/posts/:id`
- **Método:** `DELETE`
- **Parâmetros de URL:** `id` (ID do post a ser excluído)
- **Descrição:** Remove um post com base no ID fornecido.
- **Resposta de Sucesso:**
    - **Código:** `200 OK`
    - **Conteúdo:** Objeto representando o post excluído.
- **Resposta de Erro:**
    - **Código:** `404 Not Found`
    - **Conteúdo:** `{ "error": "Post not found" }`
    - **Código:** `500 Internal Server Error`
    - **Conteúdo:** `{ "error": "Failed to save posts" }`

---
