import { Category } from "../../entities/Category";
import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";

class ListCategoriesUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private categoryRepository: CategoryRepository) { }
    async execute(): Promise<Category[]> {
        const allCategories = await this.categoryRepository.list();

        return allCategories;
    }
}

export { ListCategoriesUseCase };
