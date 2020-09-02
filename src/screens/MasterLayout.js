import React from 'react'
import useStyle from './MasterLayout.styles'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import Title from '../components/Title'

export default function MasterLayout() {
    const classes = useStyle()



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
  }


    return (
        <div className={classes.root}>
          <Grid className={classes.contactGrid} item container xs={12}>
             <Title title='Moonpig NewsLetter Subscription' />
            <Grid className={classes.formGrid} item xs={12} md={6}>
             <form onSubmit={handleSubmit} className={classes.formMain}>     
            <TextField
            style={{ marginTop: 25 }}
            size="medium"
            fullWidth
            required
            id="outlined-required"
            label='Enter Your Email'
            variant="outlined"
		    />
            <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: 25, display: 'flex', width:'36%' }}
            >
            Submit
            </Button>
        </form>
          </Grid>
        </Grid>
        </div>
    )
}
