import { checkSchema } from "express-validator";

const AuthCompanyValidator = {
        signup: checkSchema({
            responsible_name: {
                isLength: {
                    options: { min: 3 }
                },
                errorMessage: "Nome precisa ter pelo menos 4 caracteres."
            },
            company_name: {
                isLength: {
                    options: { min: 4 }
                },
                errorMessage: "Nome da empresa precisa ter pelo menos 4 caracteres."
            },
            responsible_password: {
                isStrongPassword: {
                    options: { minLength: 8, minUppercase: 1, minLowercase: 1, minNumbers: 1, minSymbols: 1 }
                },
                errorMessage: "Senha não é forte o suficiente."
            },
            responsible_email: {
                isEmail: true,
                normalizeEmail: true,
                notEmpty: true,
                errorMessage: "Email inválido."
            },
            company_email: {
                isEmail: true,
                normalizeEmail: true,
                notEmpty: true,
                errorMessage: "Email inválido."
            },
            responsible_phone_number: {
                isMobilePhone: { options: "pt-BR" },
                notEmpty: true,
                errorMessage: "Número de telefone inválido"
            },
            company_phone_number: {
                isMobilePhone: { options: "pt-BR" },
                notEmpty: true,
                errorMessage: "Número de telefone inválido"
            }
        }),
        
        signin: checkSchema({
            email: {
                isEmail: true,
                normalizeEmail: true,
                notEmpty: true,
                errorMessage: "Email inválido."
            },
            password: {
                isStrongPassword: {
                    options: { minLength: 5 }
                },
                errorMessage: "Senha inválida."
            }
        }),
}

export default AuthCompanyValidator;