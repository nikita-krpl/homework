export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
};

export type User = {
  login: string;
  password: string;
};