export class User {
  constructor(x) {
    this.uuid = x.uuid;
    this.name = x.name;
    this.fname = x.fname;
    this.lname = x.lname;
    this.fcmToken = x.fcmToken;
    
    // this.userName = x.userName;
    this.email = x.email;

    this.isActive = x.isActive;
    this.phone = x.phone;
    // this.collections = x.collections;
    // this.sneakerSize = x.sneakerSize;
    this.handicap = x.handicap;
    this.membership = x.membership;
    this.membership_fee_status = x.membership_fee_status;
    this.credit = x.credit;
    // this.sneakerCount = x.sneakerCount;
    // this.sneakerScans = x.sneakerScans;
    this.timestampRegister = x.timestampRegister;
    this.profileImage = x.profileImage;
  }

  static fromFirestore(doc) {
    const data = doc.data();

    if (!data) return null;

    return new User({
      uuid: doc.id,
      name: data["name"] ? data["name"] : "",
      fname: data["fname"] ? data["fname"] : "",
      lname: data["lname"] ? data["lname"] : "",
      fcmToken: data["fcmToken"] ? data["fcmToken"] : "",
      
      email: data["email"] ? data["email"] : "",
      isActive: data["isActive"] !== undefined ? data["isActive"] : false,
      phone: data["phone"] ? data["phone"] : "",
      // collections: data['collections'] ? data['collections'] : '',
      // sneakerSize: data['sneakerSize'] ? data['sneakerSize'] : '',
      handicap: data["handicap"] ? data["handicap"] : "",
      membership: data["membership"] ? data["membership"] : "Unknown",
      membership_fee_status: data["membership_fee_status"] ? data["membership_fee_status"] : "Unknown",
      credit: data["credit"],

      

      // sneakerCount: data['sneakerCount'] ? data['sneakerCount'] : '',
      // sneakerScans: data['sneakerScans'] ? data['sneakerScans'] : '',
      timestampRegister: data["timestampRegister"]
        ? data["timestampRegister"]
        : "",
      profileImage: data["profileImage"] ? data["profileImage"] : "",
    });
  }

  toJson(x) {
    return {
      uuid: x.uuid,
      name: x.name,
      fname: x.fname,
      lname: x.lname,
      email: x.email,
      isActive: x.isActive,
      phone: x.phone,
      // fcmToken: x.fcmToken,
      // collections: x.collections,
      // sneakerSize: x.sneakerSize,
      handicap: x.handicap,
      membership: x.membership,
      membership_fee_status:x.membership_fee_status,
      credit:x.credit,
      // sneakerCount: x.sneakerCount,
      // sneakerScans: x.sneakerScans,
      timestampRegister: x.timestampRegister,
      profileImage: x.profileImage,
    };
  }
}
