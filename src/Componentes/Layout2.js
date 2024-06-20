import { Box, Container, Grid, Typography } from "@mui/material";
import Footer from "./Footer";
import TopBar from "./TopBar";
import Contenido from "./Contenido"
import Login from "./Login";
import Register from "./Register";
import MatchCarousel from "./MatchCarousel";


function Layout2() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box>
                <TopBar />
            </Box>
            <Box sx={{ flex: 1, marginTop: '1.5rem' }}>
                <Register />
            </Box>
            <Box>
                <MatchCarousel />
            </Box>
            <Box>
                <Footer />
            </Box>

        </Box >
    );
}

export default Layout2;
