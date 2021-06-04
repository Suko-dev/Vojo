import { IResponseProfileDTO } from "../../profile/dtos/IResponseProfileDTO";

interface IResponseArticleDTO {
    slug?: string;
    title?: string;
    description?: string;
    body: string;
    taglist?: string[];
    author?: IResponseProfileDTO;
    created_at: Date;
    updated_at: Date;
    // favorited: boolean;
    // favoritesCount: number;
}
export { IResponseArticleDTO };
