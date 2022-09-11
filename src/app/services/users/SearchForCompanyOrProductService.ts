import { companiesRepository, productsRepository, categoriesRepository } from "../../repositories"

type Search = {
    searchQuery?: string, 
    tag?: string
}

export class SearchForCompanyOrProductService {
    async execute({searchQuery, tag}: Search) {
        if(searchQuery != 'undefined') {
            const companiesBuilder = companiesRepository().createQueryBuilder();

            companiesBuilder.where("company_name LIKE :s", {s: `%${searchQuery}%`});

            const productsBuilder = productsRepository().createQueryBuilder("companies_products");

            productsBuilder.where("companies_products.product_name LIKE :s OR companies_products.description LIKE :s", {s: `%${searchQuery}%`});

            const companies = await companiesBuilder.getMany();
            const products = await productsBuilder.getMany();

            const results = {
                companies,
                products
            };

            return results;
            
        } else if(tag != 'undefined') {
            const categories = await categoriesRepository().findBy({ category_name: tag });

            const results = [];

            for(let category of categories) {
                const product = await companiesRepository().find({ where: {
                    categories: category
                }});
                results.push(product);
            }

            return results
        } else {
            return new Error("Missing search query's");
        }
    }
}