const baseURL = import.meta.env.VITE_BASE_URL;

export const getTodos = async () => {
  try {
    const response = await fetch(`${baseURL}/todos`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTodo = async (text) => {
  try {
    const response = await fetch(`${baseURL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (task) => {
  try {
    const response = await fetch(`${baseURL}/todos/${task.id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (task) => {
  try {
    const response = await fetch(`${baseURL}/todos/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({isDone: !task.isDone})
    });
    console.log(response);
  } catch (error) {
    throw new Error(error);
  }
};
