import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MainContainer } from "../components/misc/MainContainer";
import { RoutesEnum } from "../routes";

export const SingInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
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
          <div>
            <button type="submit">Sign In</button>
          </div>
        </form>
        <div>
          <Link to={RoutesEnum.SINGUP}>
            <p>Don't have an account? Sign up</p>
          </Link>
        </div>
      </MainContainer>
    </>
  );
};
