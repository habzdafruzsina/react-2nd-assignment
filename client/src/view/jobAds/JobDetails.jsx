import {
  Table,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../state/auth/AuthSlice";
import { useApplyForJobMutation } from "../../state/jobAds/ApplicantsApiSlice";
import ApplicantList from "../applicants/ApplicantList";

function JobDetails({ jobAd, isCompany, closeDetails }) {
  const user = useSelector(selectCurrentUser);
  const [applyForJob, isSuccess] = useApplyForJobMutation();

  const salary = () => "Bruttó " + jobAd.salaryFrom + "-" + jobAd.salaryTo;

  const apply = async () => {
    try {
      await applyForJob({ jobId: parseInt(jobAd.id) }).unwrap();
      if (isSuccess) {
        alert(`A jelentkezés sikeresen megtörtént`);
      } else {
        alert(`A jelentkezés leadása közben hiba lépett fel`);
      }
    } catch (error) {
      console.log(error);
      alert(`A jelentkezés leadása közben hiba lépett fel`);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h4" sx={{ margin: 2 }}>
        <Button onClick={closeDetails} startIcon={<ArrowBackIosIcon />} />
        Álláshirdetés részletek
      </Typography>

      <Box px={5}>
        {user != null && user.role != "company" ? (
          <Box p={3}>
            <Button onClick={apply} variant="outlined">
              Jelentkezz
            </Button>
          </Box>
        ) : null}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                key="name"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Név</TableCell>
                <TableCell align="right">{jobAd.company}</TableCell>
              </TableRow>
              <TableRow
                key="position"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Pozíció</TableCell>
                <TableCell align="right">{jobAd.position}</TableCell>
              </TableRow>
              <TableRow
                key="description"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Leírás</TableCell>
                <TableCell align="right">{jobAd.description}</TableCell>
              </TableRow>
              <TableRow
                key="salary"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Fizetési sáv</TableCell>
                <TableCell align="right">{salary()}</TableCell>
              </TableRow>
              <TableRow
                key="role"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Foglalkoztatás típusa</TableCell>
                <TableCell align="right">{jobAd.type}</TableCell>
              </TableRow>
              <TableRow
                key="city"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Település</TableCell>
                <TableCell align="right">{jobAd.city}</TableCell>
              </TableRow>
              <TableRow
                key="homeoffice"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>Home Office</TableCell>
                <TableCell align="right">
                  {jobAd.homeOffice ? "Van" : "Nincs"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {isCompany ? <ApplicantList jobId={jobAd.id} /> : null}
      </Box>
    </>
  );
}

export default JobDetails;
