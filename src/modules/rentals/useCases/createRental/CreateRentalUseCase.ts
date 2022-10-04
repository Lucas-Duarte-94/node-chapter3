import { AppError } from "@errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumRentHours = 24;

        const isCarRent = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (isCarRent) {
            throw new AppError("Car is not available!");
        }

        const hasOpenRentalToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (hasOpenRentalToUser) {
            throw new AppError("There is a rental in progress for this user!");
        }

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < minimumRentHours) {
            throw new AppError(
                "A rental should have at least 24 hours of return date!"
            );
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
