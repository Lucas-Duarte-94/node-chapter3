import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";
import { getRepository, Repository } from 'typeorm'


class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Repository<Specification>;

    constructor() {
        this.specifications = getRepository(Specification);
    }
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.specifications.create({
            name,
            description
        })

        await this.specifications.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specifications.findOne({
            name
        });
        return specification;
    }

}

export { SpecificationRepository };