/* eslint-disable prettier/prettier */
import { inject, injectable } from "tsyringe";

import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: CategoryRepository
    ) { }

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
