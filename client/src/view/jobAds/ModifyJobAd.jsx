import {
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  InputLabel
} from "@mui/material";
import { useRef } from "react";
import { useModifyJobMutation } from "../../state/jobAds/JobAdsApiSlice";
import FormLayout from "../auth/FormLayout";

function ModifyJobAd({ jobAd, closeModification }) {
  const [modifyJobAd] = useModifyJobMutation();

  const companyNameRef = useRef(null);
  const roleRef = useRef(null);
  const descriptionRef = useRef(null);
  const salaryFromRef = useRef(null);
  const salaryToRef = useRef(null);
  const typeRef = useRef(null);
  const cityRef = useRef(null);
  const homeOfficeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyName = companyNameRef.current.value;
    const role = roleRef.current.value;
    const description = descriptionRef.current.value;
    const salaryFrom = salaryFromRef.current.value;
    const salaryTo = salaryToRef.current.value;
    const type = typeRef.current.value;
    const city = cityRef.current.value;
    const homeOffice = homeOfficeRef.current.checked;

    try {
      await modifyJobAd({
        id: jobAd.id,
        body: {
          company: companyName,
          position: role,
          description: description,
          salaryFrom: parseInt(salaryFrom),
          salaryTo: parseInt(salaryTo),
          type: type,
          city: city,
          homeOffice: homeOffice == "on" ? true : false,
        },
      }).unwrap();
      closeModification();
    } catch (error) {
      console.log(error);
    }
  };

  const isHomeOffice = () => {
    return jobAd.homeOffice == "true" || jobAd.homeOffice == 1 ? true : false;
  };

  return (
    <>
      <Typography variant="h3" component="h3">
        Álláshirdetés megváltoztatása
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
              defaultValue={jobAd.company}
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
              defaultValue={jobAd.position}
            />
            <br />
            <TextField
              inputRef={descriptionRef}
              id="description"
              name="description"
              label="Leírás"
              multiline
              minRows={4}
              defaultValue={jobAd.description}
              sx={{ width: 400, marginTop: 3 }}
            />
            <br />

            <TextField
              inputRef={salaryFromRef}
              type="number"
              id="salaryFrom"
              name="salaryFrom"
              label="Bérsáv (-tól)"
              variant="standard"
              defaultValue={jobAd.salaryFrom}
              sx={{ marginTop: 2 }}
            />
            <TextField
              inputRef={salaryToRef}
              type="number"
              id="salaryTo"
              name="salaryTo"
              label="Bérsáv (-ig)"
              variant="standard"
              defaultValue={jobAd.salaryTo}
              sx={{ marginTop: 2 }}
            />

            <br />
            <InputLabel id="type-select" sx={{ marginTop: 2 }}>
              Foglalkoztatás típusa
            </InputLabel>

            <Select
              id="type-select"
              inputRef={typeRef}
              defaultValue={jobAd.type}
              label="Típus"
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
              defaultValue={jobAd.city}
              sx={{ marginTop: 2 }}
            />
            <br />

            <FormControlLabel
              sx={{ marginTop: 2 }}
              control={
                <Switch
                  inputRef={homeOfficeRef}
                  defaultChecked={isHomeOffice()}
                />
              }
              label="Távmunka"
            />
            <br />

            <Box mx={2} mb={3} mt={5}>
              <Button variant="outlined" type="submit">
                Módosítás
              </Button>
            </Box>
          </form>
        </FormLayout>
      </Box>
    </>
  );
}

export default ModifyJobAd;
