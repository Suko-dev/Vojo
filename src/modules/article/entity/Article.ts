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

@Entity("articles")
class Article {
    @PrimaryColumn()
    slug: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    body: string;

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
        if (!this.slug) {
            this.slug = uuid();
        }
    }
}

export { Article };
