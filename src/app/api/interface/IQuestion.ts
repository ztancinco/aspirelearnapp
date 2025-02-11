import { Answer } from "./IAnswer";

export interface IQuestion {
  title: string;
  options: string[];
  correct_answer:  number | string;
  is_multiple_choice: boolean;
  answers: Answer[];
  text?: string;
}
