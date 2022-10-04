import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

class ListCarsController {
    async handle(request: Request, response: Response) {
        const { brand, category_id, name } = request.query;

        const listCarsUseCase = container.resolve(ListCarsUseCase);

        const cars = await listCarsUseCase.execute({
            brand: brand as string,
            category_id: category_id as string,
            name: name as string,
        });

        return response.json(cars);
    }
}

export { ListCarsController };
