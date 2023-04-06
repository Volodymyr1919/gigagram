import { makeAutoObservable } from "mobx";

class SignupStore {
    username = "";
    password = "";
    confirmPassword = "";
  
    constructor() {
      makeAutoObservable(this);
    }
  
    setUsername(username) {
      this.username = username;
    }
    setPassword(password) {
      this.password = password;
    }
    setConfirmPassword(confirmPassword) {
      this.confirmPassword = confirmPassword;
    }
  
    onSubmit = async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "username": this.username,
            "password": this.password,
            "confirm_password": this.confirmPassword
          })
        };
    
        try {
          const response = await fetch('http://65.109.13.139:9191/signup', requestOptions);
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();
          console.log(data);
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("user_id", data.id);
    
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
          return true; // возвращаем true в случае успешного выполнения регистрации
        } catch (error) {
          console.error('There was an error!', error);
          return false; // возвращаем false в случае ошибки
        }
      };
    
      
  }
  export default SignupStore;
  