import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLikes1622748032307 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "likes",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "follower",
                        type: "varchar",
                    },
                    {
                        name: "followed",
                        type: "varchar",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fkFollowerLike",
                        referencedTableName: "users",
                        referencedColumnNames: ["email"],
                        columnNames: ["follower"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "fkFollowedLike",
                        referencedTableName: "users",
                        referencedColumnNames: ["username"],
                        columnNames: ["followed"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("likes");
    }
}
