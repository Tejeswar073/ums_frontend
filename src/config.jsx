// @ts-nocheck
// export const backendURL = "http://127.0.0.1:50005im"

export function basepath() {
  let urlvalue = `http://${window.location.hostname}:4000/marvel`;
  // let urlvalue = `http://192.168.35.212:4000`
  console.log(urlvalue);
  return urlvalue;
}

export function getUserEmail() {
  if (typeof window !== 'undefined') { // Ensure code runs only in the browser
    const userdetails = JSON.parse(localStorage.getItem("userData"));
    if (userdetails) {
      return userdetails.email;
    }
  }
  return ''; // Return an empty string if no email is found
}



export  async function getUsersList() {
  const usersData = [];
  
  let email = getUserEmail();

  const formdata = {
    email: email
  };
  try {
    const response = await fetch(basepath() + "/get_users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    // console.log(data); // Log the response data to the console
    data.Data.map((user)=>{
      usersData.push({
        id: user._id,
        email:user.email,
        name:user.officername,
        unit: user.unit[0]
      })
    })
    return usersData;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }

}