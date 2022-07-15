import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
    daily_rete: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

// @injectable()
class CreateCarUseCase {
    constructor(
        // @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({
        name,
        license_plate,
        brand,
        category_id,
        daily_rete,
        description,
        fine_amount,
    }: IRequest): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate
        );

        if (carAlreadyExists) throw new AppError("Car already exists!");

        const car = await this.carsRepository.create({
            name,
            brand,
            category_id,
            daily_rete,
            description,
            fine_amount,
            license_plate,
        });

        return car;
    }
}

export { CreateCarUseCase };
