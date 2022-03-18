import { container } from "tsyringe";

import { CategoryRepository } from "../../modules/cars/repositories/implementations/CategoryRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/implementations/ICategoryRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/implementations/ISpecificationRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";

container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
    "SpecificationRepository",
    SpecificationRepository
);
