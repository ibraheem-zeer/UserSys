// Profile.js
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User.js';
@Entity('profiles')
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ type: "date" })
    dateOfBirth: Date;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: Partial<User>; // ask waleed
}
