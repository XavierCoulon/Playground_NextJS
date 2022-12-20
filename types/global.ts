export type Book = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  category: Category;
  authorId: string;
  user: User;
};

export type User = {
  id: string;
  name: string;
  password: string;
};

export type Category = {
  id: string;
  name: string;
};
