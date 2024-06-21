import { Box } from "@mui/material";
import Footer from "./Footer";
import TopBar from "./TopBar";

function Layout({children}) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box>
                <TopBar />
            </Box>
            {children}
            <Box sx={{marginTop:'2rem'}}>
                <Footer />
            </Box>
        </Box>
    );
}

export default Layout;
