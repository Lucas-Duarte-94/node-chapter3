import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryController.handle
);

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.get("/", listCategoriesController.handle);

export { categoriesRoutes };
