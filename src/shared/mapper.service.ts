import { Injectable } from "@nestjs/common";
import { UserDto } from "src/modules/user/dto/user.dto";
import { User } from "src/modules/user/user.entity";
import { TypeMapper } from "ts-mapper";


@Injectable() 
export class MapperService extends TypeMapper {

    constructor() {
        super();
        this.config();
    }


    private config(): void {
        this.createMap<User, UserDto>()
        .map(UserEntity => UserEntity.id, UserDtodto => UserDtodto.id)
        .map(UserEntity => UserEntity.username, UserDtodto => UserDtodto.username)
        .map(UserEntity => UserEntity.email, UserDtodto => UserDtodto.email)
        .map(UserEntity => UserEntity.details, UserDtodto => UserDtodto.details)
        .map(UserEntity => UserEntity.roles, UserDtodto => UserDtodto.roles)
    }
}