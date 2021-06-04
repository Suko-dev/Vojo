import { User } from "../../user/entity/User";

interface IResponseCommentDTO {
    id: string;
    created_at: Date;
    updated_at: Date;
    body: string;
    author?: string;
    user?: User;
}
export { IResponseCommentDTO };
