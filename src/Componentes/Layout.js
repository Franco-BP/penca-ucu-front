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
            <Box>
                <Footer />
            </Box>
        </Box>
    );
}

export default Layout;
