import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcrypt';
import { Role } from "./Role.js";
import { Profile } from "./Profile.js";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    userName: string;

    @Column({ nullable: false })
    email: string;

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
    @Column({ nullable: false })
    password: string;

    @ManyToMany(() => Role, role => role.users, { eager: true })
    @JoinTable()
    roles: Role[];

    @OneToOne(() => Profile, profile => profile.user, { eager: true })
    profile: Partial<Profile>;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => "CURRENT_TIMESTAMP()"
    })
    createdAt: Date;
}