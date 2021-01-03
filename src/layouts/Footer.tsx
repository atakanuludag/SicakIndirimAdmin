import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Footer = (): React.ReactElement => {

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.atakanuludag.com">
                Sıcak İndirimler Uygulaması
</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export default Footer;