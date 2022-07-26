import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MainContainer } from "../components/misc/MainContainer";
import { RoutesEnum } from "../routes";

export const SingUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <>
      <MainContainer>
        <div>Sign up</div>
        <form onSubmit={submitHandler}>
          <div>
            <input
              required
              type="name"
              placeholder="Name..."
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div>
          <Link to={RoutesEnum.SINGIN}>
            <p>Already have an account? Sign in</p>
          </Link>
        </div>
      </MainContainer>
    </>
  );
};
