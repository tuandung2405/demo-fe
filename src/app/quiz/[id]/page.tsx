"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import QuizDetail from './components/QuizDetail';

export default function QuizPage() {
  const params = useParams();
  const id = params.id;

  if (!id) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <PageContainer title="Quiz" description="Quiz details">
      <QuizDetail quizId={id as string} />
    </PageContainer>
  );
}
