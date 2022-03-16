import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    // eslint-disable-next-line prettier/prettier
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }

    handle(request: Request, response: Response): Response {
        const allCategories = this.listCategoriesUseCase.execute();

        return response.json(allCategories);
    }
}

export { ListCategoriesController };
