import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignOnId, setAssignOnId] = useState(3);
  const [users, setUsers] = useState([
    {
      id: 3,
      createdAt: "2023-09-07T10:14:30.000Z",
      updatedAt: "2023-09-07T10:14:30.000Z",
      deletedAt: null,
      name: "Bob Johnson",
      email: "bob@example.com",
      myTasks: [
        // Task data...
      ],
    },
    // Other users...
  ]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "description") setDescription(value);
    else if (name === "assignOnId") setAssignOnId(Number(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      creatorId: 3, // if authentication exist will be set from there
      assignOnId,
      statusId: 1,
    };

    axios
      .post("http://localhost:3000/task", taskData)
      .then((response) => {
        console.log(response.data);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred. Please try again.");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user"); // Replace with your API endpoint
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <container>
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>Create a Task</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Assign On</label>
          <select name="assignOnId" value={assignOnId} onChange={handleChange}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </container>
  );
};

export default TaskForm;
