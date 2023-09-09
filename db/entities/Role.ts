import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import { Permission } from "./Permission.js";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => User, user => user.roles, { cascade: true })
    users: User[];

    @ManyToMany(() => Permission, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
}