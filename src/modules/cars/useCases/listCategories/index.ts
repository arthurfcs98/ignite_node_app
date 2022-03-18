import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export default (): ListCategoriesController => {
    const categoriesRepository = new CategoryRepository();

    const listCategoriesUseCase = new ListCategoriesUseCase(
        categoriesRepository
    );

    const listCategoriesController = new ListCategoriesController(
        listCategoriesUseCase
    );

    return listCategoriesController;
};
