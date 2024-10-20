import { LeaderBoard } from "@/models/LeaderBoard";
import http from "@/utils/http";
import { AxiosInstance } from "axios";

interface PaginationData {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface LeaderboardResponse {
  users: LeaderBoard[];
  pagination: PaginationData;
}

export class LeaderBoardService {
  private http: AxiosInstance;

  constructor(httpParams?: AxiosInstance) {
    this.http = httpParams || http;
  }

  async getLeaderboard(
      page: number,
      pageSize: number
  ): Promise<LeaderboardResponse> {
    const res = await this.http.post("/leader-board/paging", {
      page: page,
      size: pageSize,
    });

    return {
      users: res.data.content,
      pagination: {
        totalUsers: res.data.totalElements,
        totalPages: res.data.totalPages,
        currentPage: res.data.pageable.pageNumber,
        pageSize: res.data.pageable.pageSize,
      },
    };
  }

  // Function to get top 3 users based on score
  async getTop3User(): Promise<LeaderBoard[]> {
    const res = await http.get("/leader-board/top3");

    console.log(res);

    return res.data.map((item: any) => ({
      id: item.id,
      score: item.score,
      userCode: item.userCode,
      userFullname: item.userFullname,
      createdDatetime: item.createdDatetime,
    }));
  }

}

const leaderBoardService = new LeaderBoardService();

export default leaderBoardService;
