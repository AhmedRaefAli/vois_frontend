import axios from "axios";
import React, { useState } from "react";

const UpdateTaskForm = ({ selectedTask, users }) => {
  const [newStatus, setNewStatus] = useState("");
  const [assignOnId, setAssignOnId] = useState(3);
  const [error, setError] = useState(null); // State variable for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "status") setNewStatus(value);
    else if (name === "assignOnId") setAssignOnId(Number(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTask || !newStatus) {
      return;
    }

    try {
      const updatedTask = {
        ...selectedTask,
        statusId: +newStatus,
        assignOnId: +assignOnId,
      };
      delete updatedTask["taskHistory"];
      await axios.patch(
        `http://localhost:3000/task/${updatedTask.id}`,
        updatedTask
      );
      setNewStatus("");
      setError(null); // Clear any previous errors
    } catch (error) {
      console.log(error);
      setError("invalid update task transaction"); // Set the error message
    }
  };

  return (
    <div className="update-task-form">
      <h2>Update Task: {selectedTask.title}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={selectedTask.status.id}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="1">Todo</option>
            <option value="2">In Progress</option>
            <option value="3">Blocked</option>
            <option value="4">InQA</option>
            <option value="5">Done</option>
            <option value="6">Deployed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Assign On</label>
          <select
            name="assignOnId"
            value={selectedTask.assignOnId}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
