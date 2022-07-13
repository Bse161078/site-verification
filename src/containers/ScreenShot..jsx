import React,{useState,useEffect} from 'react'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Paper from '@mui/material/Paper';

function Screenshot() {
    const [url,setUrl] = useState()
    const [image,setImage] = useState(false)
   

  return (
  <Grid container  >
    <Box sx={{ display: 'flex',justifyContent:'center',width:'100%' }}>
    </Box>
    <Grid md={12} sx={{display:'flex',justifyContent:'center',mt:5}}>
        <Typography variant='h4' >
            Get ScreenShot
        </Typography>
    </Grid>
    <Grid md ={12} sx={{display:'flex',justifyContent:'center',mt:5}} >
    <TextField id="outlined-basic" label="URL" variant="outlined"
    onChange={(e)=>{
        setUrl(e.target.value)
    }}
    >

    </TextField>
    <Button variant="contained" 
       onClick={()=>{
        setImage(true)
               }}
       sx={{m:1}}>Ok</Button>
    </Grid>
    <Grid md ={12} sx={{display:'flex',justifyContent:'center',mt:5}} >
    <Grid md={2}></Grid>
    <Grid md={5}>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 428,
        },
      }}
    >
      
   { image &&<Paper elevation={10} >
    <img src={"https://v1.nocodeapi.com/spoz/screen/VPfyCATgwhLxopgp/screenshot?url="+url  } width={"100%"} /> 
    </Paper>}
    </Box>

    
    </Grid>
    </Grid>
  </Grid>
  )
}

export default Screenshot