import { productsCategoriesRepository, productsRepository } from "../../repositories";

type UpdateProduct = {
    companyId: string;
    categoryProductId: string,
    productId: string,
    product_name: string,
    description: string,
    front_cover: string,
    price: number,
};

export class UpdateProductService {
    async execute({ companyId , productId, categoryProductId, product_name, description, front_cover, price }: UpdateProduct) {
        const hasProductId = productId;

        if(!hasProductId) {
            return new Error("Product id is missing");
        };
        
        const hasAnyData = categoryProductId || product_name || description || front_cover || price;

        if(!hasAnyData) {
            return new Error("There is no data to change.");
        };

        if(categoryProductId) {
            const existCategory = await productsCategoriesRepository().findOneBy({ id: categoryProductId, company_id: companyId });

            if(existCategory == null) {
                return new Error("Category doesn't exists.");
            };
        };

        const existProduct = await productsRepository().findOneBy({ id: productId, company_id: companyId });

        if(existProduct == null) {
            return new Error("Product doesn't exists.")
        };

        existProduct.categoryProductId = categoryProductId ? categoryProductId :  existProduct.categoryProductId;
        existProduct.product_name = product_name ? product_name :  existProduct.product_name;
        existProduct.description = description ? description :  existProduct.description;
        existProduct.front_cover = front_cover ? front_cover :  existProduct.front_cover;
        existProduct.price = price ? price :  existProduct.price;

        await productsRepository().save(existProduct);

        const result = {
            message: "Product sucessfully changed!",
            existProduct
        };

        return result
    };
};