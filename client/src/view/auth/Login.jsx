import { TextField, Button, Typography, Box } from "@mui/material";
import { useRef, useState } from "react";
import { useLoginMutation } from "../../state/auth/AuthApiSlice";
import { useDispatch } from "react-redux";
import { login } from "../../state/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import FormLayout from "./FormLayout";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [errors, setErrors] = useState({});

  const [authLogin] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const newErrors = {};

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
      const result = await authLogin({
        strategy: "local",
        email: email,
        password: password,
      }).unwrap();
      dispatch(login(result));
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      newErrors.email = "Hiba lépett fel a bejelentkezés során";
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2">
        Bejelentkezés
      </Typography>
        <FormLayout>
          <form onSubmit={handleSubmit}>
            <TextField
              inputRef={emailRef}
              type="text"
              id="email"
              name="email"
              label="E-mail"
              variant="standard"
              autoFocus
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

            <Box sx={{ padding: 2 }}>
              <Button variant="outlined" type="submit">
                Bejelentkezés
              </Button>
            </Box>
          </form>
          </FormLayout>
    </>
  );
}

export default Login;
