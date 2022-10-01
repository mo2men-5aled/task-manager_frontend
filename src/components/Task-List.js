import React, { useState, useEffect, useRef } from "react";
import http from "../api/connection";
import { Link } from "react-router-dom";
import AddTask from "./AddTask";
import { Popup } from "semantic-ui-react";

const deleteTask = (id) => {
  http.delete("/" + id);
};

const mark = (task) => {
  if (task.completed) {
    return <i className="check icon" />;
  }
};

const GetAll = () => {
  const [tasks, setTasks] = useState([]);
  const taskNameRef = useRef();

  useEffect(() => {
    const fetchList = async () => {
      const response = await http.get();
      setTasks(response.data.tasks);
      console.log(tasks);
    };
    fetchList();
  }, [tasks]);

  return (
    <div>
      <AddTask />
      {tasks.map((task) => {
        let popupname = <span>{task.name}</span>;
        taskNameRef.current = task.description ? (
          <Popup
            position="right center"
            content={`${task.description}`}
            trigger={popupname}
          />
        ) : (
          popupname
        );

        return (
          <div className="ui segment">
            <div className="content">
              <div className="header">
                <span>{mark(task)}</span>
                {taskNameRef.current}

                <div style={{ textAlign: "end" }}>
                  <Link
                    to={`/`}
                    className="ui basic blue button"
                    onClick={() => {
                      deleteTask(task._id);
                    }}
                  >
                    Delete
                  </Link>
                  <Link className="ui basic black button" to={"/" + task._id}>
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GetAll;
