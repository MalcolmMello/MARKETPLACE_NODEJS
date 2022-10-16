import { AppDataSource } from "../../db/dataSource";
import { Address } from "../entities/Address";
import { Companies } from "../entities/Company";
import { Products } from '../entities/Product';
import { User } from "../entities/User";
import { Categories } from "../entities/Category";
import { CategoryProduct } from "../entities/CategoryProduct";
import { Admin } from "../entities/Admin";
import { Requests } from "../entities/Request";
import { RequestProducts } from "../entities/RequestProduct";
import { Status } from "../entities/Status";


export const userRepository = () => {
    return AppDataSource.getRepository(User);
};

export const addressRepository = () => {
    return AppDataSource.getRepository(Address);
};

export const companiesRepository = () => {
    return AppDataSource.getRepository(Companies);
};

export const productsRepository = () => {
    return AppDataSource.getRepository(Products);
};

export const categoriesRepository = () => {
    return AppDataSource.getRepository(Categories);
};

export const productsCategoriesRepository = () => {
    return AppDataSource.getRepository(CategoryProduct);
};

export const adminRepository = () => {
    return AppDataSource.getRepository(Admin);
};

export const requestRepository = () => {
    return AppDataSource.getRepository(Requests);
};

export const requestProductsRepository = () => {
    return AppDataSource.getRepository(RequestProducts);
};

export const statusRepository = () => {
    return AppDataSource.getRepository(Status);
};