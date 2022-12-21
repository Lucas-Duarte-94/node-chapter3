import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import dayjs from "dayjs";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsProvider,
            carsRepositoryInMemory
        );
    });

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "test",
            description: "test",
            daily_rate: 50,
            license_plate: "test",
            fine_amount: 30,
            category_id: "test_id",
            brand: "brand",
        });

        const rental = await createRentalUseCase.execute({
            user_id: "123456",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to rent a car to an user with existing rental", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "1212123",
            expected_return_date: dayAdd24Hours,
            user_id: "123456",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "123456",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There is a rental in progress for this user!")
        );
    });

    it("should not be able to rent a car if car is already rent", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "user_id1",
            car_id: "car_test_id",
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "user_id2",
                car_id: "car_test_id",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is not available!"));
    });

    it("should not be able to rent a car with less than 24 hours to return car", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "user_id1",
                car_id: "car_test_id",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(
            new AppError(
                "A rental should have at least 24 hours of return date!"
            )
        );
    });
});
