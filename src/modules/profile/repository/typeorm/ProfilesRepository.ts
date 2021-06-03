import { getRepository, Repository } from "typeorm";

import { Like } from "../../entity/Like";
import { IProfilesRepository } from "../IProfilesRepository";

class ProfilesRepository implements IProfilesRepository {
    private likeRepository: Repository<Like>;
    constructor() {
        this.likeRepository = getRepository(Like);
    }
    async ifFollowing(email: string, username: string): Promise<boolean> {
        const isFollowing = await this.likeRepository
            .createQueryBuilder("likes")
            .where(`follower = '${email}' and followed = '${username}'`)
            .getOne();
        if (!isFollowing) {
            return false;
        }
        return true;
    }
    async follow(email: string, username: string): Promise<boolean> {
        const isFollowing = await this.likeRepository
            .createQueryBuilder("likes")
            .where(`follower = '${email}' and followed = '${username}'`)
            .getOne();
        console.log(isFollowing);
        try {
            if (!isFollowing) {
                const follow = this.likeRepository.create({
                    follower: email,
                    followed: username,
                });
                console.log(follow);
                await this.likeRepository.save(follow);
            }
            return true;
        } catch (error) {
            return false;
        }
    }
    async unFollow(email: string, username: string): Promise<boolean> {
        const isFollowing = await this.likeRepository
            .createQueryBuilder("likes")
            .where(`follower = '${email}' and followed = '${username}'`)
            .getOne();
        if (isFollowing) {
            this.likeRepository
                .createQueryBuilder()
                .delete()
                .where(`follower = '${email}' and followed = '${username}'`)
                .execute();
        }
        return false;
    }
}

export { ProfilesRepository };
