import React, { useState } from "react";

import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [isError, setIsError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      console.log("no username or age");
      return setIsError({
        title: "Input Errors",
        message: "Please input your username and age",
      });
    }
    if (+enteredAge < 0) {
      return setIsError({
        title: "Input Errors",
        message: "Please input your age (age>0)",
      });
    }

    console.log(enteredUsername, enteredAge);
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setIsError(null);
  };

  return (
    <div>
      {isError && (
        <ErrorModal
          title={isError.title}
          message={isError.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            value={enteredUsername}
            onChange={usernameChangeHandler}
            id="username"
            type="string"
          ></input>
          <label htmlFor="age">Age(year)</label>
          <input
            value={enteredAge}
            onChange={ageChangeHandler}
            id="age"
            type="number"
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
