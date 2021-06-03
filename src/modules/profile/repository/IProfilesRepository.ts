interface IProfilesRepository {
    ifFollowing(email: string, username: string): Promise<boolean>;
    follow(email: string, username: string): Promise<boolean>;
    unFollow(email: string, username: string): Promise<boolean>;
}

export { IProfilesRepository };
