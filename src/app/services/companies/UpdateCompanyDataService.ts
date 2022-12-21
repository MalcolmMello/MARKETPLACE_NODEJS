import { companiesRepository } from "../../repositories";
import { unlink } from "fs/promises";
import sharp from "sharp";

type UpdateCompanyData = {
    new_name: string,
    description: string,
    phone_number: string,
    files: { 
        logo: Express.Multer.File[],
        cover: Express.Multer.File[]
    },
    companyId: string,
    responsibleId: string
};

export class UpdateCompanyDataService {
    async execute({ new_name, description, phone_number, files, companyId, responsibleId }: UpdateCompanyData) {
        if(!companyId) {
            return new Error("Missing company's id.");
        };

        const hasAnyData = new_name || description || files;

        if(!hasAnyData) {
            return new Error("There's no data to change");
        };

        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

        if(existCompany == null) {
            return new Error("No companies with that id.");
        };

        existCompany.company_name = new_name ? new_name : existCompany.company_name;
        existCompany.description = description ? description : existCompany.description;
        existCompany.phone_number = phone_number ? phone_number : existCompany.phone_number;
        
        let logo: string;
        let cover: string;

        console.log(files.logo)

        if(files.logo != undefined) {
            logo = `${files.logo[0].filename}`;
            await sharp(files.logo[0].path)
            .resize(300, 300, {
                    fit: sharp.fit.cover, // proporcional a img
                    position: 'centre'
                })
            .toFormat('jpeg')
            .toFile(`./public/media/${logo}.jpg`);

            existCompany.logo = logo.length > 0 ? `${logo}` : existCompany.logo;
        
            await unlink(files.logo[0].path);
        };

        if(files.cover != undefined) {
            cover = `${files.cover[0].filename}`;
            await sharp(files.cover[0].path)
            .resize(768, 300, {
                    fit: sharp.fit.cover, // proporcional a img
                    position: 'centre'
                })
            .toFormat('jpeg')
            .toFile(`./public/media/${cover}.jpg`);

            existCompany.cover = cover.length > 0 ? `${cover}` : existCompany.cover;
        
            await unlink(files.cover[0].path);
        };

        await companiesRepository().save(existCompany);

        const result = {
            company_name: existCompany.company_name,
            description: existCompany.description,
            phone_number: existCompany.phone_number,
            logo: existCompany.logo != null ? `http://localhost:5000/media/${existCompany.logo}.jpg` : existCompany.logo,
            cover: existCompany.cover != null ? `http://localhost:5000/media/${existCompany.cover}.jpg` : existCompany.cover
        };
        
        return result;
    };
};