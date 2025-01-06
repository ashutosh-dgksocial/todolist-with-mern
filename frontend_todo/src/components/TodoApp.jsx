import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBack2Line } from "react-icons/ri";

const TodoList = () => {
    const [inputData, setInputData] = useState("");
    const [value, setValue] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [customIndex, setCustomIndex] = useState(null);

    useEffect(() => {
        // console.log(Array.isArray(value), "this was the array : ", value);
        // console.log("itemIndex;", itemIndex);
        // console.log("your index::", customIndex);
    }, []);

    const handleOnchange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputData.trim() === "") return;

        if (isEdit) {
            const updatedValue = value.map((item, index) => index === customIndex ? inputData : item)
            setValue(updatedValue);
            setInputData("")
            setIsEdit(false)
        }
        // this is for normal submit i separate using If else this was written first place
        else {
            setValue((prev) => [...prev, inputData]);
            setInputData("");
        }
    };

    const handleEdit = (index) => {
        setCustomIndex(index);
        const foundItem = value[index]; // this is console the the key not the value not the index
        setInputData(foundItem);
        setIsEdit(true);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white text-center mb-4">
                Todo List
            </h2>
            <form
                onSubmit={handleSubmit}
                className="flex mb-4"
            >
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
                    {isEdit ? "Update" : "Add"}
                </button>
            </form>

            <h3 className="text-lg font-semibold text-white">Your Tasks:</h3>
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
                                    {index + 1}. {data}
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
