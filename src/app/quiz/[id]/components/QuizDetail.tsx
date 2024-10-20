import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Alert } from '@mui/material';
import quizService, { Quiz } from '@/services/quizService';
import { useRouter } from 'next/navigation';

interface QuizDetailProps {
  quizId: string;
}

export default function QuizDetail({ quizId }: QuizDetailProps) {
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz>();
  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!quiz) return;
    setLoading(true);
    const quizResult = await quizService.answerQuiz(quiz.id, answers);
    setResult(quizResult);
    setLoading(false);
    
    // Add a delay before redirecting
    setTimeout(() => {
      router.push('/quiz');
    }, 1000); // 1 seconds delay
  }, [answers, quiz, router]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await quizService.getQuizById(quizId);
      setQuiz(quizData);
    };
    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return <Typography>Loading quiz details...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{quiz.name}</Typography>
      <Typography variant="body1" paragraph>{quiz.description}</Typography>

      {quiz.questions.map((question: any, index: number) => (
        <Box key={question.id} mb={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {`${index + 1}. ${question.question}`}
            </FormLabel>
            <RadioGroup
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            >
              {question.answers.map((answer: any) => (
                <FormControlLabel
                  key={answer.label}
                  value={answer.label}
                  control={<Radio />}
                  label={`${answer.label}: ${answer.value}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Answers'}
      </Button>

      {result && (
        <Box mt={4}>
          <Alert severity="info">
            Your score: {result.score} out of {result.total}
          </Alert>
        </Box>
      )}
    </Box>
  );
}
