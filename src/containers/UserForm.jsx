import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import RichTextEditor from "react-rte";
import { Button } from "reactstrap";
import {
  addUser,
  updateUser,
  getUserById,
} from "../backend/services/usersService";
import { firebase } from "../backend/firebase";
import { imageResizeFileUri } from "../static/_imageUtils";
import { v4 as uuidv4 } from "uuid";
import SnackBar from "../components/SnackBar";

import Select from "react-select";
import "react-select/dist/react-select.css";
import { TextField } from "@material-ui/core";
export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: {
        uuid: "",
        name: "",
        fname: "",
        lname: "",
        email: "",
        phone: "",
        handicap: "",
        profileImage: "",
        card_number: "",
        user_card_cvv:"",
        user_card_month:'',
        user_card_year:'',
        timestampRegister: new Date(),
        isActive: true,
        membership: "Unknown",
        membership_fee_status:""
      },
      image: "",
      file: "",
      userId: "",
      description: RichTextEditor.createEmptyValue(),
      showSnackBar: false,
      snackBarMessage: "",
      snackBarVariant: "success",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.postUser = this.postUser.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    console.log("this.props", this.props);
    if (match.params.userId)
      getUserById(match.params.userId)
        .then((response) => {
          console.log("user:", response);
          this.setState({
            user: response,
          });
        })
        .catch((err) => {
          window.alert("ERROR!");
        });
  }

  handleInputChange(event) {
    const { value, name } = event.target;

    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  postUser = async (event) => {
    event.preventDefault();
    const { match, history } = this.props;
    const { loading, user, image } = this.state;
    user.name = user.fname + " " + user.lname;
    if (!loading) {
      this.setState({ loading: true });

      let imageFile = image;

      let downloadUrl;
      let imageUri;

      if (imageFile) {
        imageUri = await imageResizeFileUri({ file: imageFile });

        const storageRef = firebase
          .storage()
          .ref()
          .child("Users")
          .child(`${uuidv4()}.jpeg`);

        if (imageUri) {
          await storageRef.putString(imageUri, "data_url");
          downloadUrl = await storageRef.getDownloadURL();
        }
        user.profileImage = downloadUrl;
      }

      if (match.params.userId) {
        let cloneObject = Object.assign({}, user);
        updateUser(match.params.userId, cloneObject)
          .then((response) => {
            this.setState({
              loading: false,
              showSnackBar: true,
              snackBarMessage: "User updated successfully",
              snackBarVariant: "success",
            });
          })
          .catch((err) => {
            console.log("Error:", err);
            this.setState({
              loading: false,
              showSnackBar: true,
              snackBarMessage: "Error updating user",
              snackBarVariant: "error",
            });
          });
      } else {
        addUser(user)
          .then((response) => {
            console.log("response:", response);
            this.setState({
              loading: false,
              showSnackBar: true,
              snackBarMessage: "User saved successfully",
              snackBarVariant: "success",
            });
          })
          .catch((err) => {
            this.setState({
              loading: false,
              showSnackBar: true,
              snackBarMessage: "Error creating user",
              snackBarVariant: "error",
            });
          });
      }
    }
  };

  handleProfileImage = (event) => {
    this.setState({
      image: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  closeSnackBar = () => {
    const { history } = this.props;
    this.setState({ showSnackBar: false });
    if (this.state.snackBarVariant === "success") {
      history.goBack();
    }
  };

  handleChange = (e) => {
    let user = this.state.user;
    user.membership = e.target.value;
    this.setState({ user });
  };

  handleChangeStatus = (e) => {
    let user = this.state.user;
    user.membership_fee_status = e.target.value;
    this.setState({ user });
  };


  render() {
    console.log(this.state);
    const {
      user,
      showSnackBar,
      snackBarMessage,
      snackBarVariant,
      image,
      file,
    } = this.state;
    const { match, history } = this.props;
    const isEdit = !!match.params.userId;

    return (
      <div className="row animated fadeIn">
        {showSnackBar && (
          <SnackBar
            open={showSnackBar}
            message={snackBarMessage}
            variant={snackBarVariant}
            onClose={() => this.closeSnackBar()}
          />
        )}
        <div className="col-12">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              <div className="x_panel">
                <div className="x_title">
                  <h2>Enter User Details</h2>
                </div>
                <div className="x_content">
                  <br />
                  <form
                    id="demo-form2"
                    data-parsley-validate
                    className="form-horizontal form-label-left"
                    onSubmit={this.postUser}
                  >
                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Profile Image
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          type="file"
                          accept="image/*"
                          name="profileImage"
                          className="form-control"
                          onChange={this.handleProfileImage}
                        />
                      </div>
                    </div>

                    {image ? (
                      <div className="form-group row">
                        <label className="control-label col-md-3 col-sm-3"></label>
                        <div className="col-md-6 col-sm-6">
                          <img
                            style={{ marginRight: "5px" }}
                            width="100"
                            className="img-fluid"
                            src={file}
                            alt="profileImage"
                          />
                        </div>
                      </div>
                    ) : user.profileImage && user.profileImage.length ? (
                      <div className="form-group row">
                        <label className="control-label col-md-3 col-sm-3"></label>
                        <div className="col-md-6 col-sm-6">
                          <img
                            style={{ marginRight: "5px" }}
                            width="100"
                            className="img-fluid"
                            src={`${user.profileImage}`}
                            alt="profileImage"
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        First Name
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          required
                          type="text"
                          name="fname"
                          className="form-control"
                          value={user.fname}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Last Name
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          required
                          type="text"
                          name="lname"
                          className="form-control"
                          value={user.lname}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Email
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          required
                          type="email"
                          name="email"
                          className="form-control"
                          value={user.email}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Phone Number
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          // required
                          type="number"
                          name="phone"
                          className="form-control"
                          value={user.phone}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Credit Card
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          type="number"
                          name="card_number"
                          className="form-control"
                          value={user.card_number}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Credit Card CVV
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          type="number"
                          name="user_card_cvv"
                          className="form-control"
                          value={user.user_card_cvv}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Credit Card Exp Month
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          type="number"
                          name="user_card_month"
                          className="form-control"
                          value={user.user_card_month}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Credit Card Exp Year
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          type="number"
                          name="user_card_year"
                          className="form-control"
                          value={user.user_card_year}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Handicap
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <input
                          required
                          type="text"
                          name="handicap"
                          className="form-control"
                          value={user.handicap}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Membership
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <select
                          style={{ marginTop: 8 }}
                          value={user.membership}
                          onChange={this.handleChange}
                        >
                          <option name="unknown">Unknown</option>
                          <option name="executive">Executive</option>
                          <option name="member">Member</option>
                          <option name="Social Guest">Social Guest</option>
                          <option name="Golf Guest">Golf Guest</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="control-label col-md-3 col-sm-3">
                        Membership Fee Status
                      </label>
                      <div className="col-md-6 col-sm-6">
                        <select
                          style={{ marginTop: 8 }}
                          value={user.membership_fee_status}
                          onChange={this.handleChangeStatus}
                        >
                          <option name="unknown">Unknown</option>
                          <option name="paid">Paid</option>
                          <option name="unpaid">Unpaid</option>
                        </select>
                      </div>
                    </div>

                    

                    <div className="ln_solid"></div>
                    <div className="form-group row">
                      <div className="col-md-6 col-sm-6 offset-md-3">
                        <Button
                          className={`btn btn-success btn-lg ${
                            this.state.loading ? "disabled" : ""
                          }`}
                        >
                          <i
                            className={`fa fa-spinner fa-pulse ${
                              this.state.loading ? "" : "d-none"
                            }`}
                          />
                          {isEdit ? " Update" : " Submit"}
                        </Button>
                        <Button
                          onClick={() => history.goBack()}
                          className={`mx-3 btn btn-danger btn-lg`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
