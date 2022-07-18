import { getRepository, Repository } from "typeorm";

import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;
    constructor() {
        this.repository = getRepository(Car);
    }
    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
    }: ICreateCarsDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
        });

        await this.repository.save(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate,
        });

        return car;
    }
    async listAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("c")
            .where("c.available = :available", { available: true });

        if (name) carsQuery.andWhere("c.name = :name", { name });
        if (brand) carsQuery.andWhere("c.brand = :brand", { brand });
        if (category_id)
            carsQuery.andWhere("c.category_id = :category_id", { category_id });

        const cars = await carsQuery.getMany();

        return cars;
    }
}

export { CarsRepository };
