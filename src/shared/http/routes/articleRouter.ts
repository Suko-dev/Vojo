import { Router } from "express";

import { CreateArticleController } from "../../../modules/article/usecase/createArticle/createArticleController";
import { DeleteArticleController } from "../../../modules/article/usecase/deleteArticle/deleteArticleController";
import { GetArticleController } from "../../../modules/article/usecase/getArticle/getArticleController";
import { ListArticlesController } from "../../../modules/article/usecase/listArticles/listArticlesController";
import { UpdateArticleController } from "../../../modules/article/usecase/updateArticle/updateArticleController";
import { authentication } from "../middlewares/authentication";
import { optionalAuthentication } from "../middlewares/optionalAuthentication";

const articleRoutes = Router();
const createArticleController = new CreateArticleController();
const updateArticleController = new UpdateArticleController();
const getArticleController = new GetArticleController();
const listArticlesController = new ListArticlesController();
const deleteArticleController = new DeleteArticleController();

articleRoutes.post("/", authentication, createArticleController.handle);
articleRoutes.put("/:slug", authentication, updateArticleController.handle);
articleRoutes.delete("/:slug", authentication, deleteArticleController.handle);
articleRoutes.get(
    "/:slug",
    optionalAuthentication,
    getArticleController.handle
);
articleRoutes.get("/", optionalAuthentication, listArticlesController.handle);

export { articleRoutes };
