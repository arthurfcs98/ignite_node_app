import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoryRepository";

@injectable()
class ListCategoriesUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: CategoryRepository
    ) {}
    async execute(): Promise<Category[]> {
        const allCategories = await this.categoryRepository.list();

        return allCategories;
    }
}

export { ListCategoriesUseCase };
