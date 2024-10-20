// Import necessary components and libraries
import React, { useCallback, useMemo } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LeaderBoard } from '@/models/LeaderBoard';
import { IconStar, IconCrown, IconMedal } from '@tabler/icons-react'; // Import the icons

type Props = {
    user: LeaderBoard;
    rank: number; 
}

const UserCard: React.FC<Props> = ({ user, rank }) => { 
  const icon = useMemo(() => {
    switch (rank) {
      case 1:
        return <IconCrown size={24} style={{ marginRight: 8, color: 'gold' }} />;
      case 2:
        return <IconMedal size={24} style={{ marginRight: 8, color: 'silver' }} />;
      case 3:
        return <IconStar size={24} style={{ marginRight: 8, color: 'bronze' }} />;
      default:
        return null;
    }
  }, [rank]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" style={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          {`Top ${rank}: ${user.userFullname}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Score: {user.score}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
