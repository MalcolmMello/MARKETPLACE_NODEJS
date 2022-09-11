import { DataSource } from "typeorm";
import dotenv from 'dotenv';

dotenv.config();

const entities = "./src/app/entities/*.ts";
const migrations = "./src/db/migrations/*.ts";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: process.env.TYPEORM_USERNAME as string,
    password: process.env.TYPEORM_PASSWORD as string,
    database: process.env.TYPEORM_DATABASE as string,
    entities: [entities],
    migrations: [migrations],
    logging: true,
    synchronize: true
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });