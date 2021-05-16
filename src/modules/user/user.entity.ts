import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../role/role.entity";
import { UserDetail } from "./user.details.entity";

// La clase es singular, la tabla es plural
@Entity('users')
export class User extends BaseEntity {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false})
    username: string;

    @Column({ type: 'varchar', nullable: false})
    email: string;

    @Column({ type: 'varchar', nullable: false})
    password: string;

    @Column({ type: 'varchar', default: 'ACTIVE', length:8})
    status: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at'}) 
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at'}) 
    updatedAt: Date;

    @OneToOne( type=> UserDetail, {
        cascade: true,
        nullable: false,
        eager: true
    })
    @JoinColumn({name: 'detail_id'})
    details: UserDetail;            

    @ManyToMany(type => Role, role => role.users, {
        eager: true,
    })
    @JoinTable({ name: 'user_roles' })
    roles: Role[]
}