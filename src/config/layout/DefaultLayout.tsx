import { Grid } from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => (
    <Grid item xs={12}>
        {children}
    </Grid>
);

export default DefaultLayout;
