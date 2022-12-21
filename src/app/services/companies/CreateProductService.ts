import { unlink } from "fs/promises";
import sharp from "sharp";
import { companiesRepository, productsCategoriesRepository, productsRepository } from "../../repositories";

type CreateCategoryProduct = {
    responsibleId: string,
    companyId: string,
    categoryProductId: string,
    product_name: string,
    description: string,
    front_cover: Express.Multer.File | undefined,
    price: number
};

export class CreateProductService {
    async execute({ responsibleId, companyId, categoryProductId, product_name, description, front_cover, price }: CreateCategoryProduct) {
        const hasAllData = companyId && categoryProductId && product_name && description && price;

        if(!hasAllData) {
            return new Error("Missing product information");
        }
        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId});

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


        const newProduct = productsRepository().create({ product_name, description, front_cover: frontCover, price, reviews: 0, company_id: companyId, categoryProductId: existCategory.id });
        
        await productsRepository().save(newProduct);

        const result = {
            message: "Product successfully created!",
            newProduct
        };

        return result; 
    }
}