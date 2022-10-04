import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
    }: IRequest): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate
        );

        if (carAlreadyExists) {
            throw new AppError("Car already exists.");
        }

        const newCar = await this.carsRepository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
        });

        return newCar;
    }
}

export { CreateCarUseCase };
