import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private categoryRepository: CategoryRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoryRepository.findByName(
            name
        );

        if (categoryAlreadyExists) {
            throw new Error("Category already exists!");
        }

        await this.categoryRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
