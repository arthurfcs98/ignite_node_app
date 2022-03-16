import { Category } from "../../model/Category";
import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";

class ListCategoriesUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private categoryRepository: CategoryRepository) { }
    execute(): Category[] {
        const allCategories = this.categoryRepository.list();

        return allCategories;
    }
}

export { ListCategoriesUseCase };
