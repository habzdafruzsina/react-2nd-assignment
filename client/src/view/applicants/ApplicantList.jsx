import { useApplicantsPerJobQuery } from "../../state/jobAds/ApplicantsApiSlice";
import { Typography, Box } from "@mui/material";

function ApplicantList({ jobId }) {
  console.log(jobId);
  const {
    data: applicants,
    error,
    currentData,
  } = useApplicantsPerJobQuery({
    jobId: parseInt(jobId),
  });
  console.log(applicants);
  console.log(error);
  console.log(currentData);
  console.log("nem tudom miért nem kéri le...");

  return (
    <Box m={4}>
      <Typography variant="h4" component="h4">
        Jelentkezők az állásra
      </Typography>
      {applicants ? (
        applicants.map((applicant) => <></>)
      ) : (
        <>Még nincs jelentkező</>
      )}
    </Box>
  );
}

export default ApplicantList;
