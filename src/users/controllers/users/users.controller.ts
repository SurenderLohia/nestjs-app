import { ValidateCreateUserPipe } from './../../pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from './../../services/users/users.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guard/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.fetchUsers();
  }
  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'Surender',
        email: 'surender@test.com',
        posts: [
          { id: 1, title: 'Post 1' },
          { id: 1, title: 'Post 2' },
        ],
      },
    ];
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.age.toPrecision());
    this.usersService.createUser(userData);
    return userData;
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.usersService.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
