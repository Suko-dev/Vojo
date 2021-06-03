import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1622726805861 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "email",
                        type: "varchar",
                        isPrimary: true,
                    },
                    {
                        name: "username",
                        type: "varchar",
                    },
                    {
                        name: "bio",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "image",
                        type: "varchar",
                        isNullable: true,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("users");
    }
}
