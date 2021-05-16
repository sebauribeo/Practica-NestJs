import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { MapperService } from '../../shared/mapper.service';
import { UserDetail } from './user.details.entity';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        private readonly _mapperService: MapperService,
    ){}

    // peticion de llamada por ID.
    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException('Se debe enviar un ID de identidad');
        }

        const regUser: User = await this._userRepository.findOne(id, {
            where: { status: 'ACTIVE'},
        });

        if (!regUser) {
            throw new NotFoundException();
        }

//        return this._mapperService.map<User, UserDto>(regUser, new UserDto());
        return regUser;
    }

    // peticion de llamada de todos los registros. Devuelve un array
    async getAll(): Promise<User[]> {

        const regUsers: User[] = await this._userRepository.find({
            where: { status: 'ACTIVE' },
        });

        return regUsers;
    }

    // Crear un usuario
    async create(user: User): Promise<User> {

        const details = new UserDetail();
        user.details = details;
        
        // Para lo Roles. Momentaneo
        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: {name: 'GENERAL'}});
        user.roles = [defaultRole];

        const saveUser: User = await this._userRepository.save(user);
        return saveUser;
        // return this._mapperService.map<User, UserDto>(saveUser, new UserDto());
    }

    // Actualiza 
    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    //Borra
    async delete(id: number): Promise<void> {
        const userExists = await this._userRepository.findOne(id, {
            where: { status: 'ACTIVE'}
        });

        if (!userExists) {
            throw new NotFoundException();
        }

        await this._userRepository.update(id, { status: 'INACTIVE' });
    }
}
