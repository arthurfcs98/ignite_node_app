import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalRepositoryInMemory: IRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: IDateProvider;

describe("Create rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        rentalRepositoryInMemory = new RentalsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalRepositoryInMemory,
            dateProvider
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            car_id: "12wereqw3890",
            user_id: "123eqr345390",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user", async () => {
        await expect(async () => {
            const rental = await rentalRepositoryInMemory.create({
                car_id: "123890",
                user_id: "12390",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                car_id: "djkafh",
                user_id: rental.user_id,
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if there is another open to the same car", async () => {
        await expect(async () => {
            const rental = await rentalRepositoryInMemory.create({
                car_id: "fdsafdsafdsaf",
                user_id: "4782578989034257890",
                expected_return_date: dayAdd24Hours,
            });

            await createRentalUseCase.execute({
                car_id: rental.car_id,
                user_id: "dshfjas",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with invalid return time (less then 24h)", async () => {
        await expect(async () => {
            await createRentalUseCase.execute({
                car_id: "test",
                user_id: "dshfjas",
                expected_return_date: dayjs().add(20, "hour").toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
