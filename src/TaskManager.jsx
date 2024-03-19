import React, { useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import './TaskManager.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleAddTask = () => {
    if (!title.trim() || !details.trim()) return;
    const newTask = { title, details };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDetails('');
  };

  const handleEditTask = (index) => {
    setEditingIndex(index);
    setTitle(tasks[index].title);
    setDetails(tasks[index].details);
  };

  const handleSaveTask = () => {
    if (!title.trim() || !details.trim()) return;
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = { title, details };
    setTasks(updatedTasks);
    setTitle('');
    setDetails('');
    setEditingIndex(null);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <Container>
      <h1 className="mt-4">Task Manager</h1>
      <Button variant="primary" className="mt-4 mb-4" onClick={handleAddTask}>
        Add Task
      </Button>
      {tasks.map((task, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title>{editingIndex === index ? <Form.Control type="text" value={title} onChange={handleTitleChange} /> : task.title}</Card.Title>
              <div>
                {editingIndex === index ? (
                  <Button variant="success" onClick={handleSaveTask}>
                    Save
                  </Button>
                ) : (
                  <Button variant="outline-primary" className="edit-btn" onClick={() => handleEditTask(index)}>
                    Edit
                  </Button>
                )}
                <Button variant="outline-danger" onClick={() => handleDeleteTask(index)} className="delete-btn">
                  Delete
                </Button>
              </div>
            </div>
            <Card.Text>{editingIndex === index ? <Form.Control as="textarea" rows={3} value={details} onChange={handleDetailsChange} /> : task.details}</Card.Text>
          </Card.Body>
        </Card>
      ))}

      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={handleTitleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Details</Form.Label>
          <Form.Control as="textarea" rows={3} value={details} onChange={handleDetailsChange} />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default TaskManager;
