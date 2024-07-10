import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useExpsQuery } from "../../state/experience/ExperienceApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function JobseekerProfile({ user }) {
  const { data: userExperiences, refetch } = useExpsQuery();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location]);

  function goToModifyExps() {
    navigate("/modify_exps", { replace: true });
  }

  return (
    <Box p={2}>
      <Typography variant="h5" component="h5">
        Személyes adatok
      </Typography>

      <TableContainer component={Paper} sx={{ marginY: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow
              key="name"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>Név</TableCell>
              <TableCell align="right">{user.fullname}</TableCell>
            </TableRow>
            <TableRow
              key="email"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>E-mail</TableCell>
              <TableCell align="right">{user.email}</TableCell>
            </TableRow>
            <TableRow
              key="role"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>Státusz</TableCell>
              <TableCell align="right">{user.role}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={goToModifyExps} variant="outlined" sx={{ margin: 2 }}>
        Tapasztalatok szerkesztése
      </Button>
      <TableContainer component={Paper}>
        <Box p={1}>
          <Typography variant="h6" component="h6">
            Előzetes Tapasztalatok
          </Typography>
        </Box>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {userExperiences
              ? userExperiences.map((exp) => (
                  <TableRow
                    key={exp.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {exp.company}
                    </TableCell>
                    <TableCell align="right">{exp.interval}</TableCell>
                    <TableCell align="right">{exp.title}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default JobseekerProfile;
