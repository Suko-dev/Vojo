import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("follows")
class Follow {
    @PrimaryColumn()
    id: string;

    @Column()
    follower: string;

    @Column()
    followed: string;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Follow };
