import React, { useCallback, useEffect, useState } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
} from '@mui/material';
import { useRouter } from 'next/navigation';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import quizService from '@/services/quizService';
import useTop3User from '../hooks/useTop3User';
import UserCard from './UserCard';

const QuizList = () => {
    const quizzes = quizService.getListQuiz();
    const router = useRouter();
    const topUsers = useTop3User();

    const handleJoinQuiz = useCallback((quizId: string) => {
        router.push(`/quiz/${quizId}`);
    }, [router]);

    return (
        <DashboardCard title="Quiz List">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Typography variant="h6" gutterBottom>
                    Top 3 Users
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    {topUsers.map((user, index) => (
                        <UserCard key={user.id} user={user} rank={index + 1} />
                    ))}
                </Box>
                <Table
                    aria-label="quiz list table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Id
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Description
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Questions
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizzes.map((quiz) => (
                            <TableRow key={quiz.id}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {quiz.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {quiz.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="body2">
                                        {quiz.description}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2">
                                        {quiz.questions.length}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        size="small"
                                        onClick={() => handleJoinQuiz(quiz.id)}
                                    >
                                        Join Quiz
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default QuizList;
