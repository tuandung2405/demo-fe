import { sampleQuizzes } from '../data/sampleQuizzes';
import http from '@/utils/http';

export interface Answer {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  question: string;
  answers: Answer[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

class QuizService {
  private quizzes: Quiz[] = [];

  constructor() {
    // Initialize with sample quizzes
    this.quizzes = sampleQuizzes;
  }

  getListQuiz(): Quiz[] {
    return this.quizzes;
  }

  getQuizById(id: string): Quiz | undefined {
    return this.quizzes.find(quiz => quiz.id === id);
  }

  async answerQuiz(quizId: string, answers: { [questionId: string]: string }): Promise<{ score: number; total: number }> {
    const quiz = this.getQuizById(quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    let score = 0;
    const total = quiz.questions.length;

    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });

    await http.post("leader-board/add-score", {
      score: score,
    });

    return { score, total };
  }
}

const quizService = new QuizService();
export default quizService;
