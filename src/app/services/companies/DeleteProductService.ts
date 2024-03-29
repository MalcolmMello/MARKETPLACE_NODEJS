import { companiesRepository, productsRepository } from "../../repositories";

type DeleteProduct = {
    responsibleId: string,
    productId: string,
    companyId: string
};

export class DeleteProductService {
    async execute({ responsibleId, productId, companyId }: DeleteProduct) {
        
        if(!productId) {
            return new Error("Product id wasn't sent.")
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

        if(!existCompany) {
            return new Error("Company doesn't exists");
        };

        const existProduct = await productsRepository().findOneBy({ id: productId, company_id: existCompany.id });

        if(existProduct == null) {
            return new Error("Product doesn't exists.");
        };

        await productsRepository().delete(existProduct.id);

        const result = "Product successfully deleted!";

        return result;
        
    };
};