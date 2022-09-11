import { companiesRepository, productsCategoriesRepository, productsRepository } from "../../repositories";

type DeleteCategoryProduct = {
    categoryId: string,
    companyId: string
};

export class DeleteCategoryProductService {
    async execute({ categoryId, companyId }: DeleteCategoryProduct) {
        
        if(!categoryId) {
            return new Error("Category id wasn't sent.")
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId });

        if(!existCompany) {
            return new Error("Company doesn't exists");
        };

        const existCategory = await productsCategoriesRepository().findOneBy({ id: categoryId, company_id: existCompany.id });

        if(existCategory == null) {
            return new Error("Category doesn't exists.");
        };

        if(existCategory.products.length !== 0 ) {
            const products = await productsRepository().findBy({ categoryProductId: categoryId, company_id: companyId });

            await productsRepository().remove(products);
        }; 

        await productsCategoriesRepository().delete(existCategory.id);

        const result = "Category product successfully deleted!";

        return result;
    };
};