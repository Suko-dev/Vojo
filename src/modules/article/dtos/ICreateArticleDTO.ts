interface ICreateArticleDTO {
    title: string;
    description: string;
    body: string;
    email: string;
    taglist?: string[];
}
export { ICreateArticleDTO };
