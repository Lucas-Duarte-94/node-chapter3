import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
    ICategoriesRepositories,
    ICreateCategoryDTO,
} from "../ICategoriesRepositories";

class CategoriesRepositoryInMemory implements ICategoriesRepositories {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }
    async list(): Promise<Category[]> {
        return this.categories;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
        });

        this.categories.push(category);
    }
}

export { CategoriesRepositoryInMemory };
