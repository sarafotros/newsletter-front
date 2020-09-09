import React, { useState } from 'react'
import useStyle from './MasterLayout.styles'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import API from '../API'
import Title from '../components/Title'

const MasterLayout =() => {
    const classes = useStyle()
    const [mail, setMail] = useState('');
    const [errorReg , setErrorReg] = useState(false)
    const [errorText , setErrorText] = useState("invalid E-mail format")

  const handleSubmitForm = (e) => {
    e.preventDefault()
    // e.target.reset();
    // setMail('')
    const body = {
        "email":mail,
    }
    API.submitObj(body)
        .then(json =>{console.log(json)}) 
        // e.target.reset()
        setMail('')
       
  }

const handleRegex = (e)=>{
    const regex = /^[a-z0-9]{3,}@[2-z]{2,}\.[a-z]{2,4}$/i
    console.log(e.target.value)
    setErrorReg(!regex.test(e.target.value))
}


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
            onBlur={(e)=>handleRegex(e)}
            value={mail}
            onChange={e => setMail(e.target.value)}
		    />
         {errorReg ? (
            <span style={{ color: '#ba2d65', fontSize: 12, marginTop: 5 }}>
                {errorText}
            </span>
          ) : null}
            <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={errorReg ? true : false}
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