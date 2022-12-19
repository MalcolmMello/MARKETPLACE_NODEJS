import multer from "multer";
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
import { GetAllRequestsController } from "../app/controllers/companies/GetAllRequestsController";
import { GetOneRequestController } from "../app/controllers/companies/GetOneRequestController";
import { ChangeRequestStatusController } from "../app/controllers/companies/ChangeRequestStatusController";
import { UpdateCompanyDataController } from "../app/controllers/companies/UpdateCompanyDataController";
import { GetPerfilDataController } from "../app/controllers/companies/GetPerfilDataController";
import { StripeRefreshController } from "../app/controllers/companies/StripeRefreshController";
import { HandleCreateStripeExpress } from "../app/stripe/HandleCreateStripeExpress";
import { HandleOnboardedStripe } from "../app/stripe/HandleOnboardedStripe";
import JwtAuthMiddleware from "../app/middlewares/JwtAuthMiddleware";
import AuthCompanyValidator from "../app/validators/AuthCompanyValidator";
import { HandleRetrieveSubscription } from "../app/stripe/HandleRetrieveSubscription";


const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
            const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png']
            cb(null, allowed.includes( file.mimetype )) // confere o tipo de arquivo
    },
    limits: { fieldSize: 4000000 } // tamanho máximo do arquivo, 4mb
});

const routes = Router();

routes.post("/signin", AuthCompanyValidator.signin, new LoginCompanyController().handle);
routes.post("/signup", AuthCompanyValidator.signup, new CreateCompanyController().handle);
routes.post("/create-stripe-express", JwtAuthMiddleware, new HandleCreateStripeExpress().handle);
routes.get("/onboarded", JwtAuthMiddleware, new HandleOnboardedStripe().handle);
routes.get("/subscription-status", JwtAuthMiddleware, new HandleRetrieveSubscription().handle);

routes.post("/refresh_url", JwtAuthMiddleware, new StripeRefreshController().handle);

routes.get("/address", JwtAuthMiddleware, new GetAddressController().handle);
routes.put("/updateaddress", JwtAuthMiddleware, new UpdateAddressController().handle);

routes.post("/category", JwtAuthMiddleware, new CreateCategoryProductController().handle);
routes.put("/category/:categoryId", JwtAuthMiddleware, new UpdateCategoryProductController().handle);
routes.delete("/category/:categoryId", JwtAuthMiddleware, new DeleteCategoryProductController().handle);
routes.get("/category", JwtAuthMiddleware, new GetCategoryProductController().handle);

routes.post("/product", JwtAuthMiddleware, upload.single('front_cover'), new CreateProductController().handle);
routes.put("/product/:productId", JwtAuthMiddleware, upload.single('front_cover'), new UpdateProductController().handle);
routes.delete("/product/:productId", JwtAuthMiddleware, new DeleteProductController().handle);
routes.get("/product", JwtAuthMiddleware, new GetAllProductsController().handle);
routes.get("/product/:productId", JwtAuthMiddleware, new GetOneProductController().handle);

routes.get("/request", JwtAuthMiddleware, new GetAllRequestsController().handle);
routes.get("/request/:requestId", JwtAuthMiddleware, new GetOneRequestController().handle);
routes.put("/changerequeststatus/:requestId", JwtAuthMiddleware, new ChangeRequestStatusController().handle);

routes.get("/perfil", JwtAuthMiddleware, new GetPerfilDataController().handle);
routes.post("/perfil", JwtAuthMiddleware, upload.fields([
    {name: 'logo', maxCount: 1},
    {name: 'cover', maxCount: 1}
]), new UpdateCompanyDataController().handle);

export default routes;