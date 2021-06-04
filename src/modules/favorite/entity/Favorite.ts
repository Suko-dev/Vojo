import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("favorites")
class Favorite {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    slug: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Favorite };
