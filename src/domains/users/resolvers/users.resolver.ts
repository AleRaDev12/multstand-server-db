import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOneUser(@Args('id', { type: () => ID }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.usersService.remove(id);
  }
} 