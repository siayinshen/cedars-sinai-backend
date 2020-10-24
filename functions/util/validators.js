const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  try{
    if (email.match(emailRegEx)) {
        return true;
    } else {
        return false;
    }
  }catch(e){
    return false;
  }
};

const isEmpty = (string) => {
  try{
    if (string.trim() === "") {
        return true;
    } else {
        return false;
    }
  }catch(e){
    return false;
  }
};

exports.validateSignupData = (newUser) => {
    let errors = {};
    if (isEmpty(newUser.email)) {
        errors.email = "Must not be empty";
    } else if (!isEmail(newUser.email)) {
        errors.email = "Must be a valid email address";
    }

    if (isEmpty(newUser.password)) errors.password = "Must not be empty";
    if (newUser.password !== newUser.confirmPassword)
        errors.confirmPassword = "Passwords must match";
    if (isEmpty(newUser.handle)) errors.handle = "Must not be empty";

    return {
        errors,
        valid: Object.keys(errors).length  === 0 ? true : false
    }
}

exports.validateLoginData = (user) => {
    let errors = {};

    if (isEmpty(user.email)) errors.email = "Must not be empty";
    if (isEmpty(user.password)) errors.password = "Must not be empty";

    return {
        errors,
        valid: Object.keys(errors).length  === 0 ? true : false
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {}

    if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio
    if (!isEmpty(data.website.trim())) {
        // add http
        if (data.website.trim().substring(0, 4) !== 'http') {
            userDetails.website = `http://${data.website.trim()}`;
        } else {
            userDetails.website = data.website;
        }
    }
    if (!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
}

// exports.reduceAnnouncementDetails = (data) {
//     let announcementDetails = {}

//     if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio
//     if (!isEmpty(data.website.trim())) {
//         // add http
//         if (data.website.trim().substring(0, 4) !== 'http') {
//             userDetails.website = `http://${data.website.trim()}`;
//         } else {
//             userDetails.website = data.website;
//         }
//     }
//     if (!isEmpty(data.location.trim())) userDetails.location = data.location;

//     return userDetails;
// }
