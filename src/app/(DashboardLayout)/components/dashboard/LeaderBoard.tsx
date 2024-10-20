import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { IconTrophy, IconMedal2, IconMedal } from '@tabler/icons-react';
import { LeaderBoard as LeaderBoardType } from '@/models/LeaderBoard';

import useLongPolling from '@/hook/useLongPolling';
import useLeaderboardService from '@/hook/useLeaderboardService';

const LeaderBoard = () => {
    const leaderBoardService = useLeaderboardService();

    const [users, setUsers] = useState<LeaderBoardType[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);

    const fetchUsers = useCallback(async () => {
        try {
            const { users, pagination } = await leaderBoardService.getLeaderboard(page, rowsPerPage);
            setUsers(users);
            setTotalUsers(pagination.totalUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [leaderBoardService, page, rowsPerPage]);

    useLongPolling(fetchUsers);

    const handleChangePage = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }, []);

    const getRowIcon = useCallback((index: number) => {
        switch (index) {
            case 0:
                return <IconTrophy color="gold" />;
            case 1:
                return <IconMedal2 color="silver" />;
            case 2:
                return <IconMedal color="#CD7F32" />;
            default:
                return null;
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <DashboardCard title="Leader Board">
            <>
                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table
                        aria-label="leader board table"
                        sx={{
                            whiteSpace: "nowrap",
                            mt: 2
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        No
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        User Code
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Full Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Score
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Created Date
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.map((user, index) => (
                                <TableRow
                                    key={user.id}
                                    sx={index < 3 ? { backgroundColor: 'rgba(0, 0, 0, 0.04)' } : {}}
                                >
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {getRowIcon(page * rowsPerPage + index)}
                                            <Typography variant="subtitle2" fontWeight={500} sx={{ ml: 1 }}>
                                                {page * rowsPerPage + index + 1}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={500}>
                                            {user.userCode}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={500}>
                                            {user.userFullname}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={500}>
                                            {user.score}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={500}>
                                            {new Date(user.createdDatetime).toLocaleDateString()}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalUsers}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </>
        </DashboardCard>
    );
};

export default LeaderBoard;
