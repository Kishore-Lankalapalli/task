import { Component } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

const zero = (func) => (func ? func(0) : 0);

const one = (func) => (func ? func(1) : 1);
const two = (func) => (func ? func(2) : 2);
const three = (func) => (func ? func(3) : 3);
const four = (func) => (func ? func(4) : 4);
const five = (func) => (func ? func(5) : 5);
const six = (func) => (func ? func(6) : 6);
const seven = (func) => (func ? func(7) : 7);
const eight = (func) => (func ? func(8) : 8);
const nine = (func) => (func ? func(9) : 9);

const plus = (a, b) => a + b;
const minus = (a, b) => a - b;
const times = (a, b) => a * b;
const divided_by = (a, b) => Math.floor(a / b);
console.log(plus(2, 4));

function findValues(val) {
  switch (val) {
    case "zero":
      return zero();
      break;
    case "one":
      return one();
      break;
    case "two":
      return two();
      break;
    case "three":
      return three();
      break;
    case "four":
      return four();
      break;
    case "five":
      return five();
      break;
    case "six":
      return six();
      break;
    case "seven":
      return seven();
      break;
    case "eight":
      return eight();
      break;
    case "nine":
      return nine();
      break;
  }
}

function valuation(val1, val2, op) {
  switch (op) {
    case "plus":
      return plus(val1, val2);
      break;
    case "minus":
      return minus(val1, val2);
      break;
    case "multiply":
      return times(val1, val2);
      break;
    case "divide":
      return divided_by(val1, val2);
      break;
  }
}

class App extends Component {
  state = {
    username: "",
    role: "",
    activePage: "login",
    input1: "",
    input2: "",
    operation: "",
    signUpUserName: "",
    signUpUserRole: "",
  };

  onSubmitData = (e) => {
    e.preventDefault();

    const { username, role } = this.state;

    if (role === "master") {
      this.setState({ activePage: "master", username: "" });
    }
    if (role === "student") {
      this.setState({ activePage: "student", role: "" });
    }
  };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onChangeRole = (e) => {
    this.setState({ role: e.target.value });
  };

  onSubmitInputValues = (e) => {
    e.preventDefault();

    let { input1, input2, operation } = this.state;

    let savedActivities = JSON.parse(localStorage.getItem("activity"));

    if (savedActivities === null) {
      savedActivities = [];
    } else {
      savedActivities = savedActivities;
    }

    const activities = [];

    const val1 = findValues(input1);
    const val2 = findValues(input2);

    const result = valuation(val1, val2, operation);

    console.log(result);

    const newActivity = {
      input1,
      input2,
      operation,
      result,
      id: uuid(),
    };

    this.setState({
      input1: "",
      input2: "",
      operation: "",
    });

    const updatedActivitiesList = [...savedActivities, newActivity];

    localStorage.setItem("activity", JSON.stringify(updatedActivitiesList));
  };

  onChangeValue1 = (e) => {
    this.setState({ input1: e.target.value });
  };

  onChangeValue2 = (e) => {
    this.setState({ input2: e.target.value });
  };

  onChangeOperation = (e) => {
    this.setState({ operation: e.target.value });
  };

  onLogoutStudentPage = () => {
    this.setState({ activePage: "login" });
  };

  onSignUpNewUser = () => {
    this.setState({ activePage: "signup" });
  };

  onChangeNewUserName = (e) => {
    this.setState({ signUpUserName: e.target.value });
  };

  onChangeNewUserRole = (e) => {
    this.setState({ signUpUserRole: e.target.value });
  };

  onSubmitNewUserDetails = (event) => {
    event.preventDefault();
    console.log("submit form called");
    const { signUpUserName, signUpUserRole } = this.state;

    let usersList = JSON.parse(localStorage.getItem("user"));

    if (usersList === null) {
      usersList = [];
    } else {
      usersList = usersList;
    }

    const newUser = {
      id: uuid(),
      userName: signUpUserName,
      role: signUpUserRole,
    };

    const updatedUsersList = [...usersList, newUser];

    localStorage.setItem("user", JSON.stringify(updatedUsersList));
  };

  renderStudentView = () => {
    const { username } = this.state;

    let activitiesList = JSON.parse(localStorage.getItem("activity"));

    // const operationsList = activitiesList.map((item) =>
    //   item.input2(item.operation(item.input1()))
    // );

    return (
      <div>
        <h1>STUDENT</h1>
        <div className="student-activity-logout-container">
          <h1>Activities</h1>
          <button
            type="button"
            className="logout-button"
            onClick={this.onLogoutStudentPage}
          >
            Logout
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Value1</th>
              <th>Value2</th>
              <th>Operation</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {activitiesList.map((item) => (
              <tr>
                <td>{item.input1}</td>
                <td>{item.input2}</td>
                <td>{item.operation}</td>
                <td>{item.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  renderMasterView = () => {
    const {
      username,
      role,
      input1,
      input2,
      operation,
      activitiesList,
    } = this.state;

    return (
      <div className="master-container">
        <h1>MASTER </h1>

        <form
          onSubmit={this.onSubmitInputValues}
          className="master-input-form-container"
        >
          <div>
            <label htmlFor="value1">VALUE 1</label>
            <input
              onChange={this.onChangeValue1}
              id="value1"
              type="text"
              value={input1}
              className="value-input"
            />
          </div>

          <div>
            <label htmlFor="value2">VALUE 2</label>
            <input
              onChange={this.onChangeValue2}
              id="value2"
              type="text"
              value={input2}
              className="value-input"
            />
          </div>

          <div>
            <label htmlFor="operation">OPERATION</label>
            <input
              onChange={this.onChangeOperation}
              id="operation"
              type="text"
              value={operation}
              className="value-input"
            />
          </div>

          <button type="submit" className="execute-button">
            execute
          </button>
        </form>
        <button
          type="button"
          className="logout-button logout-master-button"
          onClick={this.onLogoutStudentPage}
        >
          Logout
        </button>

        <button onClick={() => this.setState({ activePage: "student" })}>
          activities done by student
        </button>
      </div>
    );
  };

  renderLoginView = () => {
    const { username, role } = this.state;

    return (
      <div className="task-executor-container">
        <h1>Task Executor</h1>
        <form onSubmit={this.onSubmitData} className="form-container">
          <input
            onChange={this.onChangeUsername}
            className="username-input"
            type="text"
            value={username}
            placeholder="  Enter your name "
          />
          <select
            onChange={this.onChangeRole}
            className="role-select-container"
          >
            <option selected value="" disabled>
              Select your role
            </option>

            <option value="master">Master</option>
            <option value="student">Student</option>
          </select>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="sign-up-container">
          <p>If you are not member sign up here? </p>
          <button
            onClick={this.onSignUpNewUser}
            type="button"
            className="sign-up-button"
          >
            Sign up
          </button>
        </div>
      </div>
    );
  };

  renderSignUpView = () => {
    const { signUpUserName, signUpUserRole } = this.state;

    return (
      <div className="sign-up-page-container">
        <h1>Welcome to the task executor Sign up here </h1>
        <form onSubmit={this.onSubmitNewUserDetails}>
          <div className="sign-up-input-container">
            <label htmlFor="name">Name</label>
            <input
              onChange={this.onChangeNewUserName}
              className="sign-up-name-input"
              type="text"
              value={signUpUserName}
              id="name"
            />
          </div>
          <div className="sign-up-input-container">
            <label htmlFor="role">Role ex. student or master</label>
            <input
              onChange={this.onChangeNewUserRole}
              value={signUpUserRole}
              className="sign-up-name-input"
              type="text"
              id="role"
            />
          </div>
          <button className="sign-up-page-submit-button" type="submit">
            Submit
          </button>
        </form>
        <button
          onClick={() => this.setState({ activePage: "login" })}
          className="back-button"
        >
          Back
        </button>
      </div>
    );
  };

  renderExecutorView = () => {
    const { username, role, activePage } = this.state;

    switch (activePage) {
      case "login":
        return this.renderLoginView();
      case "student":
        return this.renderStudentView();
      case "master":
        return this.renderMasterView();
      case "signup":
        return this.renderSignUpView();

      default:
        return null;
    }
  };

  render() {
    const { username, role, isStatus } = this.state;
    return this.renderExecutorView();
  }
}

export default App;
