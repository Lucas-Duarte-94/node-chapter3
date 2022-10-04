import { ICreateCarDTO } from "@modules/cars/DTOs/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async findById(id: string): Promise<Car> {
        const car = this.cars.find((car) => car.id === id);

        return car;
    }

    async findAvailable(
        brand: string,
        category_id: string,
        name: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (car.available) {
                if (
                    (brand && car.brand === brand) ||
                    (category_id && car.category_id === category_id) ||
                    (name && car.name === name)
                ) {
                    return car;
                } else if (!brand && !category_id && !name) {
                    return car;
                }
                return null;
            }
            return null;
        });

        return cars;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        id,
        specifications,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            id,
            specifications,
        });

        this.cars.push(car);

        return car;
    }
}

export { CarsRepositoryInMemory };