import { checkSchema } from "express-validator";

const AddressValidator = {
    createAddress: checkSchema({
            zip_code: {
                isPostalCode: { options: "BR" },
                notEmpty: true,
                errorMessage: "CEP inválido"
            }
        })
};

export default AddressValidator;