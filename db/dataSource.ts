import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Profile } from "./entities/Profile.js";
import { Role } from "./entities/Role.js";
import { Permission } from "./entities/Permission.js";

console.log(`im in datasorurse`)

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User,
        Profile,
        Role,
        Permission
    ],
    synchronize: true, // ask waleed
    logging: false     // ask waleed
});

export default dataSource;