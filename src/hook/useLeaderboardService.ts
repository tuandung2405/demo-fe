import { LeaderBoardService } from "@/services/leaderBoardService";
import useAbortController from "./useAbortController";
import http from "@/utils/http";
import { useMemo } from "react";

function useLeaderboardService() {
    // const { axiosInstance } = useAbortController(http);

    return useMemo(() => new LeaderBoardService(), []);

}

export default useLeaderboardService;

