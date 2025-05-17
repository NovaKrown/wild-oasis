import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1 Load the authenticated user

  const { isPending, isAuthenticated, isFetching } = useUser();

  // 2 If there is no auth user redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isPending && !isFetching) navigate("/login");
  }, [isAuthenticated, isPending, isFetching, navigate]);

  // 3 Show a spinner
  if (isPending)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4 If there is an auth user render the app

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
