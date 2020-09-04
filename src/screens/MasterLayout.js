import React, { useState } from 'react'
import useStyle from './MasterLayout.styles'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import API from '../API'
import Title from '../components/Title'

const MasterLayout =() => {
    const classes = useStyle()
    const [mail, setMail] = useState('');
    // const [errorReg , setErrorReg] = useState(false)

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const body = {
        "email":mail,
    }
    console.log(body)
    API.submitObj(body).then(json =>{
    console.log(json)
    })
  }

// const handleRegex = (e)=>{
//     console.log(e.target.value)
// }


    return (
        <div className={classes.root}>
          <Grid className={classes.contactGrid} item container xs={12}>
             <Title title='Moonpig NewsLetter Subscription' />
            <Grid className={classes.formGrid} item xs={12} md={6}>

        <form className={classes.formMain} onSubmit={handleSubmitForm}>     
            <TextField
            style={{ marginTop: '20%' }}
            size="medium"
            fullWidth
            required
            id="outlined-required"
            label='Enter Your Email'
            variant="outlined"
            // regex={/^[a-z0-9]{3,}@[2-z]{2,}\.[a-z]{2,4}$/i}
            // errorText="invalid E-mail format"
            // onBlur={()=>handleRegex()}
            value={mail}
            onChange={e => setMail(e.target.value)}
		    />
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                style={{ marginTop: 35, display: 'flex', width:'36%' }}
            >
            Submit
            </Button>
         
        </form>
          </Grid>
        </Grid>
        </div>
    )
}
export default MasterLayout