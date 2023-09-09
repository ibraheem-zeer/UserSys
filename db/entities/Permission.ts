import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role.js";

@Entity('permissions')
export class Permission extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}