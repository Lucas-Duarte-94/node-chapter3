import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("rentals")
class Rental {
    @PrimaryColumn()
    id?: string;

    @ManyToOne(() => Car)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    car_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Rental };
