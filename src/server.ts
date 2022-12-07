import "reflect-metadata";
import "./db/dataSource";
import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import path from 'path';
import { MulterError } from 'multer';
import adminRoutes from './routes/admin';
import userRoutes from './routes/user';
import companiesRoutes from './routes/companies';


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use("/user", userRoutes);
app.use("/companies", companiesRoutes);
app.use("/admin", adminRoutes);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); //bad request
    
    if(err instanceof MulterError) {
        res.json({ error: err.code });
    } else {
        console.log( err );
        res.json({ error: 'Ocorreu algum erro' })
    }
}

app.use(errorHandler);

app.listen(5000, () => {
    console.log("Aplicação rodando na porta 5000");
});