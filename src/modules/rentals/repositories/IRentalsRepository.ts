import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    create({
        car_id,
        end_date,
        expected_return_date,
        user_id,
        id,
        total,
    }: ICreateRentalDTO): Promise<Rental>;
    findOpenRantalByUser(user_id: string): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
}

export { IRentalsRepository };
