import { unlink } from "fs/promises";
import sharp from "sharp";
import { productsCategoriesRepository, productsRepository } from "../../repositories";

type UpdateProduct = {
    companyId: string;
    categoryProductId: string,
    productId: string,
    product_name: string,
    description: string,
    front_cover: Express.Multer.File | undefined,
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

        let frontCover: string | undefined;

        if(front_cover != undefined) {
            frontCover = `${front_cover.filename}`;
            await sharp(front_cover.path)
            .resize(180, 180, {
                    fit: sharp.fit.cover, // proporcional a img
                    position: 'centre'
                })
            .toFormat('jpeg')
            .toFile(`./public/media/${frontCover}.jpg`);
        
            await unlink(front_cover.path);
        };

        existProduct.categoryProductId = categoryProductId ? categoryProductId :  existProduct.categoryProductId;
        existProduct.product_name = product_name ? product_name :  existProduct.product_name;
        existProduct.description = description ? description :  existProduct.description;
        existProduct.front_cover = frontCover ? frontCover :  existProduct.front_cover;
        existProduct.price = price ? price :  existProduct.price;

        await productsRepository().save(existProduct);

        const result = {
            message: "Product sucessfully changed!",
            existProduct
        };

        return result
    };
};