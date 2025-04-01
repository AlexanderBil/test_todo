import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  deleteDoc,
  doc,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/Auth';

interface Task {
  id: string;
  done: boolean;
  text: string;
}

const MyList = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { user } = useAuth();

  const getUserTasks = async (): Promise<Task[]> => {
    try {
      const q = query(collection(db, 'tasks'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Task)
      );
    } catch (error) {
      console.error('Error getting user tasks:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    if (user) {
      const userTasks = await getUserTasks();
      setTasks(userTasks);
    }
  };

  const handleDeleteTask = async (taskId: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      loadTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  const addTask = async (task: Omit<Task, 'id'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), task);
      return docRef.id;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && newTaskTitle.trim()) {
      const newTask: Omit<Task, 'id'> = {
        text: newTaskTitle,
        done: false,
      };
      await addTask(newTask);
      setNewTaskTitle('');
      loadTasks();
    }
  };

  const handleToggleComplete = (task: Task) => {};

  return (
    <div>
      <h2 className="text-3xl font-bold underline" >MyTasks</h2>
      <div style={{ marginBottom: '20px' }}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title"
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
      {tasks?.map((task) => (
        <li style={{ listStyle: 'none' }} key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => handleToggleComplete(task)}
          />
          {task.text}
          <button onClick={() => handleDeleteTask(task.id!)}>Delete</button>
        </li>
      ))}
    </div>
  );
};

export default MyList;
