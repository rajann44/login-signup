import { getDocs, query, where } from "firebase/firestore";
import { usersReference } from "./FireApp";
import bcrypt from "bcryptjs";

export const validateIfUserPresentInDBAndSendUserDetails = async (userInfo) => {
  try {
    const queryResult = query(
      usersReference,
      where("email", "==", userInfo.email) //Made query to execute in DB
    );
    const userDocument = await getDocs(queryResult); //Fetched the user's from DB based on query
    //Iterating through result
    for (const singleUserDoc of userDocument.docs) {
      const dataFromDoc = singleUserDoc.data();
      userInfo.userId = singleUserDoc.id;
      //Validating if user password is same as encrypted password in DB
      const isUser = bcrypt.compareSync(
        userInfo.password,
        dataFromDoc.password
      );
      //If user password is correct, we are sending user details from DB, otherwise we send null
      if (isUser) {
        console.log("Login Success");
        console.log(dataFromDoc);
        return dataFromDoc;
      } else {
        console.log("Login Failed");
      }
    }
    console.log("Login Failed");
    return null; // Add a default return value in case no matching user is found
  } catch (error) {
    console.log("Login Failed");
    return null; // Add a default return value in case of an error
  }
};
