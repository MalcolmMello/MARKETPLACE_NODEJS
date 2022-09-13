type RequestData = {
    userId: string,
    request_data: {
        company_id: string,
        user_address_id: string,
        products: {
            id: string,
            length: number
        }[],
        status: "Pendente",
        card: {
            number: number,
            holder_name: string,
            exp_month: number,
            exp_year: number,
            cvv: string,
            billing_address: {
                line_1: string
            }
        }
    }
};

export class CreateRequestService {
    async execute({ userId, request_data }: RequestData) {
        return new Error("Still working on this.");
    };
};