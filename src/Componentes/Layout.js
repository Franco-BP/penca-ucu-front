import { Box, Container, Grid, Typography } from "@mui/material";
import Footer from "./Footer";
import TopBar from "./TopBar";
import Rules from "./Rules";

function Layout() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box>
                <TopBar />
            </Box>
            <Grid item xs={12} sm={12} md={12}>
                <Typography variant="h4" component="h2" sx={{ textAlign: 'left', marginBottom:'0.5rem',marginTop:'3rem',marginLeft:'5rem', color:'#1C285E',fontFamily: 'revert',}}>
                    Reglas de Juego
                </Typography>
            </Grid>
            <Box sx={{ flex: 1, marginTop: '1.5rem' }}>
                <Rules />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default Layout;
