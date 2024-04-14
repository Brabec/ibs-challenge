import { compare } from 'bcrypt';

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    resolve(data);
  });
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await compare(plainPassword, hashedPassword);
};
