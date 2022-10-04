import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationInMemory implements ISpecificationsRepository {
    specfications: Specification[] = [];

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
        });

        this.specfications.push(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        const specification = this.specfications.find(
            (spec) => spec.name === name
        );

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specfications.filter((spec) =>
            ids.includes(spec.id)
        );

        return specifications;
    }
}

export { SpecificationInMemory };
