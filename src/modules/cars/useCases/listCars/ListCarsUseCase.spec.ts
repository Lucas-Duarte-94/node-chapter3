import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("LIst Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to return all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 140,
            license_plate: "BCD-9879",
            fine_amount: 100,
            brand: "car_brand",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car_test",
            description: "Car description",
            daily_rate: 140,
            license_plate: "BCD-9879",
            fine_amount: 100,
            brand: "car_brand",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            name: "Car_test",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car_test",
            description: "Car description",
            daily_rate: 140,
            license_plate: "BCD-9879",
            fine_amount: 100,
            brand: "car_brand",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            category_id: "category_id",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car_test",
            description: "Car description",
            daily_rate: 140,
            license_plate: "BCD-9879",
            fine_amount: 100,
            brand: "car_brand",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            brand: "car_brand",
        });

        expect(cars).toEqual([car]);
    });
});
