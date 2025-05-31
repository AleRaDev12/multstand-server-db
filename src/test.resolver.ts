import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TestResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello from Multstand GraphQL API! 🚀 Server is running correctly.';
  }

  @Query(() => String)
  version(): string {
    return 'Multstand API v1.0.0 - Base version';
  }
} 