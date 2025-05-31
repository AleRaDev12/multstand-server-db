import { Field, ObjectType } from '@nestjs/graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRole, LabelType } from '../../utils/types';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  public static entityName: string;
  public static nullable: { [key: string]: boolean };

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  abstract format(userRole: UserRole, labelType?: LabelType): string;
} 