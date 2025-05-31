# Multstand DB Server Architecture

## 📁 Project Structure

```
src/
├── main.ts                    # Application entry point
├── app.module.ts              # Root application module
├── app.controller.ts          # Health check endpoints
├── app.service.ts             # Application service
│
├── config/                    # Configuration modules
│   ├── database.config.ts     # Database configuration
│   ├── graphql.config.ts      # GraphQL configuration
│   └── index.ts               # Export all configs
│
├── common/                    # Shared code across the application
│   ├── decorators/            # Custom decorators
│   ├── guards/                # Authentication/authorization guards
│   ├── interceptors/          # Request/response interceptors
│   ├── pipes/                 # Validation pipes
│   ├── filters/               # Exception filters
│   ├── middleware/            # Custom middleware
│   └── dto/                   # Common DTOs
│       ├── pagination.dto.ts  # Pagination input/output
│       └── base-response.dto.ts
│
├── database/                  # Database related code
│   ├── migrations/            # TypeORM migrations
│   ├── seeds/                 # Database seeders
│   └── entities/              # TypeORM entities (imported from domains)
│
├── domains/                   # Business logic organized by domain
│   ├── users/                 # User management domain
│   │   ├── entities/          # User entity
│   │   ├── dto/               # User DTOs (input/output)
│   │   ├── resolvers/         # GraphQL resolvers
│   │   ├── services/          # Business logic services
│   │   ├── repositories/      # Data access layer (if needed)
│   │   └── users.module.ts    # User module
│   │
│   ├── clients/               # Client management domain
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── resolvers/
│   │   ├── services/
│   │   └── clients.module.ts
│   │
│   ├── orders/                # Order management domain
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── resolvers/
│   │   ├── services/
│   │   └── orders.module.ts
│   │
│   ├── tasks/                 # Task management domain
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── resolvers/
│   │   ├── services/
│   │   └── tasks.module.ts
│   │
│   ├── components/            # Component/parts management
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── resolvers/
│   │   ├── services/
│   │   └── components.module.ts
│   │
│   ├── works/                 # Work tracking domain
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── resolvers/
│   │   ├── services/
│   │   └── works.module.ts
│   │
│   └── money/                 # Financial operations domain
│       ├── entities/
│       ├── dto/
│       ├── resolvers/
│       ├── services/
│       └── money.module.ts
│
├── auth/                      # Authentication & authorization
│   ├── guards/                # Auth guards
│   ├── strategies/            # Passport strategies
│   ├── decorators/            # Auth decorators
│   ├── dto/                   # Auth DTOs
│   ├── services/              # Auth services
│   └── auth.module.ts
│
└── utils/                     # Utility functions
    ├── constants.ts           # Application constants
    ├── helpers.ts             # Helper functions
    └── types.ts               # Shared TypeScript types
```

## 🏗️ Architecture Principles

### Domain-Driven Design (DDD)
- Each domain represents a business capability
- Domains are self-contained with their own entities, services, and resolvers
- Clear separation of concerns between domains

### Clean Architecture Layers
1. **Entities** - Core business objects (TypeORM entities)
2. **Services** - Business logic and use cases
3. **Resolvers** - GraphQL presentation layer
4. **DTOs** - Data transfer objects for input/output validation

### GraphQL Schema-First Approach
- All API operations defined through GraphQL
- Strong typing with TypeScript
- Auto-generated schema from code decorators
- Consistent error handling

## 📦 Module Organization

### Core Modules
- `AppModule` - Root module with global configuration
- `DatabaseModule` - Database connection and configuration
- `AuthModule` - Authentication and authorization

### Domain Modules
Each domain follows the same structure:
- Entity definition with TypeORM decorators
- GraphQL resolvers for queries and mutations
- Service layer for business logic
- DTOs for input validation and output formatting

### Shared Modules
- `CommonModule` - Shared utilities, guards, pipes
- `ConfigModule` - Environment configuration

## 🔄 Data Flow

```
GraphQL Request → Resolver → Service → Repository → Database
                     ↓
GraphQL Response ← DTO ← Business Logic ← Entity
```

## 🛡️ Security & Validation

- Input validation through class-validator DTOs
- Authentication guards for protected operations
- Role-based access control (RBAC)
- SQL injection prevention through TypeORM

## 🚀 Development Workflow

1. **Entity First** - Define TypeORM entity with relationships
2. **DTOs** - Create input/output DTOs with validation
3. **Service** - Implement business logic
4. **Resolver** - Create GraphQL operations
5. **Module** - Wire everything together
6. **Tests** - Unit and integration tests

## 📊 Database Integration

- Use existing PostgreSQL database from telegram-bot
- Maintain compatibility with current schema
- TypeORM entities mirror existing table structure
- No breaking changes to existing data 