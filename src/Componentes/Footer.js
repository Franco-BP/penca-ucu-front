import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button, Grid, Link, useMediaQuery, useTheme } from "@mui/material";
import LogoPenca from '../assets/PencaUCU.png';
import { styled } from '@mui/system';

const buttonStyle = { color: 'white', fontSize: '1.2rem' }; // Reduced font size for icons
const paraffoStyle = { color: 'white', fontSize: '0.6rem', fontFamily: 'revert', marginBottom: '4px' }; // Adjusted margin

const LogoImage = styled('img')({
    height: '5rem', // Reduced height
    width: '7rem', // Reduced width
});

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container justifyContent="space-between" alignItems="center" spacing={1} sx={{ backgroundColor: '#1C285E', padding: '10px 20px' }}>
            <Grid item>
                <Button style={paraffoStyle}>
                    <h5 style={{ margin: 0 }}>Politica de privacidad</h5>
                </Button>
                <Button style={paraffoStyle}>
                    <h5 style={{ margin: 0 }}>Ayuda</h5>
                </Button>
            </Grid>
            <Grid item>
                <p style={{ color: 'white', fontSize: '0.8rem', fontFamily: 'monospace', margin: 0 }}>
                    PencaUCU
                </p>
            </Grid>
            {!isMobile && (
                <Grid item>
                    <Grid container justifyContent="center" alignItems="center" spacing={1}>
                        <Button component="a" href="/">
                            <LogoImage src={LogoPenca} alt="logo" />
                        </Button>
                    </Grid>
                </Grid>
            )}
            {!isMobile && (
                <Grid item>
                    <p style={{ color: 'white', fontSize: '0.8rem', fontFamily: 'monospace', margin: 0 }}>
                        PencaUCU
                    </p>
                </Grid>
            )}
            <Grid item>
                <Grid container justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item>
                        <Button style={buttonStyle} component={Link} href='https://www.instagram.com' target='_blank'>
                            <InstagramIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button style={buttonStyle} component={Link} href='https://api.whatsapp.com/send?phone=59898590526&text=%F0%9F%90%93%F0%9F%90%93' target='_blank'>
                            <WhatsAppIcon />
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button style={buttonStyle} component={Link} href='https://www.facebook.com' target='_blank'>
                            <FacebookIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Footer;
