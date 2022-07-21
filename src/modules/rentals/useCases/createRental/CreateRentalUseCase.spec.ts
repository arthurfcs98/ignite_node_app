import dayjs from "dayjs";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: ICarsRepository;
let dateProvider: IDateProvider;

describe("Create rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalRepositoryInMemory = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalRepositoryInMemory,
            carsRepositoryInMemory,
            dateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            brand: "test",
            category_id: "test",
            daily_rate: 1234,
            description: "test",
            fine_amount: 100,
            license_plate: "test-1234",
            name: "ford ka",
        });
        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: "123eqr345390",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        const rental = await rentalRepositoryInMemory.create({
            car_id: "123890",
            user_id: "12390",
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                car_id: "djkafh",
                user_id: rental.user_id,
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There is a rental is progress for user!")
        );
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        const rental = await rentalRepositoryInMemory.create({
            car_id: "fdsafdsafdsaf",
            user_id: "4782578989034257890",
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                car_id: rental.car_id,
                user_id: "dshfjas",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("Should not be able to create a new rental with invalid return time (less then 24h)", async () => {
        await expect(
            createRentalUseCase.execute({
                car_id: "test",
                user_id: "dshfjas",
                expected_return_date: dayjs().add(20, "hour").toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time"));
    });
});
