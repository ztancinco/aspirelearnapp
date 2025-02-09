export interface Quiz {
  title: string;
  questions: {
    title: string;
    options: string[];
    correct_answer: number | string;
    is_muliple_choice: boolean;
  }[];
}
