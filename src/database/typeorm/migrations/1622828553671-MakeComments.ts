import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MakeComments1622828553671 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "comments",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    {
                        name: "body",
                        type: "varchar",
                    },
                    {
                        name: "slug",
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
                        name: "fkCommentAuthor",
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
        queryRunner.dropTable("comments");
    }
}
