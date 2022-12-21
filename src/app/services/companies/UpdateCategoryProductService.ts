import { companiesRepository, productsCategoriesRepository } from "../../repositories";

type UpdateCategoryProduct = {
    responsibleId: string,
    categoryId: string,
    companyId: string,
    newCategoryName: string
};

export class UpdateCategoryProductService {
    async execute({ categoryId, companyId, newCategoryName, responsibleId }: UpdateCategoryProduct) {
        
        if(!categoryId) {
            return new Error("Category id wasn't sent.")
        };

        if(!newCategoryName) {
            return new Error("Category name wasn't sent.")
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

        if(!existCompany) {
            return new Error("Company doesn't exists");
        };

        const existCategory = await productsCategoriesRepository().findOneBy({ id: categoryId, company_id: existCompany.id });

        if(existCategory == null) {
            return new Error("Category doesn't exists.");
        };

        existCategory.category_name = newCategoryName;

        await productsCategoriesRepository().save(existCategory);

        const result = {
            message: "Category product successfully updated!",
            existCategory
        };

        return result;
    };
};