import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly _userService: UserService) {}

    // @Get(':id')
    // async getUser(@Param() id: number): Promise<UserDto> {
    //     const user = await this._userService.get(id);
    //     return user;
    // }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number){
      const user = await this._userService.get(id);
      return user;
    }

    @Get()
    async getUsers(): Promise<User[]> {
        const users = await this._userService.getAll();
        return users;
    }

    @Post()
    // async createUser(@Body() user: User): Promise<UserDto> {
    //     const createUser = await this._userService.create(user);
    //     return createUser;
    async createUser(@Body() user: User): Promise<User> {
        const createUser = await this._userService.create(user);
        return createUser;
        }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User) {
        const updateUser = await this._userService.update(id, user);
        return true;
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this._userService.delete(id);
        return true;
    }

}



// import { Controller, Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
// import { UserDto } from './dto/user.dto';
// import { User } from './user.entity';
// import { UserService } from './user.service';

// @Controller('users')
// export class UserController {
//     constructor(private readonly _userService: UserService) {}

//     @Get()
//     async getUser(@Param() id: number) {
//         const user = await this._userService.get(id);
//         return user;
//     }

//     @Get()
//     async getUsers(): Promise<UserDto> {
//         const users = await this._userService.getAll();
//         return users;
//     }

//     @Post()
//     async createUser(@Body() user: User): Promise<UserDto>{
//         const createdUser = await this.createUser(user);
//         return createdUser;
//     } 

//     @Patch()
//     async updatedUser(@Body() user: User): Promise<UserDto>{
//         const updatedUser = await this.createUser(user);
//         return updatedUser;
//     } 

//     @Delete()
//     async deleteUser(@Param() id: number) {
//         await this._userService.delete(id);
//         return true;
//     }

    
// }