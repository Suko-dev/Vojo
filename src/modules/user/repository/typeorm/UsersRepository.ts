import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../entity/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = getRepository(User);
    }
    async create({ email, password, username }: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({ email, password, username });
        await this.repository.save(user);
        return user;
    }
    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.repository.findOne({ email });
        return user;
    }
    async findByUsername(username: string): Promise<User | undefined> {
        const user = this.repository.findOne({ username });
        return user;
    }
    async update({
        email,
        username,
        password,
        bio,
        image,
        newemail,
    }: IUpdateUserDTO): Promise<User> {
        const builder = this.repository.createQueryBuilder().update(User);
        if (username) {
            builder.set({ username });
        }
        if (password) {
            builder.set({ password });
        }
        if (bio) {
            builder.set({ bio });
        }
        if (image) {
            builder.set({ image });
        }
        if (newemail) {
            const userExist = await this.repository.findOne({
                email: newemail,
            });
            if (userExist) {
                throw new Error("Email already registered");
            }
            builder.set({ email: newemail });
        }
        await builder.where(`email = '${email}'`).execute();
        const updatedUser = newemail
            ? await this.repository.findOneOrFail({ email: newemail })
            : await this.repository.findOneOrFail({ email });
        return updatedUser;
    }
}
export { UsersRepository };
