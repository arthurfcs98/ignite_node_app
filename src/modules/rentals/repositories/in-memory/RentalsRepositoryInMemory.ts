import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];
    async create({
        car_id,
        end_date,
        expected_return_date,
        user_id,
        id,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            end_date,
            expected_return_date,
            start_date: new Date(),
            user_id,
            id,
            total,
        });

        this.rentals.push(rental);

        return rental;
    }
    async findOpenRantalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.user_id === user_id && !rental.end_date
        );
    }
    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.car_id === car_id && !rental.end_date
        );
    }
}

export { RentalsRepositoryInMemory };
