"use client";

// ./src/app/page.js

import {  useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: "user", message: inputValue }]);
    sendMessage(inputValue)
    setInputValue("");
  };

const sendMessage = (message) =>{
  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Content-type': 'application/json',
    "Authorization": "Bearer #APII"
  };
  const data= {
    model: "gpt-4",
    messages:[ {"role": "user", "content" : message} ]
  };
  setIsLoading(true);


  axios.post(url, data, { headers: headers }).then((response) =>{
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content}])
    setIsLoading(false)
  }).catch((error) =>{
    setIsLoading(false);
    console.log(error);
  })

}

  return (
    <>
    
     <h1 className="text-center py-3 text-4xl"> <FontAwesomeIcon icon={faMessage}/> CHAT-BOT</h1>
     <div className="bg-[url('T:\React\chatbot\chatbotai\src\chatbot.jpg')]">
     <div className="container mx-auto shadow-lg  w-[500px] h-[100px] ">
      <div className="flex flex-col bg-gray-300">
       
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
          {
          chatLog.map((message, index) => (
          <div key={index} className={`flex ${
            message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}>
            <div className={`${
              message.type === 'user' ? 'bg-black' : 'bg-gray-800'
            } rounded-lg p-4 text-white max-w-sm`}>
               {
                message.type === 'user' ? <h1>USER : </h1> : <h1>BOT : </h1>
               }
               
               {message.message}
            </div>
            </div>
        ))
            }
      </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex">  
        <input type="text" className="flex-growpy-3 px-6 w-[400px]
         text-lg rounded-2xl border border-gray-200 text-gray-600
         placeholder:text-gray-400 focus:outline-none bg-white-600/100 shadow-md" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-black rounded-2xl ml-3 px-4 py-2 text-white font-semibold focus:outline-none hover:bg-gray-600 transition-colors duration-300">Send</button>
            </div>
           
        </form>
        </div>
    </div>
     </div>
    </>
  );
};

export default Home;
