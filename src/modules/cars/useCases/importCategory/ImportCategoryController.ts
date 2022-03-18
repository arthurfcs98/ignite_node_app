import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    // eslint-disable-next-line prettier/prettier
    constructor(private importCategoryUseCase: ImportCategoryUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        await this.importCategoryUseCase.execute(file);
        return response.send();
    }
}

export { ImportCategoryController };
