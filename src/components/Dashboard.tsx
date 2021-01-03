import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';

const Dashboard: React.FC = () => {

  const useStyles = makeStyles({
    root: {
      //minWidth: 275,
    }
  });

  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>

      <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Bugün ki Tekil Ziyaretçi
              </Typography>
              <Typography variant="h4" component="h2">
                500 kişi
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Kullanıcı Listesi</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Toplam Kayıtlı Kullanıcı
              </Typography>
              <Typography variant="h4" component="h2">
                500 kişi
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Kullanıcı Listesi</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Bugün ki Sıcak Fırsat
              </Typography>
              <Typography variant="h4" component="h2">
                500 konu
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Kullanıcı Listesi</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Toplam Sıcak Fırsat
              </Typography>
              <Typography variant="h4" component="h2">
                2000 konu
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Kullanıcı Listesi</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );


}


export default Dashboard;