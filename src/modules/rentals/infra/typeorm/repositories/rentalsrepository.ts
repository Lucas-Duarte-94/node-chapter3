import { ICreateRentalDTO } from "@modules/rentals/DTOs/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"],
        });

        return rentals;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);

        return rental;
    }

    async create(data: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            ...data,
        });

        await this.repository.save(rental);

        return rental;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: { car_id, end_date: null },
        });
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return await this.repository.findOne({
            where: { user_id, end_date: null },
        });
    }
}

export { RentalsRepository };
