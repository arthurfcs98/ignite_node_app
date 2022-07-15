import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    it("Should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Name",
            description: "Car Description",
            daily_rete: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Car Brand",
            category_id: "category",
        });

        expect(car).toHaveProperty("id");
    });

    it("Shoul not be able to create a car with exists license plate", async () => {
        await expect(async () => {
            await createCarUseCase.execute({
                name: "Car Name 1",
                description: "Car Description",
                daily_rete: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Car Brand",
                category_id: "category",
            });

            await createCarUseCase.execute({
                name: "Car Name 2",
                description: "Car Description",
                daily_rete: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Car Brand",
                category_id: "category",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create a car whith available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car Name",
            description: "Car Description",
            daily_rete: 100,
            license_plate: "ABCD-12345",
            fine_amount: 60,
            brand: "Car Brand",
            category_id: "category",
        });

        expect(car.available).toBe(true);
    });
});
