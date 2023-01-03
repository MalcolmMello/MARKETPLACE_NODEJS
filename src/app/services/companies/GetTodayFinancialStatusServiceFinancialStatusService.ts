import { Equal } from "typeorm";
import { companiesRepository, requestRepository } from "../../repositories";

interface TodayFinancialStatus {
    companyId: string,
    responsibleId: string
};

export class GetTodayFinancialStatusService {
    async execute({ companyId, responsibleId }: TodayFinancialStatus) {

        if(!companyId) {
            return new Error("Company's id is missing")
        }

        if(!responsibleId) {
            return new Error("Responsible's id is missing")
        }

        const existCompany = await companiesRepository().findOneBy({ id: companyId, responsible_id: responsibleId });

        if(existCompany == null) {
            return new Error("Company doesn't exist");
        }

        const requests = await requestRepository().find();

        let week_clients: string[] = [];

        let today_total: number = 0;

        let today_requests: number = 0;

        let today_sales: number = 0;

        let last_week_total: number = 0;

        let last_week_requests: number = 0;

        let last_week_sales: number = 0;

        requests.forEach(item => {
            const today = new Date();
            const item_date = new Date(item.created_at);
            
            if(item_date.getDate() === today.getDate() && item_date.getMonth() === today.getMonth() && item_date.getFullYear() === today.getFullYear()) {
                today_requests++;

                if(item.status.status_name === "Concluído"){
                    today_sales++;
                    today_total += item.total;
                }
            }

            if(item_date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
                last_week_requests++;

                if(!week_clients.includes(item.userId)) week_clients.push(item.userId);

                if(item.status.status_name === "Concluído"){
                    last_week_sales++;
                    last_week_total += item.total;
                }
            }
        });

        let todayAverage = today_total/today_sales;
        let lastWeekAverage = last_week_total/last_week_sales;

        const result = {
            today_requests,
            today_average: todayAverage,
            today_sales,
            last_week_requests,
            last_week_average: lastWeekAverage,
            last_week_sales,
            week_clients: week_clients.length
        };

        return result;
    }
};