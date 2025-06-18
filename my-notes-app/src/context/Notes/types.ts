export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  userId: string; // Обязательное поле
  updatedAt?: Date;
  isFavorite?: boolean;
  tags?: string[];
};


export type User = {
  login: string;
  password: string;
};
