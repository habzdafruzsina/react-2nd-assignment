import { useSelector } from "react-redux";
import { selectCurrentUser, selectToken } from "../../state/auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AuthStatus = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      navigate("/login", { replace: true });
    }
  }, [user, token]);

  return null;
};
