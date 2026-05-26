"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {

  // States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [tasks, setTasks] = useState([]);
  const [assignedEmail, setAssignedEmail] = useState("");

  const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*");

  if (error) {
    console.log(error);
    return;
  }

  setTasks(data);
};

useEffect(() => {
  fetchTasks();
}, []);



  // Create Task Function
  const handleCreateTask = async () => {

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title: title,
          description: description,
          due_date: dueDate,
          priority: priority,
          assigned_to: assignedEmail,
          status: "Pending",
        },
      ]);

    if (error) {
     console.log("FULL ERROR:", error);
     alert(error.message);
     return;
    }

    await fetch("http://127.0.0.1:5000/send-email", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({ 
    receiver_email: assignedEmail,

    subject: "New Task Created",

   body: `
You have been assigned a new task.

Title: ${title}

Description: ${description}

Due Date: ${dueDate}

Priority: ${priority}
`,
  }),
});
    alert("Task created successfully");
    fetchTasks();
    console.log(data);

    // Clear Fields
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
  };

  const handleCompleteTask = async (taskId, assignedEmail) => {

  const { error } = await supabase
    .from("tasks")
    .update({
      status: "Completed",
    })
    .eq("id", taskId);

  if (error) {
    console.log(error);
    return;
  }

  await fetch("http://127.0.0.1:5000/send-email", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      receiver_email: assignedEmail,

      subject: "Task Completed",

      body: "Your assigned task has been marked as completed.",
    }),
  });

  alert("Task marked as completed");

  fetchTasks();
};

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Task Dashboard
        </h1>

        <div className="space-y-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          {/* Description */}
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          {/* Due Date */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          {/* Priority */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border p-3 rounded-xl"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        {/* Assign Email */}
        <input
            type="email"
            placeholder="Assign To (Email)"
            value={assignedEmail}
            onChange={(e) => setAssignedEmail(e.target.value)}
            className="w-full border p-3 rounded-xl"
        />

          {/* Button */}
          <button
            onClick={handleCreateTask}
            className="w-full bg-slate-900 text-white p-3 rounded-xl"
          >
            Create Task
          </button>

        <div className="mt-8 space-y-4">
           {tasks.map((task) => (
          <div
            key={task.id}
           className="border border-slate-200 rounded-xl p-4 bg-white"
         >
         <h2 className="text-xl font-bold">{task.title}</h2>

         <p className="text-slate-600">
         {task.description}
         </p>

        <p className="text-sm text-slate-500">
        Due: {task.due_date}
        </p>

        <p className="text-sm font-medium">
          Priority: {task.priority}
        </p>

        <p className="text-sm font-semibold">
          Status: {task.status}
        </p>

        <button
          onClick={() => handleCompleteTask(task.id, task.assigned_to)}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
        Mark Complete
        </button>

      </div>
      ))}
      </div>

        </div>

      </div>

    </div>
  );
}