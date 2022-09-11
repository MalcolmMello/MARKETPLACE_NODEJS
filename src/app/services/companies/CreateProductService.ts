import { companiesRepository, productsCategoriesRepository, productsRepository } from "../../repositories";

type CreateCategoryProduct = {
    companyId: string,
    categoryProductId: string,
    product_name: string,
    description: string,
    front_cover: string,
    price: number
};

export class CreateProductService {
    async execute({ companyId, categoryProductId, product_name, description, front_cover, price }: CreateCategoryProduct) {

        const hasAllData = companyId && categoryProductId && product_name && description && price;

        if(!hasAllData) {
            return new Error("Missing product information");
        }
        const existCompany = await companiesRepository().findOneBy({ id: companyId });

        if(!existCompany) {
            return new Error("Company doesn't exists");
        };

        const existCategory = await productsCategoriesRepository().findOneBy({ id: categoryProductId, company_id: companyId });

        if(!existCategory) {
            return new Error("Category doesn't exists.");
        };

        const existProduct = await productsRepository().findOneBy({ product_name, company_id: companyId });

        if(existProduct) {
            return new Error("Product already exists");
        };

        const newProduct = productsRepository().create({ product_name, description, front_cover, price, reviews: 0, company_id: companyId, categoryProductId: existCategory.id });
        
        await productsRepository().save(newProduct);

        const result = {
            message: "Product successfully created!",
            newProduct
        };

        return result; 
    }
}