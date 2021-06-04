import { container } from "tsyringe";
import { getRepository, Repository } from "typeorm";

import { GetUserUseCase } from "../../../user/usecase/getUser/getUserUseCase";
import { IResponseArticleDTO } from "../../dtos/IResponseArticleDTO";
import { IUpdateArticleDTO } from "../../dtos/IUpdateArticleDTO";
import { Article } from "../../entity/Article";
import { IArticlesRepository } from "../IArticlesRepository";

class ArticlesRepository implements IArticlesRepository {
    private articleRepository: Repository<Article>;
    private getUser = container.resolve(GetUserUseCase);

    constructor() {
        this.articleRepository = getRepository(Article);
    }
    async isAuthor(slug: string, email: string): Promise<boolean> {
        const userMail = await this.articleRepository.findOne({ slug });
        if (userMail?.author_email === email) {
            return true;
        }
        return false;
    }
    async getArticle(
        feed: boolean,
        email: string,
        pageLimit?: number,
        page?: number,
        tag?: string,
        author?: string,
        favorited?: string
    ): Promise<IResponseArticleDTO[]> {
        let limit = 20;
        let offset = 0;

        /* if (favorited) {
            Object.assign(query, { favorited });
        }
        if (tag) {
            Object.assign(query, { tag });
        } */

        const builder = this.articleRepository.createQueryBuilder("articles");

        if (author) {
            builder.where(`author_email = '${author}'`);
        }

        if (pageLimit) {
            limit = Number(pageLimit);
        }
        if (page) {
            offset = page;
        }
        builder.limit(limit).offset(offset).orderBy("articles.updated_at");
        let articles: Article[];
        try {
            articles = await builder.getMany();
        } catch (error) {
            throw new Error(error);
        }
        return articles;
    }
    async getArticleBySlug(
        slug: string,
        email?: string
    ): Promise<IResponseArticleDTO> {
        const article = await this.articleRepository.findOne(slug, {
            where: { slug },
            relations: ["user"],
        });
        return article as Article;
    }
    async create(
        title: string,
        description: string,
        body: string,
        email: string
    ): Promise<IResponseArticleDTO> {
        const article = this.articleRepository.create({
            title,
            description,
            body,
            author_email: email,
        });
        try {
            await this.articleRepository.save(article);
        } catch (error) {
            throw new Error("não salvou");
        }
        return article;
    }
    async update({
        slug,
        title,
        description,
        body,
    }: IUpdateArticleDTO): Promise<IResponseArticleDTO | undefined> {
        const builder = this.articleRepository
            .createQueryBuilder()
            .update(Article);
        if (title) {
            builder.set({ title });
        }
        if (description) {
            builder.set({ description });
        }
        if (body) {
            builder.set({ body });
        }
        await builder.where(`slug = '${slug}'`).execute();
        const updatedArticle = await this.articleRepository.findOneOrFail({
            slug,
        });
        return updatedArticle;
    }
    async delete(slug: string): Promise<void> {
        await this.articleRepository.delete({ slug });
    }
    async favorite(slug: string, email: string): Promise<IResponseArticleDTO> {
        throw new Error("Method not implemented.");
    }
    async unFavorite(
        slug: string,
        email: string
    ): Promise<IResponseArticleDTO> {
        throw new Error("Method not implemented.");
    }
}

export { ArticlesRepository };
