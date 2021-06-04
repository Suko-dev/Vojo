import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArticle1622758517237 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "articles",
                columns: [
                    {
                        name: "slug",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "body",
                        type: "varchar",
                    },
                    {
                        name: "author_email",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "fkArticleAuthor",
                        referencedTableName: "users",
                        referencedColumnNames: ["email"],
                        columnNames: ["author_email"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("articles");
    }
}
