import { Router } from "express";
import { CreateCompanyController } from "../app/controllers/companies/CreateCompanyController";
import { LoginCompanyController } from "../app/controllers/companies/LoginCompanyController";
import { GetAddressController } from "../app/controllers/companies/GetAddressController";
import { UpdateAddressController } from "../app/controllers/companies/UpdateAddressController";
import { CreateCategoryProductController } from "../app/controllers/companies/CreateCategoryProductController";
import { UpdateCategoryProductController } from "../app/controllers/companies/UpdateCategoryProductController";
import { DeleteCategoryProductController } from "../app/controllers/companies/DeleteCategoryProductController";
import { GetCategoryProductController } from "../app/controllers/companies/GetCategoryProductController";
import { CreateProductController } from "../app/controllers/companies/CreateProductController";
import { UpdateProductController } from "../app/controllers/companies/UpdateProductController";
import { DeleteProductController } from "../app/controllers/companies/DeleteProductController";
import { GetAllProductsController } from "../app/controllers/companies/GetAllProductsController";
import { GetOneProductController } from "../app/controllers/companies/GetOneProductController";
import JwtAuthMiddleware from "../app/middlewares/JwtAuthMiddleware";
import AuthCompanyValidator from "../app/validators/AuthCompanyValidator";




const routes = Router();


routes.post("/signup", AuthCompanyValidator.signup, new CreateCompanyController().handle);
routes.post("/signin", AuthCompanyValidator.signin, new LoginCompanyController().handle);

routes.get("/address", JwtAuthMiddleware, new GetAddressController().handle);
routes.put("/updateaddress", JwtAuthMiddleware, new UpdateAddressController().handle);

routes.post("/category", JwtAuthMiddleware, new CreateCategoryProductController().handle);
routes.put("/category/:categoryId", JwtAuthMiddleware, new UpdateCategoryProductController().handle);
routes.delete("/category/:categoryId", JwtAuthMiddleware, new DeleteCategoryProductController().handle);
routes.get("/category", JwtAuthMiddleware, new GetCategoryProductController().handle);

routes.post("/product", JwtAuthMiddleware, new CreateProductController().handle);
routes.put("/product/:productId", JwtAuthMiddleware, new UpdateProductController().handle);
routes.delete("/product/:productId", JwtAuthMiddleware, new DeleteProductController().handle);
routes.get("/product", JwtAuthMiddleware, new GetAllProductsController().handle);
routes.get("/product/:productId", JwtAuthMiddleware, new GetOneProductController().handle);

export default routes;