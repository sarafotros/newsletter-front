import React, { useState } from 'react'
import useStyle from './MasterLayout.styles'
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../API'
import Title from '../components/Title'

const MasterLayout =() => {
    const classes = useStyle()
    const [mail, setMail] = useState('');
    const [errorReg , setErrorReg] = useState(false)
    const [errorText , setErrorText] = useState('')
    const [isBlurEmailField, setIsBlurEmailField]= useState(false)

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const body = {
      "id": uuidv4(),
      "email":mail,
    }
    API.submitObj(body)
        .then(json => {
          console.log('json')
        const { message } = json;
        toast.success(message.msgBody) 
        setMail('')
        setErrorReg(false)})
  }

  const handleRegex = (e)=>{
    const regex = /^[a-z0-9A-Z.]{3,}@[2-z]{2,}\.[a-z]{2,4}$/i
    setErrorReg(!regex.test(e.target.value))
    setErrorText('Invalid Email Format')
  }

  const handleBlurField = (e)=>{
    setIsBlurEmailField(true)
    handleRegex(e)
  }

  const handleTextFieldChange= (e)=>{
     setMail(e.target.value)
     isBlurEmailField && handleRegex(e)
  }

    return (
        <div className={classes.root}>
          <Grid className={classes.contactGrid} item container xs={12}>
             <Title title='Moonpig NewsLetter Subscription' />
            <Grid className={classes.formGrid} item xs={12} md={6}>
          <ToastContainer position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>
        <form className={classes.formMain} onSubmit={handleSubmitForm}>     
            <TextField
            style={{ marginTop: '20%' }}
            size="medium"
            fullWidth
            required
            id="outlined-required"
            label='Enter Your Email'
            variant="outlined"
            onBlur={(e)=>handleBlurField(e)}
            value={mail}
            onChange={e => handleTextFieldChange(e)}
		    />
         {errorReg ? (
            <Typography variant='subtitle1' style={{ color: '#ba2d65', fontSize: 16, marginTop: 10 }}>
                {errorText}
            </Typography>
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