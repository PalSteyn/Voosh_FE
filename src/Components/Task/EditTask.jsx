// components/EditTaskModal.jsx
import React, { useState } from "react";
import styles from "./TasksView.module.css";
import { updateTask } from "../../services/taskService";

const EditTask = ({
  task = {
    id: "task-1",
    title: "Task 1",
    description: "Description 1",
    date: "01/09/2021, 05:30:00",
  },
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleSave = async (taskId) => {
    // fetch userId from cookies

    let userId;
    if (title && description) {
      const updatedTask = { ...task, title, description };

      try {
        const res = await updateTask(userId, taskId, updatedTask);

        console.log("Task updated successfully:", res);

        setTitle("");
        setDescription("");
      } catch (err) {
        console.error("Failed to update task:", err);
      }
    } else {
      alert("Please fill in both title and description");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Task</h2>
        <label htmlFor="title" className={styles.label}>
          Title:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="description" className={styles.label}>
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />

        <div className={styles.buttons}>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
