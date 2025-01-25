export interface Quiz {
  title: string;
  questions: {
    title: string;
    options: string[];
    correctAnswer: number | string;
    isMultipleChoice: boolean;
  }[];
}
