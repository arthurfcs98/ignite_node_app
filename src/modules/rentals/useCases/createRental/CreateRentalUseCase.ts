import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({
        car_id,
        expected_return_date,
        user_id,
    }: IRequest): Promise<Rental> {
        const minimumHourForRental = 24;
        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) throw new AppError("Car is unavailable");

        const rentalOpenUser = await this.rentalRepository.findOpenRantalByUser(
            user_id
        );

        if (rentalOpenUser)
            throw new AppError("There is a rental is progress for user!");

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        );

        if (compare < minimumHourForRental)
            throw new AppError("Invalid return time");

        const rental = await this.rentalRepository.create({
            car_id,
            expected_return_date,
            user_id,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}

export { CreateRentalUseCase };
