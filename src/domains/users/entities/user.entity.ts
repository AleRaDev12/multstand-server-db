import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { NullableColumn } from '../../../common/decorators/nullable-column.decorator';
import { LabelType } from '../../../utils/types';

// Create GraphQL enum (values must be runtime values)
export enum UserRole {
  MANAGER = 'manager',
  MASTER = 'master',
  UNREGISTERED = 'unregistered',
  UNKNOWN = 'unknown',
}

// Register GraphQL enum
registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role in the system',
});

@ObjectType()
@Entity('user')
export class User extends BaseEntity {
  public static entityName = 'User';
  public static nullable = {
    name: true,
    role: false,
    telegramUserId: false,
  };

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @NullableColumn()
  name: string;

  @Field({ nullable: true })
  @NullableColumn({ unique: true, type: 'bigint' })
  telegramUserId: number;

  @Field(() => UserRole)
  @NullableColumn()
  role: UserRole;

  // Relations will be added later when we create Master entity
  // @OneToOne(() => Master, (master) => master.user)
  // master: Master;

  public format(userRole: UserRole, labelType?: LabelType): string {
    const displayName = this.name || `User #${this.id}`;
    
    switch (labelType) {
      case 'short':
        return displayName.split(' ')[0] || displayName;
      case 'line':
        return `${displayName} (${this.role})`;
      case 'full':
      default:
        return `${displayName} - ${this.role} (ID: ${this.id})`;
    }
  }
} 