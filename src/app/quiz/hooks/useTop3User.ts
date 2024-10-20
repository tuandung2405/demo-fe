import { useState, useEffect } from 'react';
import leaderBoardService from '@/services/leaderBoardService';
import { LeaderBoard } from '@/models/LeaderBoard';
import { Client } from '@stomp/stompjs';

function useTop3User() {
  const [topUsers, setTopUsers] = useState<LeaderBoard[]>([]);

  useEffect(() => {
      const client = new Client({
          brokerURL: 'ws://localhost:9100/ws',
          onConnect: () => {
              console.log('Connected to STOMP server');
              client.subscribe('/topic/realtime/top3', (message) => {
                  const updatedTopUsers = JSON.parse(message.body);

                  setTopUsers(updatedTopUsers);
              });
          },
      });

      client.activate();

      return () => {
          if (client.active) {
              client.deactivate();
          }
      };
  }, [setTopUsers]);

  useEffect(() => {
    const fetchTop3Users = async () => {
      try {
        const users = await leaderBoardService.getTop3User();
        setTopUsers(users);
      } catch (error) {
        console.error("Failed to fetch top 3 users:", error);
      }
    };

    fetchTop3Users();
  }, [setTopUsers]);

  return topUsers;
}

export default useTop3User;

