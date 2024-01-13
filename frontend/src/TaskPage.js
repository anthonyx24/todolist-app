import { useEffect, useState } from "react";
import "./TaskPage.css"
import TopNav from './TopNav'; 
import { TbLetterXSmall } from "react-icons/tb";
import { useLocation } from 'react-router-dom';


const TaskPage = (props) => {
    const [userName, setUserName] = useState(null); 
    const [taskPopUp, setTaskPopUp] = useState(false); 
    const [TListPopUp ,setTListPopUp] = useState(false); 
    const [categoryPopUp, setCategoryPopUp] = useState(false); 
    const location = useLocation();
    const userData = location.state && location.state.userData;
    const [taskName, setTaskName] = useState('');
    const [listName, setListName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [newCategory, setNewCategory] = useState(''); 
    const [categories, setCategories] = useState([]);
    const [TList, setTList] = useState(
        [
            // //CATEGORY 1 EXAMPLE
            // [
            //     {
            //         listName: "Cat 1", 
            //         tasks: 
            //         [
            //             {taskName: 'CSCI 270',taskDescription: 'HW 11', dueDate: '01/2023'}, 
            //             {taskName: 'CSCI 201',taskDescription: 'Final Project', dueDate: '08/2023'}
            //         ]
            //     },
            //     {
            //         listName: "Cat 1", 
            //         tasks: []

            //     }
            // ],
            // // CATEGORY 2 Example
            // [
            //     {listName: "", tasks: []}, //empty task list example
            //     {listName: "", tasks: []} //empty task list
            // ],
            // // CATEGORY 3
            // [
            //     {listName: "", tasks: []}, //empty task list example
            //     {listName: "", tasks: []} //empty task list
            // ],
            // // CATEGORY 4
            // [
            //     {listName: "", tasks: []}, //empty task list example
            //     {listName: "", tasks: []} //empty task list
            // ],
        ]
    ); 
    const [activeCategory, setActiveCategory] = useState(0); // THIS IS INDEX IN CATEGORIES ARRAY
    const [listAddIndex, setListAddIndex] = useState(); // for when a task has to be added, this is the list index of TList[activeCategory]'s taskList that it will be appended to 

    const reformatDate = (inputDate) => {
        const [year, month, day] = inputDate.split('-');
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    };

    
    const parseDueDate = (dateString) => {
        const parts = dateString.split('-');
        const dueYear = parseInt(parts[0]);
        const dueMonth = parseInt(parts[1]);
        const dueDay = parseInt(parts[2]);
    
        return { dueMonth, dueDay, dueYear };
      };

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handleCategoryNameChange = (e) => {
        setNewCategory(e.target.value); 
    }

    const handleListNameChange = (e) =>  {
        setListName(e.target.value); 
    }

    const closeTaskPopUp = () => {
        setTaskPopUp(false); 
        // Resetting input field values
        setTaskName('');
        setTaskDescription('');
        setDueDate('');
    }

    const openTaskPopUp = (TList_index) => {
        setListAddIndex(TList_index);
        setTaskPopUp(true); 

    }

    const openCategoryPopUp = () => {
        setCategoryPopUp(true); 
    }

    const closeCategoryPopUp = () => {
        setCategoryPopUp(false); 
        setNewCategory('');
    }

    const openTListPopUp = () => {
        setTListPopUp(true); 
    }

    const closeTListPopUp = () => {
        setTListPopUp(false); 
        setListName('');
    }

    const changeActiveCategory = (index) => {
        setActiveCategory(index); 
        
    }

    const handleAddNewCategory = async () => {
        let newCategories = [...categories]; 
        newCategories.push(newCategory); 
        setCategories(newCategories); 
        let newTList = [...TList]; 
        newTList.push([]); 
        setTList(newTList); 
        closeCategoryPopUp(); 
        console.log(newCategory); 
        const action = {
            action: "addCategory",
            action_data: {
                cname: newCategory,
            }
        };
        const response = await fetch('http://localhost:8080/todo-list-201/action', {
            method: 'POST',
            body: JSON.stringify(action),
        });

        try {
            const data = await response.text();
            console.log(data);
            console.log("Success, Category Added!");
        } catch (error) {
            console.error('Error parsing JSON or adding category:', error);
        }


    }

    const handleAddNewTask = async () => {
        const { dueMonth, dueDay, dueYear } = parseDueDate(dueDate);
        // Gather the values from the input fields
        const newTask = {
          taskName: taskName,
          taskDescription: taskDescription,
          dueDay: dueDay,
          dueMonth: dueMonth,
          dueYear: dueYear,
        };
    
    
        // add task
        console.log('New Task:', newTask);
        const newState = [...TList]
        newState[activeCategory][listAddIndex].tasks.push(newTask);
        setTList(newState);
        closeTaskPopUp(); 

        const action = {
            action: "addTask",
            action_data: {
                tname: taskName,
                tdescription: taskDescription,
                tdate: reformatDate(dueDate),
                lID: listAddIndex,                 // Replace with your actual list ID
                cID: activeCategory            // Replace with your actual category ID
            }
        };
      
        const response = await fetch('http://localhost:8080/todo-list-201/action', {
            method: 'POST',
            body: JSON.stringify(action),
        });

        try {
            const data = await response.text();
            console.log(data);
            console.log("Success, Task Added!");
        } catch (error) {
            console.error('Error parsing JSON or adding task:', error);
        }
    

        // add new task fetch request here!
        
      };

    const removeTaskItem = async (TList_Index, task_index) => {
        const newTask = {
            name: taskName,
            description: taskDescription,
            dueDate: dueDate,
        };
      
      
          // remove task
        console.log('New Task:', newTask);
        const newState = [...TList]
        newState[activeCategory][TList_Index].tasks.splice(task_index, 1);
        setTList(newState);

        //remove task fetch request here!
        const action = {
            action: "removeTask",
            action_data: {
              tID: task_index,
              lID: TList_Index,
              cID: activeCategory,
            },
        };
        const response = await fetch('http://localhost:8080/todo-list-201/action', {
            method: 'POST',
            body: JSON.stringify(action),
        });

        try {
            const data = await response.text();
            console.log(data);
            console.log("Success, task removed!");
        } catch (error) {
            console.error('Error parsing JSON or removing task:', error);
        }
    }



    const handleAddNewList = async () => {
        let newTList = [...TList]; 
        newTList[activeCategory].push({
            listName: listName, 
            tasks: []
        })
        closeTListPopUp(); 
        const action = {
            action: "addTList",
            action_data: {
                lname: listName,     
                cID: activeCategory,                      
            },
        };
        const response = await fetch('http://localhost:8080/todo-list-201/action', {
            method: 'POST',
            body: JSON.stringify(action),
        });

        try {
            const data = await response.text();
            console.log(data);
            console.log("Success, TList Added!");
        } catch (error) {
            console.error('Error parsing JSON or adding TList:', error);
        }
    }

  

    useEffect(() => {
    
        if (userData) {
            try {
                // Extract categoryNames
                console.log(JSON.stringify(userData));
                const categoryNames = userData.categories.map(category => category.categoryName);
                setCategories(categoryNames);
            
                // Extract TLists
                const tLists =[];
                userData.categories.forEach((category) => {
                    tLists.push(category.tlists);
                })
                setTList(tLists);
                setUserName(userData.fname + " " + userData.lname);
                } 
            catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
       
    
        // Now you can use userData in your useEffect
       
      }, [userData]);



    return (
    <div id ="Taskpage">
        {taskPopUp && 
        <div className="popUp">
            <div className="popUpContainer">
                <div className="headerTaskContainerPopup">
                    <div> <h2>+ Add New Task</h2></div>
                    <div><button className="removeTaskBtn" onClick= {() => {closeTaskPopUp()}}><TbLetterXSmall className="custom-icon-style" ></TbLetterXSmall></button></div>
                </div>
                
                <label htmlFor="taskName">Task Name:</label>
                <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={handleTaskNameChange}
                required
                />
                <label htmlFor="taskDescription">Task Description:</label>
                <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={handleTaskDescriptionChange}
                placeholder="Enter your description here!"
                required
                />
                
                <label htmlFor="dueDate">Due Date:</label>
                <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={handleDueDateChange}
                required
                />
                <button className="confirmAddNewTask" onClick={handleAddNewTask}>+ Add New Task</button>
            </div>
        </div>
        }
        {categoryPopUp && 
        <div className="popUp">
            <div className="popUpContainer">
                <div className="headerTaskContainerPopup">
                    <div> <h2>+ Add Category</h2></div>
                    <div><button className="removeTaskBtn" onClick= {() => {closeCategoryPopUp()}}><TbLetterXSmall className="custom-icon-style" ></TbLetterXSmall></button></div>
                </div>
                
                <label htmlFor="newCategory">Category Name:</label>
                <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={handleCategoryNameChange}
                required
                />
                <button className="confirmAddNewTask" onClick={handleAddNewCategory}>+ Add New Category</button>
            </div>
        </div>
        }
        {TListPopUp && 
        <div className="popUp">
            <div className="popUpContainer">
                <div className="headerTaskContainerPopup">
                    <div> <h2>+ Add New List</h2></div>
                    <div><button className="removeTaskBtn" onClick= {() => {closeTListPopUp()}}><TbLetterXSmall className="custom-icon-style" ></TbLetterXSmall></button></div>
                </div>
                
                <label htmlFor="listName">New List Name:</label>
                <input
                type="text"
                id="listName"
                value={listName}
                onChange={handleListNameChange}
                required
                />
                <button className="confirmAddNewList" onClick={handleAddNewList}>+ Add New List</button>
            </div>
        </div>
        }
        <TopNav userData={userData} />
        <div id="MainContainer">
            <div id = "leftSide">
                {userName && <h1>Welcome, <br></br>{userName}</h1>}
                <div className="categoriesContainer">
                    {categories && categories.map((category, index) => (
                        <button key={index} className="categoryBtn" onClick={() => changeActiveCategory(index)}>
                        {category}
                        </button>
                    ))}
                </div>
                <button className="addNewCatBtn" onClick={openCategoryPopUp}>+ Add New Category</button>
                {/* <button className="addNewListBtn" onClick={openTListPopUp}>+ Add New List</button> */}
            </div>
            <div id="verticalWhiteBar"></div>
            <div id="rightSide">
                {/* <button className="addNewListBtn" onClick={openTListPopUp}>+ Add New List</button> */}
                {TList && TList.length > 0 && TList[activeCategory] && TList[activeCategory].map((T_List, index1) => (
                    <div key={index1} className="taskContainer">
                        {/* <p className="activeCategoryDisplay">{categories[activeCategory]}</p> */}
                        <div className="headerTaskContainer">
                            <div style={{flexDirection: 'column'}}>
                                <p className="activeCategoryDisplay">{categories[activeCategory]}</p>
                                <h2 style={{margin:'0px'}}>{T_List.listName}</h2>
                            </div>
                            <button className="addTask" onClick={() => {openTaskPopUp(index1)}}>+ Add New Task</button>
                        </div>
                        {T_List.tasks.map((task, index2) => (
                        <div className="taskBox">
                            <div className="topHeading">
                            <p className="dueDate">{task.dueMonth}/{task.dueDay}/{task.dueYear}</p>          
                            <button className="removeTaskBtn" onClick={() => removeTaskItem(index1, index2)}><TbLetterXSmall className="custom-icon-style" ></TbLetterXSmall></button>
                            </div>
                            <div style={{display:'flex'}}>
                            <input className="checkbox" type="checkbox"></input>
                            <p className="taskname">{task.taskName}</p>
                            </div>
                            <p className="taskDescription">{task.taskDescription}</p>
                            {/* <input className="checkbox" type="checkbox"></input> */}
                        </div>))
                        }
                    </div>
                ))}
                <button className="addNewListBtn" onClick={openTListPopUp}>+ Add New List</button>
            </div>
        </div>
    </div>
    );
}
 
export default TaskPage;
