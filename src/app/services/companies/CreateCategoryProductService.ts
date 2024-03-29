import { companiesRepository, productsCategoriesRepository } from "../../repositories";

type CreateCategoryProduct = {
    responsibleId: string,
    category: string,
    companyId: string
};

export class CreateCategoryProductService {
    async execute({ responsibleId, category, companyId }: CreateCategoryProduct) {
        
        if(!category) {
            return new Error("Category name wasn't sent.")
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

        if(!existCompany) {
            return new Error("Company doesn't exists");
        };

        const existCategory = await productsCategoriesRepository().findOneBy({ category_name: category });

        if(existCategory) {
            return new Error("Category already exists.");
        };

        const newCategory = productsCategoriesRepository().create({ category_name: category, company_id: existCompany.id });

        await productsCategoriesRepository().save(newCategory);

        const result = {
            message: "Category successfully created!",
            newCategory
        };

        return result; 
    }
}