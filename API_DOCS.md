# Guia da API: Microsserviço de Relatórios

Sua API está rodando na porta **3000** internamente e mapeada para a porta **9504** externamente (pelo Docker). O caminho base para testar localmente é `http://localhost:3000` (rodando com npm) ou `http://localhost:9504` (via Docker).

Abaixo está o manual de como utilizar os endpoints expostos pelo Restify.

---

## 1. Endpoints Centrais de Relatório

A finalidade dessas rotas é criar e buscar registros globais de relatórios.

### `POST /`
Cria um novo relatório geral (referenciando IDs de outras entidades).
* **Corpo (JSON)**:
```json
{
  "relatorio_emprestimo_id": 1,
  "relatorio_livro_id": 42,
  "relatorio_usuario_id": 15,
  "relatorio_status": 1
}
```

### `GET /`
Lista todos os relatórios cadastrados (exceto os que tem `status = 0`).

### `GET /:id`
Busca um relatório específico pelo seu ID (exemplo: `GET /5`).

### `PATCH /:id/status`
Altera apenas o status do relatório.
* **Corpo (JSON)**:
```json
{
  "relatorio_status": 2
}
```

### `DELETE /:id`
Inativa um relatório (soft delete), alterando seu `status` para `0`.

### `DELETE /limpar-antigos`
Inativa todos os relatórios que foram gerados há mais de 2 anos.

### `GET /exportar/csv`
Retorna os dados dos relatórios para exportação (atualmente retorna JSON, que pode ser convertido).

---

## 2. Endpoints de Snapshots de Livros

Salvam "fotografias" dos dados estatísticos dos livros em um dado momento.

### `POST /livros`
Gera um novo snapshot estatístico para um livro.
* **Corpo (JSON)**:
```json
{
  "titulo": "O Senhor dos Anéis",
  "total": 150,
  "inicio": "2024-01-01T00:00:00Z",
  "fim": "2024-05-12T00:00:00Z"
}
```

### `GET /livros`
Lista todos os snapshots de livros, ordenados do mais recente para o mais antigo.

### `GET /livros/:id`
Busca um snapshot específico pelo ID.

### `GET /livros/top`
Traz o **Top 10** dos livros mais lidos, somando os empréstimos registrados nos snapshots.

---

## 3. Endpoints de Snapshots de Usuários

Focados nas métricas dos usuários (quantidade de multas, empréstimos, atrasos).

### `POST /usuarios`
Registra a volumetria de um usuário no momento atual.
* **Corpo (JSON)**:
```json
{
  "nome": "João Silva",
  "emprestimos": 12,
  "atrasos": 2,
  "multas": 1
}
```

### `GET /usuarios`
Lista todos os snapshots de usuários registrados.

### `GET /usuarios/:id`
Busca os dados de snapshot de um usuário específico pelo ID.

### `GET /usuarios/inadimplentes`
Retorna todos os snapshots de usuários que possuem pelo menos 1 multa, ordenados de forma decrescente (quem tem mais multas primeiro).

---

## 4. Endpoints de Snapshots de Empréstimos

Guarda dados históricos sobre como um empréstimo ocorreu.

### `POST /emprestimos`
Registra um instantâneo de um empréstimo (datas e multas).
* **Corpo (JSON)**:
```json
{
  "data_emp": "2024-05-01T10:00:00Z",
  "data_prev": "2024-05-08T10:00:00Z",
  "data_dev": "2024-05-10T15:00:00Z", 
  "multa": 5.00
}
```
*(Nota: `data_dev` é opcional)*

### `GET /emprestimos`
Lista os históricos dos empréstimos.

### `GET /emprestimos/:id`
Busca o registro de um snapshot de empréstimo pelo ID.

---

## 5. Dashboards e Financeiro (KPIs)

Rotas prontas para alimentar gráficos de painéis administrativos.

### `GET /dashboard/kpis`
Retorna a volumetria total do sistema (livros, usuários e empréstimos totais que existem nos snapshots).
* **Resposta esperada**:
```json
{
  "success": true,
  "data": {
    "total_livros": 50,
    "total_usuarios": 120,
    "total_emprestimos": 300
  }
}
```

### `GET /financeiro/multas-total`
Faz a somatória financeira de todas as multas aplicadas registradas nos snapshots de empréstimo.
* **Resposta esperada**:
```json
{
  "success": true,
  "data": {
    "arrecadacao_total": 450.50
  }
}
```

---

## 6. Healthcheck (Docker)

### `GET /health`
Verifica se a API está viva. Usado internamente pelo Docker. Retorna `{"status": "UP"}`.
