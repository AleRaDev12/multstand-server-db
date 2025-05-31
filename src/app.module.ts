import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { UsersModule } from './domains/users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('database'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      introspection: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {} 