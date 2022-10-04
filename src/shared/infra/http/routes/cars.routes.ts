import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import uploadConfig from "../../../../config/upload";
import multer from "multer";

const carsRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp/cars"));

const createCarcontroller = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarcontroller.handle
);

carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.get("/available", listCarsController.handle);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes };
