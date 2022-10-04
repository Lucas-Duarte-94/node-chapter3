import { Specification } from "../entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";

class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Repository<Specification>;

    constructor() {
        this.specifications = getRepository(Specification);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.specifications.findByIds(ids);

        return specifications;
    }

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.specifications.create({
            name,
            description,
        });

        await this.specifications.save(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specifications.findOne({
            name,
        });
        return specification;
    }
}

export { SpecificationRepository };
