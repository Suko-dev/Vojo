import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column({ default: "" })
    bio: string;

    @Column({ default: null })
    image: string;

    @Column({ unique: true })
    username: string;

    constructor() {
        if (!this.bio) {
            this.bio = "";
        }
    }
}

export { User };
