import { AppDataSource } from "../../db/dataSource";
import { Address } from "../entities/Addresses";
import { Companies } from "../entities/Companies";
import { Products } from '../entities/Products';
import { User } from "../entities/User";
import { Categories } from "../entities/Categories";
import { CategoryProduct } from "../entities/CategoriesProducts";

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