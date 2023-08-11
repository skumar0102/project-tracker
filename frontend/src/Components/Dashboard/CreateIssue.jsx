import React,{useState,useEffect} from 'react';
import {Container,Box,InputLabel,MenuItem,
FormControl,Select, Typography, TextField,Button,
Grid,CssBaseline} from '@mui/material';
import SideandNavbar from './SideandNavbar';
import { useFormik } from 'formik'; 
import { http } from '../../Config/axiosConfig.js';
import {IssueValidation} from './Validation.js';
import {FormGroup} from 'react-bootstrap';
import Swal from 'sweetalert2';

function CreateIssue() {
const [Projects, setProjects] = useState([]);
const [Team, setTeam] = useState([]);

const formik = useFormik({
  validationSchema:IssueValidation,
  initialValues : {
    project_code:"",
    issue_type:"",
    issue_status:"",
    summary:"",
    description:"",
    assignee:"",
    starting_date:"",
    ending_date:"",
    reporter:"",
  },
  onSubmit:(values)=>{
    console.log("values",values);
    http.post("/issue",values).then((res)=>{
      if(res.status === 201){
        Swal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          background:'#4aa3d1',
          title: 'Issue create successfully Done !',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
      })
      }
    })

  }
})
const { handleChange, values, handleSubmit, handleBlur, errors, touched } =
formik;

  useEffect(() => {
    http.get(`/project`)
      .then((res) => {
        setProjects(res.data.result);
        // setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err.messsage);
      });

    http.get(`/team`)
      .then((res) => {
        setTeam(res.data.result);
      })
      .catch((err) => {
        console.log(err.messsage);
      });
  }, []);


  return (
    <>
<FormGroup onSubmit={handleSubmit} >


<Box 
          component="form"

sx={{ display: "flex" }}>
      <CssBaseline />
    <SideandNavbar/>
      <Box
          component="main"
          sx={{
            
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={12}>
       
      
          <div style={{maxwidth:1800,
          height:'100%',
          // backgroundColor: '#e565654d',
          backgroundColor: 'white',
          borderRadius:'20px',
          padding:'20px'}}>

          <h1 style={{margin:0}}>Create Issue</h1>
          <hr/>
          <FormControl  sx={{ ml: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-autowidth-label" >Project *</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          value={values.project_code}
          onChange={handleChange}
          autoWidth
          label="Project *"
          style={{marginBottom:'50px'}}
          name="project_code"
        >
          <MenuItem  style={{minWidth: 400 }}>
            <em>None</em>
          </MenuItem>
          {Projects.map((el,index)=>(
            <MenuItem key={index} value={el.project_code}>{el.project_name}</MenuItem>
          ))}
          
        </Select>
        {errors.project_code && touched.project_code ? (
                <Typography  style={{ color: "red" }}>
                  {errors.project_code}
                </Typography>
              ) : null}
        
      <FormControl sx={{ ml: 0, minWidth: 400 }}>
      <InputLabel id="demo-simple-select-autowidth-label" >Issue type *</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={values.issue_type}
          onChange={handleChange}
          autoWidth
          label="Issue type *"
          name='issue_type'
        >
          <MenuItem value={values.issue_type} style={{minWidth: 400 }}>
            <em>None</em>
          </MenuItem>
          <MenuItem value="Epic">Epic</MenuItem>
          <MenuItem value="Task">Task</MenuItem>
        </Select>
        {errors.issue_type && touched.issue_type ? (
                <Typography  style={{ color: "red" }}>
                  {errors.issue_type}
                </Typography>
              ) : null}
       
        </FormControl>
      </FormControl>
        <hr/>

        <FormControl sx={{ ml: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-autowidth-label" >Status *</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          name='issue_status'
          autoWidth
          label="Status *"
          value={values.issue_status}
          onChange={handleChange}
        >
      
          <MenuItem style={{minWidth: 400 }} value="To Do" >To Do</MenuItem>
          <MenuItem value="In-progress">In-progress</MenuItem>
          <MenuItem value="Done" >Done</MenuItem>
        </Select>
        {errors.issue_status && touched.issue_status ? (
                <Typography  style={{ color: "red" }}>
                  {errors.issue_status}
                </Typography>
              ) : null}
        {/* <Typography>This is the issue`s initial status upon creation.</Typography> */}
      </FormControl>
      <br/>
    
        <TextField sx={{width: '1000px',ml: 1,mt:2}} label='Summary *' name="summary" value={values.summary} onBlur={handleBlur} onChange={handleChange}  />
        {errors.summary && touched.summary ? (
                <Typography  style={{ color: "red" }}>
                  {errors.summary}
                </Typography>
              ) : null}
        <TextField sx={{width: '1000px',ml: 1,mt:2}} value={values.description} name='description' label='Description *'multiline rows={4} onBlur={handleBlur} onChange={handleChange}  />
        {errors.description && touched.description ? (
                <Typography  style={{ color: "red" }}>
                  {errors.description}
                </Typography>
              ) : null}
<br/>
        <FormControl sx={{ mt:2,ml: 1, minWidth: 400 }}>
        <InputLabel id="demo-simple-select-autowidth-label" >Assignee *</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          name='assignee'
          autoWidth
          label="Assignee *"  
          value={values.assignee}
          onChange={handleChange}
          style={{marginBottom:'20px'}}
        >
      {Team.map((el,index)=>(

          <MenuItem style={{minWidth: 400 }} value={el.first_name}>{el.first_name.toUpperCase()}&nbsp;{el.last_name.toUpperCase()}</MenuItem>
      ))}
        </Select>
        {errors.assignee && touched.assignee ? (
                <Typography  style={{ color: "red" }}>
                  {errors.assignee}
                </Typography>
              ) : null}
        </FormControl> 
        <br/>
            <Grid>
        <InputLabel sx={{ml: 1}} id="demo-simple-select-autowidth-label" >Starting Date & Ending Date *</InputLabel>

        <TextField sx={{width: '45%',ml: 1}} label='' type='date' name='starting_date' value={values.starting_date} onBlur={handleBlur} onChange={handleChange}  />
        {errors.starting_date && touched.starting_date ? (
                <Typography  style={{ color: "red" }}>
                  {errors.starting_date}
                </Typography>
              ) : null}
        <TextField sx={{width: '45%',ml: 1}} label='' type='date' name='ending_date' value={values.ending_date} onBlur={handleBlur} onChange={handleChange}  />
        {errors.ending_date && touched.ending_date ? (
                <Typography  style={{ color: "red" }}>
                  {errors.ending_date}
                </Typography>
              ) : null}
              </Grid>
              <br/>
        <TextField sx={{width: '1000px',ml: 1}} label='Reporter'  value={values.reporter} name='reporter' type='text' onBlur={handleBlur} onChange={handleChange}  />
        {errors.reporter && touched.reporter ? (
                <Typography  style={{ color: "red" }}>
                  {errors.reporter}
                </Typography>
              ) : null}
              <br/><br/>
        <Button variant='contained' type="submit" color='info'  sx={{ color: '#fff',ml:1 }} >Create</Button>
        
     
          </div>
          </Grid>
          </Grid>
          </Container>
          </Box>
          </Box>
          
</FormGroup>
        
    </>
  )
}

export default CreateIssue