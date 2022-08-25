import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, {
  FormEvent,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../components/misc/MainContainer";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelector";
import { RoutesEnum } from "../routes";

export const SignUpPage: React.FC = () => {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const user = useAppSelector((state) => state.user);
  const { userSignUp, userSetError } = useActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const reRef = useRef<ReCAPTCHA>();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.error) reRef?.current?.reset();
  }, [user.error]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reToken = reRef?.current?.getValue();
    if (!reToken) {
      userSetError("ReCaptcha is required");
      return;
    }
    userSignUp({ name, email, password, reToken, darkMode });
  };

  return (
    <MainContainer maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h5">Sign up</Typography>

        <Box mt={2} component="form" onSubmit={submitHandler}>
          <Stack spacing={2}>
            <TextField
              disabled={user.btnLoading}
              variant="outlined"
              required
              fullWidth
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              disabled={user.btnLoading}
              variant="outlined"
              required
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              disabled={user.btnLoading}
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <ReCAPTCHA
              theme={darkMode ? "dark" : "light"}
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
              ref={reRef as LegacyRef<ReCAPTCHA>}
            />

            {user.error && (
              <Typography color="error" variant="h6">
                {user.error}
              </Typography>
            )}

            <Button
              disabled={user.btnLoading}
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>
          </Stack>
        </Box>

        <Box mt={2} textAlign="right">
          <Link
            color="inherit"
            variant="body1"
            component="button"
            underline="hover"
            onClick={() => navigate(RoutesEnum.SIGNIN)}
          >
            Already have an account? Sign in
          </Link>
        </Box>
      </Box>
    </MainContainer>
  );
};
