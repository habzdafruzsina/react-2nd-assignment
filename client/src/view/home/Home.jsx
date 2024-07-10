import {
  Typography,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useJobsFilteredQuery } from "../../state/jobAds/JobAdsApiSlice";
import JobAdListElem from "../jobAds/JobAdListElem";
import JobDetails from "../jobAds/JobDetails";
import { useState, useRef } from "react";

function Home() {
  const [jobDetailsJobAd, setJobDetails] = useState(null);
  const [filters, setFilters] = useState(null);
  const { data: jobAds } = useJobsFilteredQuery(filters);

  //const roleRef = useRef(null);
  const salaryMinRef = useRef(null);
  const salaryMaxRef = useRef(null);
  const typeRef = useRef(null);
  const cityRef = useRef(null);
  const homeOfficeRef = useRef(null);

  const openDetails = (jobAd) => {
    setJobDetails(jobAd);
  };

  const closeDetails = () => {
    setJobDetails(null);
  };

  const searchJobAds = async () => {
    const salaryFrom = salaryMinRef.current.value;
    const salaryTo = salaryMaxRef.current.value;
    const type = typeRef.current.value;
    const city = cityRef.current.value;
    const homeOffice = homeOfficeRef.current.checked;

    let filterObj = {};

    if (salaryFrom != "") filterObj["salaryFrom[$gt]"] = parseInt(salaryFrom);
    if (salaryTo != "") filterObj["salaryTo[$lt]"] = parseInt(salaryTo);
    if (type != "") filterObj["type"] = type;
    if (city != "") filterObj["city"] = city;
    if (homeOffice) filterObj.homeOffice = homeOffice;

    setFilters(filterObj);
  };

  return (
    <>
      {jobDetailsJobAd ? (
        <JobDetails
          jobAd={jobDetailsJobAd}
          isCompany={false}
          closeDetails={closeDetails}
        />
      ) : (
        <>
          <Typography variant="h2" component="h2">
            Főoldal
          </Typography>
          <Box>
            <Accordion sx={{margin: 4}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography variant="h5" component="h5">Szűrők</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box px={4}>
                <form>
                  <TextField
                    inputRef={salaryMinRef}
                    type="number"
                    id="salaryMin"
                    name="salaryMin"
                    label="Fizetési sáv alja"
                    variant="standard"
                  />
                  <TextField
                    inputRef={salaryMaxRef}
                    type="number"
                    id="salaryMax"
                    name="salaryMax"
                    label="Fizetési sáv teteje"
                    variant="standard"
                  />
                  <br />
                  <InputLabel id="type-select" sx={{ marginTop: 2 }}>
                    Foglalkoztatás típusa
                  </InputLabel>
                  <Select
                    id="type-select"
                    inputRef={typeRef}
                    defaultValue=""
                    label="Foglalkoztatás típusa"
                  >
                    <MenuItem value="">-</MenuItem>
                    <MenuItem value="full-time">Teljes állás</MenuItem>
                    <MenuItem value="part-time">Részmunkaidős</MenuItem>
                    <MenuItem value="internship">Gyakornoki</MenuItem>
                  </Select>
                  <br />
                  <TextField
                    inputRef={cityRef}
                    type="text"
                    id="city"
                    name="city"
                    label="Település"
                    variant="standard"
                  />
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        inputRef={homeOfficeRef}
                        defaultChecked={false}
                      />
                    }
                    label="Home Office lehetőség"
                    sx={{ marginTop: 2 }}
                  />
                </form>
                </Box>
              </AccordionDetails>
              <AccordionActions>
                <Button variant="outlined" onClick={searchJobAds}>
                  Keresés
                </Button>
              </AccordionActions>
            </Accordion>

            {jobAds
              ? jobAds.map((jobAd) => (
                  <JobAdListElem
                    jobAd={jobAd}
                    key={jobAd.id}
                    isCompany={false}
                    openDetails={openDetails}
                  />
                ))
              : null}
          </Box>
        </>
      )}
    </>
  );
}

export default Home;
