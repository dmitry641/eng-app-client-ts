import React from "react";
import { Account } from "../components/account/Account";
import { Header } from "../components/misc/Header";
import { MainContainer } from "../components/misc/MainContainer";
import { RoutesEnum } from "../routes";
import { HeaderTitleEnum } from "../utils";

export const AccountPage: React.FC = () => {
  return (
    <>
      <Header backRoute={RoutesEnum.HOME} title={HeaderTitleEnum.account} />
      <MainContainer>
        <Account />
      </MainContainer>
    </>
  );
};
