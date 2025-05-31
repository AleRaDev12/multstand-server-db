import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  telegramUserId?: number;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;
} 