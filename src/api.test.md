# API Testing - General

This document contains curl commands for testing general API functionality.

## Prerequisites

- Server must be running on `http://localhost:3000`

## Health Check

### Server Health

Check if the server is running properly and get basic information.

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-06-01T00:00:00.000Z",
  "service": "multstand-server-db"
}
```

## GraphQL Endpoints

### GraphQL Playground

Interactive GraphQL interface available at: `http://localhost:3000/graphql`

### GraphQL Schema Introspection

Get the complete GraphQL schema information.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query IntrospectionQuery { __schema { queryType { name fields { name type { name kind } } } mutationType { name fields { name type { name kind } } } } }"
  }' \
  http://localhost:3000/graphql
```

## Domain-Specific Testing

For domain-specific API tests, see:
- User Domain: `src/domains/user/curl.test.md`

## Notes

- Health endpoint uses simple HTTP GET request
- GraphQL endpoints use POST requests with JSON payload
- All GraphQL responses include `data` and optional `errors` fields 