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

    @IsNotEmpty()
    roles: RoleType[];

    @IsNotEmpty()
    details: UserDetail;
}