import axios from "axios";

class SessionEndpoint {
    constructor() {}

    static async Register(username, email, password) {
        const dataJson = {
            username: username,
            email: email,
            password: password
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/register', dataJson);
            return response.data; // Return the response data instead of the entire response object
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return error.response.data; // Return the error response data
            }
            // Handle other errors if needed
            // console.error('Error fetching students:', error);
        }
    }
    static async Login(email, password) {
        const dataJson = {
            email: email,
            password: password
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', dataJson);
            return response.data; // Return the response data instead of the entire response object
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return error.response.data; // Return the error response data
            }
            // Handle other errors if needed
            // console.error('Error fetching students:', error);
        }
    }
}

export default SessionEndpoint;
/*
const result = await SessionEndpoint.Login('Ricardo', '1234');
console.log(result);
*/
/*
const result = await SessionEndpoint.Register('test4', 'tes4@asdf.cd', '1234');
console.log(result);
*/