import { ICategoriesRepositories } from "../../repositories/ICategoriesRepositories";
import fs from 'fs';
import { parse } from 'csv-parse';
import { inject, injectable } from "tsyringe";

interface IImportCatetogy {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepositories) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCatetogy[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCatetogy[] = [];
        
            const parseFile = parse()
        
            stream.pipe(parseFile)
        
            parseFile.on("data", async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                })
            })
    
            .on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories)
            })
            .on("error", (err) => {
                reject(err)
            })


        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = await this.categoryRepository.findByName(name);

            if(!existCategory) {
                await this.categoryRepository.create({
                    name,
                    description
                })
            }
        })
    }
}

export { ImportCategoryUseCase };