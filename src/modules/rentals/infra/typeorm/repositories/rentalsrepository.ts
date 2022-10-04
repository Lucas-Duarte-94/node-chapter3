import { ICreateRentalDTO } from "@modules/rentals/DTOs/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create(data: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            ...data,
        });

        await this.repository.save(rental);

        return rental;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({ car_id });
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({ user_id });
    }
}

export { RentalsRepository };
