import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

const Table = () => {
  const [data, setData] = useState({
    name: "Bob Johnson",
    email: "bob@example.com",
    myTasks: [
      {
        title: "bank masr",
        id: "1",
        description: "active",
        status: {
          name: "todo",
        },
      },
      {
        title: "bank cairo",
        id: "2",
        description: "inactive",
        status: {
          name: "todo",
        },
      },
      {
        title: "bank cib",
        id: "3",
        description: "active",
        status: {
          name: "todo",
        },
      },
      {
        title: "bank cib",
        id: "4",
        description: "active",
        status: {
          name: "todo",
        },
      },
      {
        title: "bank cib",
        id: "5",
        description: "active",
        status: {
          name: "todo",
        },
      },
      {
        title: "bank cib",
        id: "6",
        description: "active",
        status: "123456",
      },
      {
        title: "bank cib",
        id: "9",
        description: "active",
        status: {
          name: "todo",
        },
      },
      {
        title: "bank cib",
        id: "10",
        description: "active",
        status: {
          name: "todo",
        },
      },
      {
        title: "bank cib",
        id: "11",
        description: "active",
        status: {
          name: "todo",
        },
      },
    ],
  });

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

  const [selectedTask, setSelectedTask] = useState(null);
  const [taskHistory, setTaskHistory] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [assignOnId, setAssignOnId] = useState(3);
  const [error, setError] = useState(null); // State variable for error message

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/3"); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.get("http://localhost:3000/user"); // Replace with your API endpoint
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = (task) => {
    setSelectedTask(task);
  };

  const handelShowHistory = (task) => {
    setTaskHistory(task);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTask || !newStatus) {
      return;
    }

    try {
      console.log(newStatus);
      const updatedTask = {
        ...selectedTask,
        statusId: +newStatus,
        assignOnId: +assignOnId,
        updaterId: 3,
      };
      console.log(updatedTask);
      delete updatedTask["taskHistory"];
      await axios.patch(
        `http://localhost:3000/task/${updatedTask.id}`,
        updatedTask
      );
      fetchData();
      setSelectedTask(null);
      setNewStatus("");
      setError(null); // Clear any previous errors
    } catch (error) {
      console.log(error);
      setError("invalid update task transaction"); // Set the error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "status") setNewStatus(value);
    else if (name === "assignOnId") setAssignOnId(Number(value));
  };

  return (
    <div className="table-container">
      <h1>{`Welcome ${data.name}! This is your tasks List`}</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>status</th>
            <th>history</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {data.myTasks.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td style={{ color: item.status.color }}>{item.status.name}</td>
              <td>
                <button onClick={() => handelShowHistory(item.taskHistory)}>
                  show task history
                </button>
              </td>
              <td>
                <button onClick={() => handleUpdateTask(item)}>
                  Update your task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Update Task Form */}
      {selectedTask && (
        <div className={`update-task-form ${selectedTask ? "show" : ""}`}>
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Render error message */}
          <form onSubmit={handleSubmit} className="form" onClick={() => {}}>
            <button className="exit" onClick={() => setSelectedTask(null)}>
              close
            </button>
            <h2>Update Task: {selectedTask.title}</h2>

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
      )}
      {taskHistory && (
        <div>
          <h1>Details of task history</h1>
          <table className="data-table">
            <thead>
              <tr>
                <th>title</th>
                <th>description</th>
                <th>status</th>
                <th>assignOnId</th>
                <th>updaterId</th>
              </tr>
            </thead>
            <tbody>
              {taskHistory.map((history) => (
                <tr key={history.id}>
                  <td>{history.title}</td>
                  <td>{history.description}</td>
                  <td style={{ color: history.statusId.color }}>{history.statusId.name}</td>
                  <td>{history.assignOnId}</td>
                  <td>{history.updaterId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
