import { statusRepository } from "./repositories";

const statusname = [
    {name: 'Em aberto'},
    {name: 'Em preparo'},
    {name: 'Saiu para entrega'},
    {name: 'Pronto para retirada'},
    {name: 'Concluído'},
    {name: 'Cancelado'},
    {name: 'Em aberto'},
];


const addStatus = async () => {
    for(let i of statusname) {
        const newStatus = statusRepository().create({ status_name: i.name });
        await statusRepository().save(newStatus);
    }
};

export default addStatus;
