import { ICreateCarsDTO } from "../dtos/ICreateCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarsDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    listAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
