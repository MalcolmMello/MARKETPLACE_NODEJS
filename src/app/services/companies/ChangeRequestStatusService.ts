import { companiesRepository, requestRepository, statusRepository } from "../../repositories";

type OneRequestService = {
    responsibleId: string,
    companyId: string,
    requestId: string,
    status_name: "Pronto para retirada" | "Em preparo" | "Concluído" | "Cancelado pela empresa" | "Cancelado pelo cliente" | "Em aberto" | "Saiu para entrega";
}

export class ChangeRequestStatusService {
    async execute({ responsibleId, companyId, requestId, status_name }: OneRequestService) {
        if(!responsibleId) {
            return new Error("Invalid responsible's id.");
        };
        
        if(!companyId) {
            return new Error("Invalid company's id.");
        };

        if(!requestId) {
            return new Error("Invalid request's id.");
        };

        const isResponsibleCompany = await companiesRepository().findOneBy({ responsible_id: responsibleId, id: companyId });

        if(isResponsibleCompany == null) {
            return new Error("Company doesn't belong to this responsible.");
        }

        const request = await requestRepository().findOneBy({ id: requestId, company_id: companyId });

        if(request == null) {
            return new Error("Request doesn't exists.");
        };

        const status = await statusRepository().findOneBy({ status_name: status_name });

        if(status == null) {
            return new Error("Status doesn't exists.");
        };

        request.status = status;

        await requestRepository().save(request);

        return {
            requestId: request.id,
            username: request.user.username,
            address: request.address,
            products: request.request_products,
            status: request.status
        };
    };
};