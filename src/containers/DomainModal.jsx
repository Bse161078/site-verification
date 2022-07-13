import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper } from '@mui/material';
import axios from 'axios';
import { saveAs } from "file-saver";

function LinkModal(props) {
    const {open,setOpen,text,domain,heading} = props;

    const [message,setMessage] = useState();
    const [openAlert,setOpenAlert] = useState();
    const [severity,setSeverity] = useState();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

  const handleClose = () => setOpen(false);

  const verifyTextRecord= async ()=>{
    const data ={
        domain:domain
    }
    axios.post(`https://site-verification1.herokuapp.com/verify-txt-record`,data)
    .then((response) => {
      
        console.log("response",response)
        setMessage("Verified successfully!")
        setOpenAlert(true)
        setSeverity('success')
    })
    .catch((err)=>{
      setMessage("Verification Failed!")
      setOpenAlert(true)
      setSeverity("error")
    })
  }

  const verifyByTag= async ()=>{
    const data ={
        domain:domain
    }
    console.log("Tags")
    axios.post(`https://site-verification1.herokuapp.com/verify-tag`,data)
    .then((response) => {
      
        console.log("response",response)
        setMessage("Verified successfully!")
        setOpenAlert(true)
        setSeverity('success')
    })
    .catch((err)=>{
      setMessage("Verification Failed!")
      setOpenAlert(true)
      setSeverity("error")
    })
  }

  const verifyByHtml= async ()=>{
    const data ={
        domain:domain
    }
    console.log("Tags")
    axios.post(`https://site-verification1.herokuapp.com/verify-html`,data)
    .then((response) => {
      
        console.log("response",response)
        setMessage("Verified successfully!")
        setOpenAlert(true)
        setSeverity('success')
    })
    .catch((err)=>{
      setMessage("Verification Failed!")
      setOpenAlert(true)
      setSeverity("error")
    })
  }

  const handleDownload = () => {
    console.log("file",text)
    var FileSaver = require('file-saver');
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "hello world.html");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {heading}
          </Typography>
          {heading&&heading.includes("File")?<Button variant="outlined"
          onClick={()=>handleDownload()}
          >
            Download File
          </Button>
            :
          <Paper elevation={12} >
            <Typography variant='body2' component='h5'>
                 {text}
             </Typography>
           </Paper> }
          {heading&&!heading.includes("File")&&<Typography variant="subtitle1" component='body1'>
            Copy the text and paste it to your domain
          </Typography>}
          <Button variant="contained" 
       onClick={()=>{
        if(heading&&heading.includes("Tag"))
        verifyByTag()
        else if(heading&&heading.includes("Text"))
        verifyTextRecord()
        else
        verifyByHtml()
       
       }}
       sx={{m:2,ml:17}}>Verify</Button>
        </Box>
      
      </Modal>
    </div>
  )
}

export default LinkModal