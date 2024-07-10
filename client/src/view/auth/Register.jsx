import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import { useRef, useState } from "react";
import { useRegisterMutation } from "../../state/auth/AuthApiSlice";
import { useAddExpsMutation } from "../../state/experience/ExperienceApiSlice";
import { useLoginMutation } from "../../state/auth/AuthApiSlice";
import { useDispatch } from "react-redux";
import { login } from "../../state/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { getExpsObj } from "../../utils/ExpsUtil";
import FormLayout from "./FormLayout";

function Register() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const fullnameRef = useRef(null);
  const [role, setRole] = useState("jobseeker");
  const expsRef = useRef(null);

  const [errors, setErrors] = useState({});

  const [authLogin] = useLoginMutation();
  const [authRegister] = useRegisterMutation();
  const [addExps] = useAddExpsMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const newErrors = {};

    if (fullname === "") {
      newErrors.fullname = "Név megadása kötelező";
    }
    if (email === "") {
      newErrors.email = "Email megadása kötelező";
    }
    if (password === "") {
      newErrors.password = "Jelszó megadása kötelező";
    }

    setErrors(newErrors);
    if (Object.values(newErrors).length > 0) {
      return;
    }

    try {
      await authRegister({
        fullname: fullname,
        email: email,
        password: password,
        role: role,
      }).unwrap();

      try {
        const loginRes = await authLogin({
          strategy: "local",
          email: email,
          password: password,
        }).unwrap();

        if (loginRes) {
          dispatch(login(loginRes));
        }

        if (role == "jobseeker" && expsRef.current.value) {
          const expsTxt = expsRef.current.value;
          await addExps(getExpsObj(expsTxt)).unwrap();
        }

        navigate("/", { replace: true });
      } catch (error) {
        newErrors.email = "Hiba lépett fel a bejelentkezés során";
        setErrors(newErrors);
      }
    } catch (error) {
      console.log(error);
      newErrors.email = "Hiba lépett fel a regisztráció során";
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        Regisztráció
      </Typography>
      <FormLayout>
        <form onSubmit={handleSubmit}>
          <TextField
            inputRef={fullnameRef}
            type="text"
            id="fullname"
            name="fullname"
            label="Név"
            variant="standard"
            autoFocus
            error={errors.fullname !== undefined}
            helperText={errors.fullname}
          />
          <br />
          <TextField
            inputRef={emailRef}
            type="text"
            id="email"
            name="email"
            label="E-mail"
            variant="standard"
            error={errors.email !== undefined}
            helperText={errors.email}
          />
          <br />
          <TextField
            inputRef={passwordRef}
            type="password"
            id="password"
            name="password"
            label="Jelszó"
            variant="standard"
            error={errors.password !== undefined}
            helperText={errors.password}
          />
          <br />

          <RadioGroup
            value={role}
            name="role-group"
            onChange={handleRoleChange}
          >
            <FormControlLabel
              value="jobseeker"
              control={<Radio />}
              label="Munkavállaló"
            />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Munkáltató"
            />
          </RadioGroup>

          {role == "jobseeker" ? (
            <TextField
              inputRef={expsRef}
              id="experiences_textarea"
              label="Tapasztalataim"
              placeholder="Halo Haven;Front-end fejlesztő;2021-2022"
              multiline
              minRows={4}
            />
          ) : null}

          <br />
          <Box sx={{ padding: 2 }}>
            <Button variant="outlined" type="submit">
              Regisztráció
            </Button>
          </Box>
        </form>
      </FormLayout>
    </>
  );
}

export default Register;
