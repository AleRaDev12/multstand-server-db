# User Domain API Testing

This document contains curl commands for testing all available GraphQL operations for the User domain.

## Prerequisites

- Server must be running on `http://localhost:3000`

## Available Operations

### 1. Get All Users

Query to retrieve all users in the system.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { users { id name telegramUserId role } }"
  }' \
  http://localhost:3000/graphql
```

### 2. Get User by ID

Query to retrieve a specific user by their ID.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { user(id: 1) { id name telegramUserId role } }"
  }' \
  http://localhost:3000/graphql
```

### 3. Create New User (Manager)

Mutation to create a new user with MANAGER role.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createUser(createUserInput: { name: \"New Manager\", telegramUserId: 999888777, role: MANAGER }) { id name telegramUserId role } }"
  }' \
  http://localhost:3000/graphql
```

### 4. Create New User (Master)

Mutation to create a new user with MASTER role.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createUser(createUserInput: { name: \"New Master\", telegramUserId: 111222333, role: MASTER }) { id name telegramUserId role } }"
  }' \
  http://localhost:3000/graphql
```

### 5. Create User (Minimal Data)

Mutation to create a user with only required fields.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createUser(createUserInput: { role: UNREGISTERED }) { id name telegramUserId role } }"
  }' \
  http://localhost:3000/graphql
```

### 6. Update User (Full Update)

Mutation to update user name and role. Replace ID with existing user ID.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { updateUser(updateUserInput: { id: 15, name: \"Updated Name\", role: MASTER }) { id name telegramUserId role } }"
  }' \
  http://localhost:3000/graphql
```

### 7. Update User (Partial Update)

Mutation to update only specific fields. Replace ID with existing user ID.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { updateUser(updateUserInput: { id: 15, name: \"Only New Name\" }) { id name telegramUserId role } }"
  }' \
  http://localhost:3000/graphql
```

### 8. Delete User

Mutation to remove a user. Replace ID with existing user ID.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { removeUser(id: 999) }"
  }' \
  http://localhost:3000/graphql
```

## Error Testing

### 9. Non-existent User

Test error handling for non-existent user ID.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { user(id: 99999) { id name role } }"
  }' \
  http://localhost:3000/graphql
```

### 10. Invalid Role Validation

Test validation with invalid user role.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { createUser(createUserInput: { name: \"Test\", role: INVALID_ROLE }) { id name role } }"
  }' \
  http://localhost:3000/graphql
```

## General API Testing

For general server functionality (health check, schema introspection), see: `src/api.test.md`

## User Roles

Available user roles in the system:
- `MANAGER` - Workshop manager
- `MASTER` - Workshop master/craftsman  
- `UNREGISTERED` - Unregistered user
- `UNKNOWN` - Unknown role

## Response Format

All GraphQL responses follow this format:

```json
{
  "data": {
    // ... requested data
  },
  "errors": [
    // ... any errors (optional)
  ]
}
```

## Notes

- Replace placeholder IDs (15, 999, etc.) with actual user IDs from your database
- All mutations return the affected user object
- The `removeUser` mutation returns a boolean indicating success
- GraphQL Playground provides an interactive interface for testing: `http://localhost:3000/graphql` 
