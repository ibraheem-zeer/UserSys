import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.js";
import { Permission } from "./Permission.js";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ unique: true })
    name: string;

    /*
        ask waleed
        cascade
        eager
        onDelete
        =====================
        joining
    */
    @ManyToMany(
        () => User,     // select
        user => user.roles,     // where
        { cascade: true }       // extra think
    )
    users: User[];

    @ManyToMany(() => Permission, Permission => Permission.roles, { cascade: true, eager: true })
    @JoinTable()
    permissions: Permission[];
}