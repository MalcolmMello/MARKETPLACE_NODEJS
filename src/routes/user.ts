import { Router } from "express";
import { CreateUserController } from "../app/controllers/users/CreateUserController";
import { LoginUserController } from "../app/controllers/users/LoginUserController";
import { GetUserInfoController } from "../app/controllers/users/GetUserInfoController";
import { ForgotPasswordController } from "../app/controllers/users/ForgotPasswordController";
import { ResetPasswordController } from "../app/controllers/users/ResetPasswordController";
import { CreateAddressController } from "../app/controllers/users/CreateAddressController";
import { DeleteAddressController } from "../app/controllers/users/DeleteAddressController";
import { GetAllAddressesController } from "../app/controllers/users/GetAllAddressesController";
import { GetOneAddressController } from "../app/controllers/users/GetOneAddressController";
import { UpdateAddressController } from "../app/controllers/users/UpdateAddressController";
import { GetAllCompaniesController } from "../app/controllers/users/GetAllCompaniesController";
import { GetOneCompanyController } from "../app/controllers/users/GetOneCompanyController";
import { GetProductByIdController } from "../app/controllers/users/GetProductByIdController";
import { SearchForCompanyOrProductController } from "../app/controllers/users/SearchForCompanyOrProductController";
import AuthValidator from "../app/validators/AuthValidator";
import JwtAuthMiddleware from "../app/middlewares/JwtAuthMiddleware";
import AddressValidator from "../app/validators/AddressValidator";

const routes = Router();

/* users */
routes.post("/signup", AuthValidator.signup, new CreateUserController().handle);
routes.post("/signin", AuthValidator.signin, new LoginUserController().handle);
routes.get("/", JwtAuthMiddleware, new GetUserInfoController().handle);
routes.post("/forgot_password", AuthValidator.forgotPassword, new ForgotPasswordController().handle);
routes.post("/reset_password/:token", AuthValidator.resetPassword, new ResetPasswordController().handle);

/* address */
routes.get("/address", JwtAuthMiddleware, new GetAllAddressesController().handle);
routes.get("/address/:id", JwtAuthMiddleware, new GetOneAddressController().handle);
routes.post("/address", JwtAuthMiddleware, AddressValidator.createAddress, new CreateAddressController().handle);
routes.put("/address/:id", JwtAuthMiddleware, new UpdateAddressController().handle);
routes.delete("/address/:id", JwtAuthMiddleware, new DeleteAddressController().handle);

/* companies data */
routes.get("/companies", new GetAllCompaniesController().handle);
routes.get("/companies/:id", new GetOneCompanyController().handle);

routes.get("/product/:id", new GetProductByIdController().handle);
routes.get("/search", new SearchForCompanyOrProductController().handle);




export default routes;