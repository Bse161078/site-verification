import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState,useEffect} from 'react';
import Typography from '@mui/material/Typography';
import DomainModal from './DomainModal';
import { Box } from '@mui/system';

function DomainVerify() {
    const [open,setOpen] = useState(false);
    const [code,setCode] = useState();
    const [heading,setHeading] = useState()
    const [domain,setDomain] = useState();
    const [text,setText] = useState();

    const generateTextRecord= async ()=>{
      axios.get(`https://site-verification1.herokuapp.com/generate-txt-record`)
      .then((response) => {
        
          console.log("response",response)
          setOpen(true)
          setHeading("Verify By Text")
          setText(response.data.txtRecord)
      })
      .catch((err)=>{
        window.alert(err)
      })
    }
  
    const generateTag= async ()=>{
      
      axios.get(`https://site-verification1.herokuapp.com/generate-tag`)
      .then((response) => {
        console.log("responseTag",response)
        setHeading("Verify By Tag")
        setText(response.data.tag)
        setOpen(true)
      })
      .catch((err)=>{
        window.alert(err);
  
      })
    }
  
    const generateFile= async ()=>{
      axios.get(`https://site-verification1.herokuapp.com/generate-html`)
      .then((response) => {
        console.log("responseverifydomain",response)
        setHeading("Verify By File")
        setText(response.data)
        setOpen(true)
      })
      .catch((err)=>{
        window.alert(err);
      })
    }
  
    console.log("token", text)

  return (
    <Grid container  >
    <Box sx={{ display: 'flex',justifyContent:'center',width:'100%' }}>
    </Box>
         <DomainModal open={open} setOpen={setOpen} text={text} domain={domain} heading={heading} />
    <Grid md={12} sx={{display:'flex',justifyContent:'center',mt:5}}>
        <Typography variant='h4' >
            Verify Domain
        </Typography>
    </Grid>
    <Grid md ={12} sx={{display:'flex',justifyContent:'center',mt:5}} >
    <TextField id="outlined-basic" label="URL" variant="outlined"
    onChange={(e)=>{
      setDomain(e.target.value)
    }}
    >

    </TextField>
    </Grid>
    <Grid md ={12} sx={{display:'flex',justifyContent:'center',mt:5}} >
    <Button variant="contained" 
       onClick={()=>{
        generateTextRecord()
       }}
       sx={{m:1}}>Verify By Text Record</Button>
        <Button variant="contained" 
       onClick={()=>{
        generateTag()
       }}
       sx={{m:1}}>Verify By Post</Button>
        <Button variant="contained" 
       onClick={()=>{
        generateFile()
       }}
       sx={{m:1}}>Verify By Post File</Button>
    </Grid>
  
    {/* <Grid md = {5}>
    {token &&<Card sx={{ minWidth: 275, marginLeft:10,marginRight:2,marginTop:5 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {token}
      </Typography>
      </CardContent>
      </Card>}
    </Grid>
    {code&&<Grid md ={2.2} sx={{marginTop:5}}>
    <TextField id="outlined-basic" label="Domain Name" variant="outlined"
    onChange={(e)=>{
      setDomain(e.target.value)
    }}
    >

    </TextField>
    </Grid>}
    <Grid md={1.8} sx={{marginTop:6}}>   
       <Button variant="contained" 
       onClick={()=>{
        code?verifyDomain():getaLink()
       }}
       >{code?"Verify":"Get a Link"}</Button>
    </Grid>
    <Grid md={3}></Grid>
    <Grid md={5.5}></Grid>
    {code&&<Grid md={2} sx={{marginTop:3}}>
    <Button variant="contained" 
       onClick={()=>{
        getToken()
       }}
       >Get Token</Button>
    </Grid>} */}
  </Grid>
  )
}

export default DomainVerify