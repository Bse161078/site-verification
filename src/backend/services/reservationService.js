import { db } from '../firebase';
import { Ranking } from '../models/ranking';


export const getRanking = async function () {
    const query = await db.collection('SEORank').get();
    console.log("Ranking:",query)
    let Reservations = [];

    query.docs.forEach((doc) => {
        const Reser = Ranking.fromFirestore(doc);
        if (Reservations) {
            Reservations.push(Reser);
        }
    });
    console.log('Reservation', Reservations);
    return Reservations;
};

export const addSEORank = async function (data) {
    await db
      .collection("SEORank")
      .add(data)
      .then(async function (docRef) {
        //   console.log("Document written with ID: ", docRef.id);
        data.id = docRef.id;
        await updateSEORank(docRef.id, data);
      }).catch((err) => {
        console.log("Error:", err);
        this.setState({
          loading: false,
          showSnackBar: true,
          snackBarMessage: "Error creating trip",
          snackBarVariant: "error",
        });
      });
  };
  export const deleteReservation = async function (id) {
    await db.collection("Reservations").doc(id).delete();
  };
  export const updateSEORank = async function (id, data) {
       console.log("Edit data:", data);
    await db.collection("SEORank").doc(id).set(data, { merge: true });
  };

export const getTripReservation = async function () {
    const query = await db.collection('TripReservations').get();

    let Reservations = [];

    query.docs.forEach((doc) => {
        const Reser = Ranking.fromFirestore(doc);
        if (Reservations) {
            Reservations.push(Reser);
        }
    });
    console.log('Trip Reservation', Reservations);
    return Reservations;
};

export const addTripReservation = async function (data) {
    console.log("venueobj",data)
    await db
      .collection("TripReservations")
      .add(data)
      .then(async function (docRef) {
        //   console.log("Document written with ID: ", docRef.id);
        data.id = docRef.id;
        await updateTripReservation(docRef.id, data);
      }).catch((err) => {
        console.log("Error:", err);
        this.setState({
          loading: false,
          showSnackBar: true,
          snackBarMessage: "Error creating trip",
          snackBarVariant: "error",
        });
      });
  };
  export const deleteTripReservation = async function (id) {
    await db.collection("TripReservations").doc(id).delete();
    console.log("deleteid",id)
  };
  export const updateTripReservation = async function (id, data) {
       console.log("Edit data:", data);
    await db.collection("TripReservations").doc(id).set(data, { merge: true });
  };