const API_LOGIN = "https://us-central1-project-93bdb.cloudfunctions.net/api/login";
const API_REGISTER = "https://us-central1-project-93bdb.cloudfunctions.net/api/signup";


const setUser=(user)=>{
  localStorage.setItem('user', user);
  
}

const login=(e)=>{
      e.preventDefault();
      let email = document.querySelector("#emailUser").value
      let password = document.querySelector("#passwordUser").value
  
      let usertype = localStorage.getItem('user');
      let res = null;
      let data = {
        email: email,
        password: password,
        usertype: usertype 
      };
  
      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        body: JSON.stringify(data),
        contentType: "application/json"
      };
      
      fetch(API_LOGIN, requestOptions)
        .then(response => {
          res = response.status;
          if(!response.ok){
            return {error: "Wrong credentials, try again"};
           
          }
          return response.json()}
          )
        .then(user => {
          if(user.error)
          return console.log(user);
          console.log(user.token);
          localStorage.setItem("token", user.token)
         
          if(usertype == "students")
          return window.location.href = "student.html";
          return window.location.href = "instructor.html";
        })
        .catch(error => console.log('error', error));
  }
  
  const register=(e)=>{

    e.preventDefault();
    let email = doc('#newEmail');
    let firstname = doc('#first');
    let lastname = doc('#last');
    let password = doc('#passwordUser');
    // Need to add this
    // let confirmPassword = doc('#passwordUser');
    // Keepconfirm Password
    let userType = localStorage.getItem('user');
  
    const data = {
      email: email,
      firstname: firstname,
      lastname: lastname, 
      password: password,
      usertype: userType
    }
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify(data),
      contentType: "application/json"
    };
    
    fetch(API_REGISTER, requestOptions)
      .then(response => {
        return response.json();
      }).then(user => {
        if(!user.token)
        return console.log({ errors: user });
        localStorage.setItem("token", user.token)
        if(userType == "students")
        return window.location.href ="login.html";
        return window.location.href = "login.html";

      })
      .catch(error => console.log('error', error));
  }
  const doc=(str)=>{
    return document.querySelector(str).value;
    }