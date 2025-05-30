
import {useState} from "react";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";


export default function Testing()
{
    const [file,setFile]=useState(null);

    function handleUplaod(){
        mediaUpload(file).then(
            (url)=>{
                console.log(url);
                toast.success("File uploaded successfully")
            }
        ).catch(
            (error)=>{
                console.log(error);
                toast.error("File upload failed")
            }
        )

    }
    return(
<div className="w-full h-screen flex flex-col justify-center items-center">
    <input
    type="file"
    onChange={
        (e)=>{
            setFile(e.target.files[0]);
        }
    }
    />
    <button
    onClick={handleUplaod}
    className="bg-gray-700 text-white p-2 rounded-lg">Upload</button>
    </div>

    );
    
}


// following are the previous code
/* 
export default function Testing(){
    const[number,setNumber]=useState(0)
    const[status,setStatus]=useState("Pending")


function increment(){
    let newValue=number+1;
    setNumber(newValue)
    //number=number+1;
    //console.log(number);
}

function decrement(){
     let newValue=number-1;
    setNumber(newValue)
    //number=number-1;
    //console.log(number);
}
  return(
    <div className="w-full h-screen flex flex-col justify-center items-center">

        <span className="text-3xl font-bold">{number}</span>
        <div className="w-full flex justify-center items-center">
            <button onClick={increment} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">+</button>
            <button onClick={decrement} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">-</button>

        </div>
        
        <span className="text-3xl font-bold">{status}</span>
        <div className="w-full flex justify-center items-center">
            <button onClick={()=>{
                setStatus("Passed")}} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">Pass</button>
            <button onClick={()=>
                {setStatus("Failed")}} className="bg-blue-500 text-white p-2 rounded-lg w-[60px] cursor-pointer">Fail</button>

        </div>
    </div>

    
  )  
}
*/




