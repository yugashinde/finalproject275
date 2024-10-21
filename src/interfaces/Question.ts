
/** A representation of a Question in a quizzing application */
export interface Question {
    // map(): import("react").ReactNode;
     /** A unique identifier for the question */
     id: number;
     /** The human-friendly title of the question */
     name: string;
      /** The possible answers for a Question (for Multiple Choice questions) */
     options: string[];
     answer : string ;
     //collects user answer to be later user
  }
  