import React,{useState,useEffect} from 'react'
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import {addSEORank} from '../backend/services/reservationService'
function SEORank() {
   
    const [url,setUrl] = useState()
    const [response,setResponse] = useState()
    const getRanking= async ()=>{
        const headers = {
            'Content-Type': 'text/plain'
        };
        axios.get(`https://site-verification1.herokuapp.com/stats`,
        {headers}
        )
        .then((res) => {
          
            console.log("response",res)
             addSEORank(res.data.data)
        })
        .catch((err)=>{
          window.alert(err)
        })
      }
      console.log("response",response)
  return (
    <Grid container  >
    <Box sx={{ display: 'flex',justifyContent:'center',width:'100%' }}>
    </Box>
    <Grid md={12} sx={{display:'flex',justifyContent:'center',mt:5}}>
        <Typography variant='h4' >
            SEO Rank
        </Typography>
    </Grid>
    <Grid md ={12} sx={{display:'flex',justifyContent:'center',mt:5}} >
    <TextField id="outlined-basic" label="URL" variant="outlined" value={url}
    onChange={(e)=>{
        setUrl(e.target.value)
    }}
    >

    </TextField>
    <Button variant="contained" 
       onClick={()=>{
        getRanking()
           }}
       sx={{m:1}}>Ok</Button>
    </Grid>
    
  </Grid>
  )
}

export default SEORank