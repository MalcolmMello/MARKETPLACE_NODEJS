import { cpf } from "cpf-cnpj-validator";

const CpfValidator = (responsibleCpf: string) => {
    return cpf.isValid(responsibleCpf);
};

export default CpfValidator;