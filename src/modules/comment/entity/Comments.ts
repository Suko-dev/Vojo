import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { User } from "../../user/entity/User";

@Entity("comments")
class Comment {
    @PrimaryColumn()
    id: string;

    @Column()
    body: string;

    @Column()
    slug: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "author_email" })
    user: User;

    @Column()
    author_email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Comment };
