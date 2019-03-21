import {User} from "./user";

export class Quiz {
  _id: string;
  visible: boolean;
  user: User;
  title: string;
  created?: Date;
  questions: Question[];
}

export class Question {
  title: string;
  options: Option[];
}

export class Option {
  answer: string;
  correct: boolean;

}
