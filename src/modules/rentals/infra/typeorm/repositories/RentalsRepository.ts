import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;
    constructor() {
        this.repository = getRepository(Rental);
    }

    async findById(id: string): Promise<Rental> {
        const rental = this.repository.findOne(id);
        return rental;
    }

    async create({
        car_id,
        end_date,
        expected_return_date,
        user_id,
        id,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            car_id,
            end_date,
            expected_return_date,
            start_date: new Date(),
            user_id,
            id,
            total,
        });

        await this.repository.save(rental);

        return rental;
    }
    async findOpenRantalByUser(user_id: string): Promise<Rental> {
        const rental = this.repository.findOne({
            where: {
                user_id,
                end_date: null,
            },
        });

        return rental;
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: {
                car_id,
                end_date: null,
            },
        });

        return rental;
    }
}

export { RentalsRepository };
