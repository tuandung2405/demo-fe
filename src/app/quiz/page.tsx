'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import QuizList from './components/QuizList';
// components

const Dashboard = () => {
  return (
    <PageContainer title="Quiz" description="this is Quiz">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <QuizList />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;