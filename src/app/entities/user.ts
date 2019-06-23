export class User {
  _id: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
  gender: Gender;
  email: string;
  username: string;
  password: string;
}

export enum Gender {
  MALE, FEMALE
}
