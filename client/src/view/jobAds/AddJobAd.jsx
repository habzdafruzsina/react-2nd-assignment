import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Slider,
  InputLabel,
} from "@mui/material";
import { useRef, useState } from "react";
import { useCreateJobMutation } from "../../state/jobAds/JobAdsApiSlice";
import FormLayout from "../auth/FormLayout";

function AddJobAd() {
  const [createJob, isSuccess] = useCreateJobMutation();

  const companyNameRef = useRef(null);
  const roleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [salary, setSalary] = useState([300000, 400000]);
  const typeRef = useRef(null);
  const cityRef = useRef(null);
  const homeOfficeRef = useRef(null);

  const handleSliderChange = (e) => {
    setSalary(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyName = companyNameRef.current.value;
    const role = roleRef.current.value;
    const description = descriptionRef.current.value;
    const type = typeRef.current.value;
    const city = cityRef.current.value;
    const homeOffice = homeOfficeRef.current.value;

    try {
      await createJob({
        company: companyName,
        position: role,
        description: description,
        salaryFrom: salary[0],
        salaryTo: salary[1],
        type: type,
        city: city,
        homeOffice: homeOffice == "on" ? true : false,
      }).unwrap();
      if (isSuccess) {
        alert(`Új hirdetés létrehozva`);
      } else {
        alert(`Hiba lépett fel a hirdetés létrehozásakor`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        Új hirdetés hozzáadása
      </Typography>
      <Box p={2}>
        <FormLayout width={450}>
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={companyNameRef}
              type="text"
              id="companyName"
              name="companyName"
              label="Cég neve"
              variant="standard"
              autoFocus
            />
            <br />
            <TextField
              inputRef={roleRef}
              type="text"
              id="role"
              name="role"
              label="Pozíció neve"
              variant="standard"
            />
            <br />
            <TextField
              inputRef={descriptionRef}
              id="description"
              name="description"
              label="Leírás"
              multiline
              minRows={4}
              sx={{ width: 400, marginTop: 3 }}
            />
            <br />

            <Typography id="input-salary" gutterBottom sx={{ marginTop: 2 }}>
              Fizetési sáv
            </Typography>
            <Slider
              value={salary}
              valueLabelDisplay="auto"
              onChange={handleSliderChange}
              min={0}
              max={2000000}
              step={10000}
              aria-labelledby="salary-slider"
            />

            <br />

            <InputLabel id="type-select" sx={{ marginTop: 2 }}>
              Foglalkoztatás típusa
            </InputLabel>

            <Select
              id="type-select"
              inputRef={typeRef}
              defaultValue="full-time"
              label="Foglalkozatás típus"
            >
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
              sx={{ marginTop: 2 }}
            />
            <br />

            <FormControlLabel
              sx={{ marginTop: 2 }}
              control={<Switch inputRef={homeOfficeRef} />}
              label="Távmunka"
            />
            <br />

            <Box mx={2} mb={3} mt={5}>
              <Button variant="outlined" type="submit">
                Hozzáadás
              </Button>
            </Box>
          </form>
        </FormLayout>
      </Box>
    </>
  );
}

export default AddJobAd;
