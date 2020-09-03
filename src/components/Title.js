import React from 'react'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		marginBottom: 60,
		height: 65,
		width: '100%',
	},
	title: {
        textAlign: 'left',
        "&::after": {
            content:  "''",
            position: 'absolute',
            left: 0,
            top: 'auto',
            bottom: 0,
            height: 5,
            borderRadius: 100,
            width: '8%',
            background: '#1866d5',
        },
        "&::before": {
            content: "''",
            position: 'absolute',
            left: 0,
            top: 'auto',
            bottom: 0,
            height: 5,
            borderRadius: 100,
            width: '30%',
            background: 'rgba(3,127,255,.3)',
        }
    },
    subtitle: {
        fontSize: '3.1rem',
        position: 'absolute',
        left: 18,
        top: '95%',
        fontWeight: 700,
        color: 'rgba(25,29,43,.05)',
        display: 'inline-block',
        zIndex: 1,
    },
    
}));

export default function Title({title}) {
    const classes = useStyles()
    return (
			<div className={classes.root}>
				<Typography className={classes.title} variant="h2">
					{title}
				</Typography>
				<span className={classes.subtitle}>MOONPIG.COM</span>
			</div>
		);
}