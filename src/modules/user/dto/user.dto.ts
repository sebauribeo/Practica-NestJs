// un dto es una clase comun y corriente la cual contendra la informacion necesaria que 
// queramos transmitir.

import { IsNotEmpty } from "class-validator";
import { RoleType } from "src/modules/role/roletype.enum";
import { UserDetail } from "../user.details.entity";

export class UserDto {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    // este sera un array porque un usuario puede tener vario roles
    @IsNotEmpty()
    roles: RoleType[];

    // detalle del usuario
    @IsNotEmpty()
    details: UserDetail;
}