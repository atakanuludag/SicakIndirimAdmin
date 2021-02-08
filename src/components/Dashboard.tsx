import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import ReportService from '../services/ReportService'
import Report from '../models/Report'

const Dashboard: React.FC = () => {

  const service = new ReportService();
  const [reportData, setReportData] = useState<Report>({
    hotDealCount: 0,
    todayHotDealCount: 0,
    userCount: 0
  } as Report);
  
  useEffect(() => {
    const getItems = async () => {
      try {
        const result = await service.getReport();
        setReportData(result);
      } catch(err){
        console.log("err", err);
      }
    }
    getItems();
  }, []);

  const useStyles = makeStyles({
    root: {
      //minWidth: 275,
    }
  });

  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>

        <Grid item xs={12} md={4} lg={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Toplam Kayıtlı Kullanıcı
              </Typography>
              <Typography variant="h4" component="h2">
                {reportData.userCount} kişi
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Kullanıcı Listesi</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Bugün ki Sıcak Fırsat
              </Typography>
              <Typography variant="h4" component="h2">
                {reportData.todayHotDealCount} konu
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Kullanıcı Listesi</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Toplam Sıcak Fırsat
              </Typography>
              <Typography variant="h4" component="h2">
                {reportData.hotDealCount} konu
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