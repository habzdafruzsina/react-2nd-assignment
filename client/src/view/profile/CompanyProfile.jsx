import { Box, Button, Typography } from "@mui/material";
import JobAdListElem from "../jobAds/JobAdListElem";
import { useAllJobsQuery } from "../../state/jobAds/JobAdsApiSlice";
import { useNavigate } from "react-router-dom";
import { useDeleteJobMutation } from "../../state/jobAds/JobAdsApiSlice";
import JobDetails from "../jobAds/JobDetails";
import ModifyJobAd from "../jobAds/ModifyJobAd";
import { useState } from "react";

function CompanyProfile({ userId }) {
  const [jobDetailsJobAd, setJobDetails] = useState(null);
  const [modifyJobAd, setModifyJobAd] = useState(null);

  const { data: jobAds, refetch } = useAllJobsQuery();
  const navigate = useNavigate();
  const [deleteJob] = useDeleteJobMutation();

  const deleteJobAd = async (jobId) => {
    try {
      await deleteJob(jobId).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToAddJobAd = () => {
    navigate("/addJobAd", { replace: true });
  };

  const openDetails = (jobAd) => {
    setJobDetails(jobAd);
  };

  const closeDetails = () => {
    setJobDetails(null);
  };

  const openModification = (jobAd) => {
    setModifyJobAd(jobAd);
  };

  const closeModification = () => {
    setModifyJobAd(null);
    refetch();
  };

  return (
    <>
      {modifyJobAd ? (
        <ModifyJobAd
          jobAd={modifyJobAd}
          closeModification={closeModification}
        />
      ) : jobDetailsJobAd ? (
        <JobDetails
          jobAd={jobDetailsJobAd}
          isCompany={true}
          closeDetails={closeDetails}
        />
      ) : (
        <Box py={4} px={2}>
          <Typography variant="h5" component="h5">
            A te hirdetéseid:
          </Typography>

          {jobAds
            ? jobAds
                .filter((jobAd) => jobAd.userId == userId)
                .map((jobAd) => (
                  <JobAdListElem
                    jobAd={jobAd}
                    key={jobAd.id}
                    isCompany={true}
                    deleteJobAd={deleteJobAd}
                    openDetails={openDetails}
                    openModification={openModification}
                  />
                ))
            : null}
          <Box p={2}>
            <Button onClick={navigateToAddJobAd} variant="outlined">
              Új hirdetés hozzáadása
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default CompanyProfile;
