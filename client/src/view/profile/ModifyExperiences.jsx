import { Button, Typography, TextField, Box } from "@mui/material";
import {
  useDeleteExpsMutation,
  useAddExpsMutation,
  useExpsQuery,
} from "../../state/experience/ExperienceApiSlice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getExpsTxt, getExpsObj } from "../../utils/ExpsUtil";

function ModifyExperiences() {
  const { data: userExperiences, isSuccess } = useExpsQuery();
  const [addExps] = useAddExpsMutation();
  const [deleteExps] = useDeleteExpsMutation();
  const navigate = useNavigate();
  const expsRef = useRef(null);
  let defaultExpsTxt = getExpsTxt(userExperiences);

  const saveModifications = async () => {
    try {
      await deleteExps().unwrap();
    } catch (error) {
      console.log(error);
    }

    try {
      const expsObj = getExpsObj(expsRef.current.value);
      if (expsObj.length > 0 && expsObj[expsObj.length - 1].company == "") {
        expsObj.pop();
      }
      await addExps(expsObj).unwrap();
    } catch (error) {
      console.log(error);
    }

    navigate("/profile", { replace: true });
  };

  return (
    <>
      <Typography variant="h3" component="h3">
        Tapasztalataim szerkesztése
      </Typography>

      <Box p={4}>
        <TextField
          inputRef={expsRef}
          defaultValue={defaultExpsTxt ? defaultExpsTxt : ""}
          id="experiences_textarea"
          label="Tapasztalataim"
          placeholder="Halo Haven;Front-end fejlesztő;2021-2022"
          multiline
          minRows={4}
        />

        <br />
        <Button
          onClick={saveModifications}
          variant="outlined"
          sx={{ margin: 2 }}
        >
          Mentés
        </Button>
      </Box>
    </>
  );
}

export default ModifyExperiences;
