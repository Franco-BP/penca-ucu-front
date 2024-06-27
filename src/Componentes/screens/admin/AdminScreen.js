import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import { Box, Grid, Typography } from "@mui/material";
import { PencaUCUContext } from "../../../context/context";
import TeamCRUD from "./TeamCRUD";
import MatchCRUD from "./MatchCRUD";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminScreen = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const { data, dispatch } = useContext(PencaUCUContext);
  const usuario = data.usuarioData;
  const subtitles = {
    textAlign: "left",
    marginTop: "3rem",
    marginLeft: "5rem",
    color: "#1C285E",
    fontFamily: "revert",
  };

  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   postWithResponseManage('/usuario/login', loginDetails)
  //     .then((response) => {
  //       dispatch(accionAddUser(response))
  //       if (response.idUsuario) {
  //         navigate('/home');
  //       }
  //     })
  // };

  useEffect(() => {
    //
    // Commented for testing reasons
    //
    // if (usuario.esAdministrador != true) {
    //   navigate('/home')
    // }
  }, []);

  return (
    <Layout>
      <Grid item xs={12} sm={12} md={12}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: "left",
            marginBottom: "2rem",
            marginTop: "3rem",
            marginLeft: "5rem",
            color: "#1C285E",
            fontFamily: "revert",
          }}
        >
          Administrar datos
        </Typography>
      </Grid>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs"
          >
            <Tab label="Administrar Equipos" {...a11yProps(0)} />
            <Tab label="Administrar Torneos" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tabValue} index={0}>
          <TeamCRUD />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <MatchCRUD />
        </CustomTabPanel>
      </Box>
    </Layout>
  );
};

export default AdminScreen;
