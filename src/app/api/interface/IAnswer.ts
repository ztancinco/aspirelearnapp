export interface Answer {
  text: string;
  options: string[];
  correct_answer:  number | string;
  is_multiple_choice: boolean;
  is_correct?: boolean;
  id?: number;
}
