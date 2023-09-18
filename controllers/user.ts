import { UserNS } from "../@types/user.js";
import dataSource from "../db/dataSource.js"
import { User } from "../db/entities/User.js"
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { In } from "typeorm";


const insertUser = (payload: UserNS.User) => {
    return dataSource.manager.transaction(
        async transaction => {
            const role = await Role.findOneBy({ name: payload.role })
            // crete => build in function
            // 1) create user 
            // 2) select if user , editor or admin
            const newUser = User.create({
                ...payload,
                roles: [role] as Role[]
            });
            await transaction.save(newUser);
        });
}

const inssertRole = async (payload: Role) => {
    try {
        const role = new Role()
        role.name = payload.name
        role.permissions = await Permission.findBy({
            id: In(payload.permissions)
        })

        await role.save()
    } catch (error) {
        throw ("Something went wrong")
    }
}

const insertPermission = async (payload: Permission) => {
    try {
        const permission = Permission.create(payload)
        await permission.save()
    } catch (error) {
        throw ("Something went wrong")
    }
}

const login = async (email: string, password: string) => {
    try {
        const user = await User.findOneBy({ email });

        const passwordMatching = await bcrypt.compare(password, user?.password || '')

        if (user && passwordMatching) {
            const token = jwt.sign({
                email: user.email,
                userName: user.userName
            }, process.env.SECRET_KEY || "", {
                expiresIn: "30m"
            })

            return token
        } else {
            throw ("invalid email or password")
        }
    } catch (error) {
        throw ("invalid email or password")
    }
}

const getUsers = () => {
    const users = User.find()
    return users
}

const getRoles = () => {
    const roles = Role.find()
    return roles
}

export { insertUser, login, getUsers, insertPermission, inssertRole, getRoles }