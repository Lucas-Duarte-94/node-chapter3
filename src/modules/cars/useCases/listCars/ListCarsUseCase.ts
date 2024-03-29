import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarsRepository") private carsReposiroty: ICarsRepository
    ) {}

    async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsReposiroty.findAvailable(
            brand,
            category_id,
            name
        );
        return cars;
    }
}

export { ListCarsUseCase };
