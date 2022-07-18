import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepository: ICarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
    beforeAll(() => {
        carsRepository = new CarsRepositoryInMemory();

        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    });

    it("Should be able to list all available cars.", async () => {
        const car = await carsRepository.create({
            name: "Car Name",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Car Brand",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepository.create({
            name: "Car brand test",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Car Brand test",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car Brand test",
        });

        expect(cars).toEqual([car]);
    });
    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepository.create({
            name: "Car Name test",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Car Brand test",
            category_id: "category",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car Name test",
        });

        expect(cars).toEqual([car]);
    });
    it("Should be able to list all available cars by category_id", async () => {
        const car = await carsRepository.create({
            name: "Car category_id test",
            description: "Car Description",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Car Brand test",
            category_id: "category test",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "category test",
        });

        expect(cars).toEqual([car]);
    });
});
