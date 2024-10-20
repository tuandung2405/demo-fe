import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { authService } from "@/services/authService";

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [userFullname, setUserFullname] = useState<string>(""); // Explicitly set as string
  const router = useRouter();

  useEffect(() => {
    const fetchUserFullname = () => {
      const fullname = localStorage.getItem("userFullname"); // Retrieve fullname from localStorage
      if (fullname) {
        setUserFullname(fullname); // Now TypeScript understands fullname is a string
      }
    };

    fetchUserFullname();
  }, []);

  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("userFullname"); // Optionally clear fullname on logout
    router.push("/authentication/login");
  };

  return (
      <Box textAlign="center">
        <IconButton
            size="large"
            aria-label="show 11 new notifications"
            color="inherit"
            aria-controls="msgs-menu"
            aria-haspopup="true"
            sx={{
              ...(typeof anchorEl2 === "object" && {
                color: "primary.main",
              }),
            }}
            onClick={handleClick2}
        >
          <Avatar
              src="/images/profile/user-1.jpg"
              alt="image"
              sx={{
                width: 35,
                height: 35,
              }}
          />
        </IconButton>

        {/* Display userFullname below Avatar */}
        <Typography variant="subtitle2" mt={1}>
          {userFullname || "Loading..."} {/* Show loading text while fetching */}
        </Typography>

        <Menu
            id="msgs-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            sx={{
              "& .MuiMenu-paper": {
                width: "200px",
              },
            }}
        >
          <MenuItem>
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <IconMail width={20} />
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <IconListCheck width={20} />
            </ListItemIcon>
            <ListItemText>My Tasks</ListItemText>
          </MenuItem>
          <Box mt={1} py={1} px={2}>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Menu>
      </Box>
  );
};

export default Profile;
