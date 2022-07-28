import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MainContainer } from "../components/misc/MainContainer";
import { useActions } from "../hooks/useActions";
import { useAppSelector } from "../hooks/useAppSelector";
import { RoutesEnum } from "../routes";

export const SignInPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const { userSignIn } = useActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userSignIn({ email, password });
  };

  return (
    <>
      <MainContainer>
        <div>Sign in</div>
        <form onSubmit={submitHandler}>
          <div>
            <input
              required
              type="email"
              placeholder="Email..."
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              required
              type="password"
              placeholder="Password..."
              name="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {user.error && <div>Error: {user.error}</div>}
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
        <div>
          <Link to={RoutesEnum.SIGNUP}>
            <p>Don't have an account? Sign up</p>
          </Link>
        </div>
      </MainContainer>
    </>
  );
};
