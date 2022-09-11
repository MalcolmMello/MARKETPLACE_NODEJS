import axios from "axios";

const http = axios.create({
    baseURL: "https://viacep.com.br/ws"
});

export const api = {
    foundAddressByZipCode: async (zip_code: string) => {
        try {
            let { data } = await http.get(`/${zip_code}/json`);
            return data;
        } catch (error) {
            return console.log(error);
        }
    }
};