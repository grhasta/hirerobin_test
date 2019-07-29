import React from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { handleAuthSSR } from '../utils/auth.js';

const serverUrl = process.env.SERVER_API_URL;

// set up cookies
const cookies = new Cookies();

class Questionaire extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rate: '',
      capacity: '',
      origin: '',
      contribution: 5,
      skill: '',
      key_strength: '',
      reviewed: "5d3c3f1720f3ea11e67ff9e0",
      offer: false
    }
    // console.log(this.props)
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const feedback_params = {
      rate: this.state.rate,
      capacity: this.state.capacity,
      origin: this.state.origin,
      contribution: parseInt(this.state.contribution),
      skill: this.state.skill,
      key_strength: this.state.key_strength,
      reviewer: this.state.reviewer,
      reviewed_id: this.state.reviewed,
      offer: this.state.offer
    }
    console.log(this.props.parsed_cookie.token)
    try {
      const config = {
        withCredentials: true
      }
      const response = await axios.post(serverUrl + '/api/feedback', feedback_params, config)

      Router.push('/success')
    } catch (error) {
      console.log(error)
      alert('There is some error !');
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
      <div>
        <form onSubmit={this.onSubmit}>

          <h2>Robin</h2>
          <h3>Thank you for your time to provide feedback on Ardy Satria</h3>
          <br></br>
          <p> Reference for ardy satria </p>
          <p> Questionaire </p>
          <p> 1. Compared to the peer group how will you rate ardy satria </p>

          <div className="RateField" required>
            {this.props.rate_list.map(rate => (
              <p><input type="radio"
                name="rate"
                value={rate._id}
                checked={this.state.rate === rate._id}
                onChange={this.handleInputChange}
                required>
              </input> {rate.name}</p>
            ))}
          </div>

          <p> 2. In what capacity have you known ardy satria mostly </p>

          <div className="CapacityField">
            <p><input type="radio" name="capacity" value="supervisor"
              checked={this.state.capacity === "supervisor"} onChange={this.handleInputChange} required></input> Supervisor</p>
            <p><input type="radio" name="capacity" value="peer"
              checked={this.state.capacity === "peer"} onChange={this.handleInputChange}></input> Peer</p>
            <p><input type="radio" name="capacity" value="stakeholder"
              checked={this.state.capacity === "stakeholder"} onChange={this.handleInputChange}></input> Stakeholder</p>
            <p><input type="radio" name="capacity" value="reportee"
              checked={this.state.capacity === "reportee"} onChange={this.handleInputChange}></input> Reportee</p>
            <p><input type="radio" name="capacity" value="others"
              checked={this.state.capacity === "others"} onChange={this.handleInputChange}></input> Others </p>
          </div>

          <p> 3. Which organisation or institution do you know ardy satria from?</p>

          <div className="Origin">
            <input type="textfield"
              name="origin"
              value={this.state.origin}
              onChange={this.handleInputChange}
              required></input>
          </div>

          <p> 4. Please indicate your opinion by moving the dial to the left or to the right </p>

          <div className="Contribution">
            <label htmlFor="contribution" className="pull-left">Individual Contributor    </label>
            <input type="range" 
              name="contribution" min="0" max="10" 
              value={this.state.contribution} 
              onChange={this.handleInputChange} 
              required></input>
            <label htmlFor="contribution" className="pull-right">   Work Best in Team</label>
          </div>

          <p> 5. What technical skills is ardy satria strong in? </p>

          <div className="SkillField">
            {this.props.skill_list.map(skill => (
              <p><input type="radio"
                name="skill"
                value={skill._id}
                checked={this.state.skill === skill._id}
                onChange={this.handleInputChange}
                required>
              </input> {skill.name}</p>
            ))}
          </div>

          <p> 3. What in your opinion are the key strengths of ardy satria? Please take specific examples </p>

          <div className="KeyStrengthField">
            <textarea name="key_strength" rows="8" cols="85"
              value={this.state.key_strength}
              onChange={this.handleInputChange}
              required>
            </textarea>
          </div>

          <button>Click here to refer and earn SGD 1.000 cash</button>

          <p><input type="checkbox" name="offer"
            value="offer"
            onChange={e => this.setState(prevState => ({
              offer: !prevState.offer
            }))}>
          </input> I am looking for engineering talent and would like to find out more about hirerobin's offers</p>

          <p> *Only hirerobin will see your choice</p>

          <button type="submit" value="Submit">Submit reference</button>
        </form>
      </div>
    );
  }
}

// Server-Side Rendering
Questionaire.getInitialProps = async (ctx) => {
  // Must validate JWT
  // If the JWT is invalid it must redirect
  // back to the main page. You can do that
  // with Router from 'next/router
  await handleAuthSSR(ctx);

  const rate = await axios.get(serverUrl + '/api/rates');
  const skill = await axios.get(serverUrl + '/api/skills');

  // Must return an object
  return { rate_list: rate.data.data, skill_list: skill.data.data,
     parsed_cookie:ctx.req.headers.cookie}
}

export default Questionaire;