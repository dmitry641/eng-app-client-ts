import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IStatistic } from "../../models/user";
import { UserService } from "../../service/UserService";
import { errorHandler } from "../../utils";
import { Loader } from "../misc/Loader";

export const Statistic = () => {
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<IStatistic[]>([]);

  const fetchStatistics = async () => {
    try {
      setShowStats(true);
      setLoading(true);
      const res = await UserService.getStatistics();
      setStats(res.data);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1">Statistics</Typography>
        {!showStats && (
          <Button variant="outlined" onClick={fetchStatistics}>
            Get
          </Button>
        )}
      </Stack>

      <StatisticsTable loading={loading} stats={stats} />
    </>
  );
};

interface StatTableProps {
  loading: boolean;
  stats: IStatistic[];
}
const StatisticsTable: React.FC<StatTableProps> = ({ loading, stats }) => {
  if (loading) return <Loader />;
  if (!stats.length) return null;
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Today</TableCell>
            <TableCell align="right">Average</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat) => {
            return (
              <TableRow key={stat.moduleName}>
                <TableCell component="th" scope="row">
                  <Typography variant="h6">{stat.moduleName}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{stat.stats.today}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{stat.stats.average}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{stat.stats.total}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
