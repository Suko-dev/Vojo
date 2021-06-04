import { getRepository, Repository } from "typeorm";

import { Follow } from "../../entity/Follow";
import { IProfilesRepository } from "../IProfilesRepository";

class ProfilesRepository implements IProfilesRepository {
    private followRepository: Repository<Follow>;
    constructor() {
        this.followRepository = getRepository(Follow);
    }
    async ifFollowing(email: string, username: string): Promise<boolean> {
        const isFollowing = await this.followRepository
            .createQueryBuilder("follows")
            .where(`follower = '${email}' and followed = '${username}'`)
            .getOne();
        if (!isFollowing) {
            return false;
        }
        return true;
    }
    async follow(email: string, username: string): Promise<boolean> {
        const isFollowing = await this.followRepository
            .createQueryBuilder("follows")
            .where(`follower = '${email}' and followed = '${username}'`)
            .getOne();
        try {
            if (!isFollowing) {
                const follow = this.followRepository.create({
                    follower: email,
                    followed: username,
                });
                await this.followRepository.save(follow);
            }
            return true;
        } catch (error) {
            return false;
        }
    }
    async unFollow(email: string, username: string): Promise<boolean> {
        const isFollowing = await this.followRepository
            .createQueryBuilder("follows")
            .where(`follower = '${email}' and followed = '${username}'`)
            .getOne();
        if (isFollowing) {
            this.followRepository
                .createQueryBuilder()
                .delete()
                .where(`follower = '${email}' and followed = '${username}'`)
                .execute();
        }
        return false;
    }
}

export { ProfilesRepository };
