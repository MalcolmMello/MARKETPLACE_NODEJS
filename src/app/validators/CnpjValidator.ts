import { cnpj } from "cpf-cnpj-validator";

const CpnjValidator = (companyCnpj: string) => {
    return cnpj.isValid(companyCnpj);
};

export default CpnjValidator;