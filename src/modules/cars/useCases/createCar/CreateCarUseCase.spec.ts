import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            brand: "Marca Teste",
            category_id: "ID_TESTE",
            daily_rate: 100,
            description: "Teste de descrição",
            fine_amount: 60,
            license_plate: "ABC-1234",
            name: "Name Car",
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with same license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                brand: "Marca Teste",
                category_id: "ID_TESTE",
                daily_rate: 100,
                description: "Teste de descrição",
                fine_amount: 60,
                license_plate: "ABC-1234",
                name: "Car1",
            });

            await createCarUseCase.execute({
                brand: "Marca Teste",
                category_id: "ID_TESTE",
                daily_rate: 100,
                description: "Teste de descrição",
                fine_amount: 60,
                license_plate: "ABC-1234",
                name: "Car2",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a new car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            brand: "Marca Teste",
            category_id: "ID_TESTE",
            daily_rate: 100,
            description: "Teste de descrição",
            fine_amount: 60,
            license_plate: "ABC-1234",
            name: "Car1",
        });

        expect(car.available).toBe(true);
    });
});
