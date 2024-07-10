import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  AppBar,
  Container,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import { useDispatch } from "react-redux";
import { logout } from "../../state/auth/AuthSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../state/auth/AuthSlice";

function Menu() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  return (
    <nav>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BadgeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 4 }} />

            <React.Fragment key="home">
              <Button>
                <NavLink exact="true" to="/" className="item">
                  <Typography sx={{ my: 2, color: "white" }}>
                    Álláshirdetések
                  </Typography>
                </NavLink>
              </Button>
            </React.Fragment>

            {user ? (
              <>
                <React.Fragment key="profile">
                  <Button>
                    <NavLink exact="true" to="/profile" className="item">
                      <Typography sx={{ my: 2, color: "white" }}>
                        Profilom
                      </Typography>
                    </NavLink>
                  </Button>
                </React.Fragment>

                {user.role == "company" ? (
                  <React.Fragment key="addJob">
                    <Button>
                      <NavLink exact="true" to="/addJobAd" className="item">
                        <Typography sx={{ my: 2, color: "white" }}>
                          Álláshirdetés hozzáadása
                        </Typography>
                      </NavLink>
                    </Button>
                  </React.Fragment>
                ) : null}

                <React.Fragment key="logout">
                  <NavLink exact="true" to="/" className="item">
                    <IconButton
                      size="large"
                      edge="end"
                      aria-haspopup="true"
                      onClick={() => dispatch(logout())}
                      color="white"
                    >
                      <LogoutIcon />
                    </IconButton>
                  </NavLink>
                </React.Fragment>
              </>
            ) : (
              <>
                <React.Fragment key="login">
                  <Button>
                    <NavLink exact="true" to="/login" className="item">
                      <Typography sx={{ my: 2, color: "white" }}>
                        Bejelentkezés
                      </Typography>
                    </NavLink>
                  </Button>
                </React.Fragment>
                <React.Fragment key="register">
                  <Button>
                    <NavLink exact="true" to="/register" className="item">
                      <Typography sx={{ my: 2, color: "white" }}>
                        Regisztráció
                      </Typography>
                    </NavLink>
                  </Button>
                </React.Fragment>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </nav>
  );
}

export default Menu;
