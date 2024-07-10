import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";

function JobAdListElem({
  jobAd,
  isCompany,
  deleteJobAd,
  openDetails,
  openModification,
}) {
  return (
    <Card
      sx={{ minWidth: 275 }}
      onClick={() => (!isCompany ? openDetails(jobAd) : null)}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {jobAd.position}
        </Typography>
        <Box pt={2} px={2}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {jobAd.type}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {jobAd.homeOffice ? "Remote" : jobAd.city}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {jobAd.salaryFrom} - {jobAd.salaryTo}
          </Typography>
        </Box>
      </CardContent>
      {isCompany ? (
        <CardActions>
          <Button size="small" onClick={() => openModification(jobAd)}>
            Szerkesztés
          </Button>
          <Button size="small" onClick={() => openDetails(jobAd)}>
            Megtekintés
          </Button>
          <Button size="small" onClick={() => deleteJobAd(jobAd.id)}>
            Törlés
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}

export default JobAdListElem;
