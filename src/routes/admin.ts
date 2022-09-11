import { Router } from "express";
import { CreateAdminController } from "../app/controllers/admin/CreateAdminController";
import { LoginAdminController } from "../app/controllers/admin/LoginAdminController";
import { GetAllCompaniesController } from "../app/controllers/admin/GetAllCompaniesController";
import { GetOneCompanyController } from "../app/controllers/admin/GetOneCompanyController";
import { ChangeCompanyStatusController } from "../app/controllers/admin/ChangeCompanyStatusController";
import AuthValidator from "../app/validators/AuthValidator";
import JwtAuthMiddleware from "../app/middlewares/JwtAuthMiddleware";

const routes = Router();

routes.post("/signup", AuthValidator.signup, new CreateAdminController().handle);
routes.post("/signin", AuthValidator.signin, new LoginAdminController().handle);

routes.get("/companies", JwtAuthMiddleware, new GetAllCompaniesController().handle);
routes.get("/companies/:id", JwtAuthMiddleware, new GetOneCompanyController().handle);

routes.put("/changestatuscompany/:id", JwtAuthMiddleware, new ChangeCompanyStatusController().handle);

export default routes;