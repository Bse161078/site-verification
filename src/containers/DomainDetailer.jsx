import React from 'react';
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { getRanking } from '../backend/services/reservationService';
import SnackBar from "../components/SnackBar";
import '../scss/style.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { cancelSubscription,getSubscriberById } from '../backend/services/subscriberVenueService';
export default class DomainDetailer extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
      users: [],
      allVenue: [],
      pages: 1,
      q: "",
      count:0,
      loading: false,
      responseMessage: "Loading Users...",
      showSnackBar: false,
      snackBarMessage: "",
      snackBarVariant: "success",
      search:"",
      showAddButton:false,
      Isfreeze:false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  componentDidMount(){
   // this.fetchSEORank()
    localStorage.setItem("venue","")
   
  }
  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      search:value
    })
  }


//   fetchSEORank = () => {
//     getRanking()
//       .then((response) => {
//         console.log("############", response)
//         this.state.allVenue=response
//           this.setState({
//           users:response,
//           allVenue: response,
//           loading:false
//         });
//         this.state.Isfreeze=this.state.allVenue?.Isfreeze
//               if(this.state.allVenue?.Name)
//           {
//             this.state.showAddButton=false
//             this.setState({
//               showAddButton:false
//             })
//          }
//           else
//           {
//             this.state.showAddButton=true
//             this.setState({
//               showAddButton:true
//             })

//           }
//       })
//       .catch((err) => {
//         this.setState({
//           showAddButton:false,
//           loading: false,
//           responseMessage: "No Venue Found...",
//         });
//         console.log("#######err#####", this.state.showAddButton);

//       });
//   };
 

  // handleRemoveVenue(venueId) {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Delete",
  //   }).then((result) => {
  //     if (result.value) {
  //         removeVenue(venueId)
  //         .then((response) => {
  //             console.log("venueremove",venueId)
  //           console.log("deleteuser",response)
  //           this.setState({
  //             showSnackBar: true,
  //             snackBarMessage: "Venue deleted successfully",
  //             snackBarVariant: "success",
  //           });
  //           this.fetchVenue();
  //         })
  //         .catch((e) => {
  //           console.log("deleteuser",e)
  //           this.setState({
  //             showSnackBar: true,
  //             snackBarMessage: "Error deleting venue",
  //             snackBarVariant: "error",
  //           });
  //         });
  //         this.fetchVenue();
  //     }
  //   });
  // }
   closeSnackBar()
   {
     this.setState({
       showSnackBar:false
     })
   }

   handleSearchVenue()
   {
     console.log('venuesearching',this.state.allVenue)
     if(this.state.allVenue.length>0)
     {
       
     let searchvenue=[]
     let venues = this.state.allVenue
     let search = this.state.search
     if(search!="")
     {
     venues.map((ven)=>{
        if(search=ven.Name)
        {
          searchvenue.push(ven)
        }
     })
     searchvenue.splice(0,1)
     venues=searchvenue
     }
     else{
       this.fetchVenue()
     }
    
   }
  }

  render() {
    const {allVenue} = this.state
    console.log("searchvenue",allVenue,this.state.showAddButton)
    return (
      <div class="container my-4"  style={{overflowX:"auto",overflowY:'hidden'}}  >
        {
          this.state.allVenue?.status==='canceled'&&
          <h1 style={{display:'flex',justifyContent:'center'}} >Your Subscription has been Canceled!</h1>
        }
         {this.state.loading===true&&
          <div class="loader"></div>
        }
  {   this.state.showSnackBar&&
        <SnackBar
            open={this.state.showSnackBar}
            message={this.state.snackBarMessage}
            variant={this.state.snackBarVariant}
            onClose={() => this.closeSnackBar()}
            autoHideDuration={2000}
          />
     } {this.state.allVenue?.status!=='canceled'&&
     <div>   
     <div className="row space-1">
                  <div className="col-sm-8">
                    <h3>Your Venue</h3>
                  </div>
                  {/* <div className="col-sm-4"></div> */}
                  { //this.state.showAddButton&&
                  <div className="col-sm-2 pull-right mobile-space">
                    <Link to="/" >
                      <button type="button" className="btn btn-success">
                       Add Domain Detailer
                      </button>
                    </Link>
                  </div>
                  }
                </div>
      <table  width={1000} style={{tableLayout:'auto'}} class="table table-striped table-bordered"  >
        <thead>
          <tr>
          <th class="th-sm">Majestic External Backlinks
            </th>
            <th class="th-sm" >Majestic Referring Domains

            </th>
            <th class="th-sm">Majestic Citation Flow
            </th>
            <th class="th-sm">Majestic Trust Flow
            </th>
            <th class="th-sm"> Majestic Topical Trust Flow 1
            </th>
            <th class="th-sm">Majestic Topical Trust Flow 2
            </th>
            <th class="th-sm">Majestic Topical Trust Flow 3
            </th>
           
          </tr>
        </thead>
        <tbody 
         >
           
        {allVenue.length>0&&allVenue.map((ranking)=>{
      return(
        <tr >
        <td>{ranking.da}</td>
        <td>{ranking.equity }</td>
        <td>{ranking.fb_comments}</td>
        <td>{ranking.fb_rec} </td>
        <td>
        {ranking.fb_shares}
        </td>
        <td>{ranking.links}</td>
        <td>{ranking.mozrank}</td>
        <td>{ranking.pa}</td>
        <td>{ranking.sr_costs}</td>
        <td>{ranking.sr_dlinks}</td>
        <td>{ranking.sr_hlinks}</td>
        <td>{ranking.sr_kwords}</td>
        <td>{ranking.sr_rank}</td>
        <td>{ranking.sr_traffic} </td>
        <td>{ranking.sr_ulinks}</td>
        {/* <td>
        <Link to={`/Venue/EditVenue`}>
        <Tooltip title="Edit" aria-label="edit"
        onClick={()=>{
            localStorage.setItem("venue",JSON.stringify(allVenue))
        }}
        >
            <span
            className="fa fa-edit"
            aria-hidden="true"
            ></span>
        </Tooltip>
        </Link>
        </td>
        <td>
        <Tooltip title="Delete" aria-label="delete">
        <span
            className="fa fa-trash"
            style={{ cursor: "pointer" }}
            aria-hidden="true"
            onClick={() =>
            {
                this.handleRemoveVenue(allVenue.id)
            }
            }
        ></span>
        </Tooltip>
        </td>
        */}
        </tr>
          )
        })
           
             }
        </tbody>
       
      </table>
     
      </div>
  }
  
    </div>
    );
  }
}

