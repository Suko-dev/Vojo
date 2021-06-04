import { Router } from "express";

import { CreateArticleController } from "../../../modules/article/usecase/createArticle/createArticleController";
import { DeleteArticleController } from "../../../modules/article/usecase/deleteArticle/deleteArticleController";
import { GetArticleController } from "../../../modules/article/usecase/getArticle/getArticleController";
import { ListArticlesController } from "../../../modules/article/usecase/listArticles/listArticlesController";
import { UpdateArticleController } from "../../../modules/article/usecase/updateArticle/updateArticleController";
import { CreateCommentController } from "../../../modules/comment/usecase/createComment/createCommentController";
import { DeleteCommentController } from "../../../modules/comment/usecase/deleteComment/deleteCommentController";
import { GetCommentController } from "../../../modules/comment/usecase/getComment/getCommentController";
import { FavoriteProfileController } from "../../../modules/favorite/usecase/favoriteArticle/favoriteProfileController";
import { UnFavoriteProfileController } from "../../../modules/favorite/usecase/unFavoriteArticle/unFavoriteProfileController";
import { authentication } from "../middlewares/authentication";
import { optionalAuthentication } from "../middlewares/optionalAuthentication";

const articleRoutes = Router();
const createArticleController = new CreateArticleController();
const deleteArticleController = new DeleteArticleController();
const updateArticleController = new UpdateArticleController();
const getArticleController = new GetArticleController();
const listArticlesController = new ListArticlesController();

const createCommentController = new CreateCommentController();
const getCommentController = new GetCommentController();
const deleteCommentController = new DeleteCommentController();

const favoriteArticleController = new FavoriteProfileController();
const unfavoriteArticleController = new UnFavoriteProfileController();

articleRoutes.post("/", authentication, createArticleController.handle);
articleRoutes.put("/:slug", authentication, updateArticleController.handle);
articleRoutes.delete("/:slug", authentication, deleteArticleController.handle);
articleRoutes.get(
    "/:slug",
    optionalAuthentication,
    getArticleController.handle
);
articleRoutes.get("/", optionalAuthentication, listArticlesController.handle);

articleRoutes.post(
    "/:slug/comments",
    authentication,
    createCommentController.handle
);
articleRoutes.get(
    "/:slug/comments",
    optionalAuthentication,
    getCommentController.handle
);
articleRoutes.delete(
    "/:slug/comments/:id",
    optionalAuthentication,
    deleteCommentController.handle
);

articleRoutes.post(
    "/:slug/favorite",
    authentication,
    favoriteArticleController.handle
);
articleRoutes.delete(
    "/:slug/favorite",
    authentication,
    unfavoriteArticleController.handle
);
export { articleRoutes };
