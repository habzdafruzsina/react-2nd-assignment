import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../state/auth/AuthSlice";
import JobseekerProfile from "./JobseekerProfile";
import CompanyProfile from "./CompanyProfile";
import { Typography } from "@mui/material";

function Profile() {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <Typography variant="h2" component="h2">
        Profilom
      </Typography>
      {user.role == "company" ? (
        <CompanyProfile userId={user.id}></CompanyProfile>
      ) : (
        <JobseekerProfile user={user}></JobseekerProfile>
      )}
    </>
  );
}

export default Profile;
