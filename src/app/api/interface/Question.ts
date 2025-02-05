export interface Question {
  title: string;
  options: string[];
  correctAnswer:  number | string;
  isMultipleChoice: boolean;
}
