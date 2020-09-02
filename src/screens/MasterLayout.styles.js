import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: theme.palette.secondary.main
  },
  contactGrid:{
    paddingTop: 80,
    paddingBottom: 60,
    paddingRight: 60,
    paddingLeft: 80,
    [theme.breakpoints.down('xs')]: {
        paddingRight: 5,
        paddingLeft: 5,
    },
    formGrid: {
        padding: 12,
        display:'flex',
        flex:1,
      
    },
    formMain:{
        width:600,
        
        backgroundColor:'#fff'
    }
  }
}))
