import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBack2Line } from "react-icons/ri";
import axios from "axios";

const TodoList = () => {
  const [inputData, setInputData] = useState("");
  const [value, setValue] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const API_URL = "http://localhost:5000/api/todos"; // Backend API URL

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(API_URL);
        setValue(response.data); // Set value with response data
      } catch (err) {
        console.log("got some err", err.message);
      }
    };
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.trim() === "") return;

    if (isEdit) {
      try {
        const response = await axios.put(`${API_URL}/${value[editingIndex]._id}`, {
          task: inputData,
        });
        // const updatedTodos = [...value];
        // updatedTodos[editingIndex] = response.data;
        setValue((prev) => prev.map((data, index) => index === editingIndex ? response.data : data));
                                                   
        // let new = []
        
        setInputData("");
        setIsEdit(false);

        //  const updatedArr = value.map((item, index) => item[editingIndex]? = input : item);

      } catch (error) {
        console.log(error.message, "---", error);
      }
    } else {
      try {
        const response = await axios.post(API_URL, {
          task: inputData,
          completed: true,
        });
        // console.log(response.data);
        setValue([...value, response.data]);
        setInputData("");
      } catch (error) {
        console.log(error.message, "---", error);
      }
    }
  };

  const handleOnchange = (e) => {
    setInputData(e.target.value);
  };

  const handleEdit = (itemIndex) => {
    setEditingIndex(itemIndex);
    setInputData(value[itemIndex].task);
    // console.log("potato", value[itemIndex].task);
    setIsEdit(true);
  };

  const handleDelete = async (itemIndex) => {
    try {
      const response = axios.delete(`${API_URL}/${value[itemIndex]._id}`);
      // console.log(response.message);

      const filteredData = value.filter((_, index) => {
        return index !== itemIndex;
      });
      setValue(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Todo List
      </h2>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          placeholder="Enter your task"
          onChange={handleOnchange}
          value={inputData}
          className="flex-grow p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="ml-4 bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </form>

      <h3 className="text-lg font-semibold text-white">Read:</h3>
      {value.length === 0 ? (
        <p className="text-green-400 upper text-sm">
          No tasks available. Todo clean!
        </p>
      ) : (
        <ul className="list-none">
          {value.map((data, index) => {
            return (
              <li
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-600 line-clamp-1 text-nowrap "
              >
                <span className="text-white">
                  {index + 1}. {data.task}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-green-400 hover:text-green-500 mr-2"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-400 hover:text-red-500"
                  >
                    <RiDeleteBack2Line />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
