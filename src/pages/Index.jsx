import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditTodo = (todo) => {
    setEditTodo(todo);
    setEditText(todo.text);
  };

  const saveEditTodo = () => {
    setTodos(todos.map((todo) => (todo.id === editTodo.id ? { ...todo, text: editText } : todo)));
    setEditTodo(null);
    setEditText("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo"
            />
            <Button onClick={addTodo}>Add</Button>
          </div>
          <ScrollArea className="h-64">
            {todos.map((todo) => (
              <div key={todo.id} className="flex justify-between items-center mb-2">
                <span>{todo.text}</span>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => startEditTodo(todo)}>Edit</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Todo</DialogTitle>
                      </DialogHeader>
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Edit todo"
                      />
                      <Button onClick={saveEditTodo} className="mt-2">Save</Button>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="text-center">
          <span>Total Todos: {todos.length}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;