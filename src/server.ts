import "reflect-metadata";
import "./db/dataSource";
import express from 'express';
import userRoutes from './routes/user';
import companiesRoutes from './routes/companies';
import mpRoutes from './routes/mercadopago';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/companies", companiesRoutes);
app.use("/mp", mpRoutes);

app.listen(5000, () => {
    console.log("Aplicação rodando na porta 5000");
});