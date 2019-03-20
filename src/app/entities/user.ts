export class User {
  userId: string;
  username: string;
  password: string;
  email: string;
  gender: Gender;
  birthDate: Date;
}

enum Gender {
  MALE, FEMALE
}
