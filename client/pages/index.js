import React from 'react';
import Router from 'next/router'
import Head from 'next/head'
import axios from 'axios';
import { Cookies } from 'react-cookie';

const serverUrl = process.env.SERVER_API_URL;

// set up cookies
const cookies = new Cookies();
class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password: ''
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(serverUrl + '/api/login', 
                                        {email: this.state.email,
                                        password: this.state.password})

      const token = response.data.token;
      cookies.set('token', token);
      Router.push('/questionaire')
    } catch (error) {
      console.log(error)
      alert('Wrong email or password !');
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="Login">
        <Head>
          <title>Hirerobin - Welcome back</title>
        </Head>
        <form onSubmit={this.onSubmit}>
        <h1>Welcome back</h1>

        <div className="EmailField">
          <input type="email" name="email" placeholder="Enter email"
            value={this.state.email} onChange={this.handleInputChange}
            required/>
        </div>

        <br></br>

        <div className="PasswordField">
          <input type="password" name="password" placeholder="Enter password"
            value={this.state.password} onChange={this.handleInputChange}
            required/>
        </div>

        <br></br>
        <br></br>
        <button type="submit" value="Submit">Login</button>
        </form>

        <style jsx>{`
        .Login {
          padding: 60px 0;
          text-align: center;
        }
        .Login form {
          margin: 0 auto;
          max-width: 320px;
        }
        .Login button {
          background-color: #24A0ED;
          border: none;
          color: white;
          padding: 12px 38px;
          text-align: center;
          font-size: 16px;
          margin: 4px 2px;
          opacity: 0.6;
          transition: 0.3s;
          display: inline-block;
          text-decoration: none;
          cursor: pointer;
        }

        .Login button:hover {opacity: 1}
      `}</style>
      </div >
    )
  }
}

export default Index;