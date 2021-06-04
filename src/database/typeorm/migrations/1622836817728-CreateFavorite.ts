import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFavorite1622836817728 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "favorites",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "slug",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fkFollowerArticle",
                        referencedTableName: "users",
                        referencedColumnNames: ["email"],
                        columnNames: ["email"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                    {
                        name: "fkFollowed",
                        referencedTableName: "articles",
                        referencedColumnNames: ["slug"],
                        columnNames: ["slug"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("favorites");
    }
}
