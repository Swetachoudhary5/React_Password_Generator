import React, { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { uppercaseChars, lowercaseChars, numberChars, specialChars } from './Characters';
import 'react-toastify/dist/ReactToastify.css';
import { COPY_SUCESS } from './message';

import './App.css';


function App() {
  const [passsword, setPassword] = useState('');
  const [passswordLength, setPasswordLength] = useState(20);
  const [uppercaseletters, setuppercase] = useState(false)
  const [lowercaseletters, setlowercase] = useState(false)
  const [numbers, setnumbers] = useState(false)
  const [symbols, setsymbols] = useState(false)

  const handleGeneratePassword =(e) =>{

    if(!uppercaseletters && !lowercaseletters && !numbers && !symbols) {
      notify('You must select atleast one option',true)
    }
    let characterList = ''

    if(uppercaseletters){
      
      characterList = characterList + uppercaseChars
    }
    if(lowercaseletters){
      characterList = characterList + lowercaseChars
    }
    if(numbers){
      characterList = characterList + numberChars
    }
    if(symbols){
      characterList = characterList + specialChars
    }

    setPassword(createPassword(characterList));
  }
  const createPassword = (characterList) =>{
    let passsword =''
    const characterListLength = characterList.length

    for(let i=0; i < passswordLength; i++){
      const characterIndex = Math.floor(Math.random() * characterListLength);
      passsword = passsword + characterList.charAt(characterIndex)
    }
    return passsword
  }

  const copyToClipboard = () =>{
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = passsword
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }else{
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const handleCopyPassword = (e) =>{
    if(passsword === ''){
      notify('Nothing To Copy',true)
    }else{
      copyToClipboard()
      notify(COPY_SUCESS)
    }
  }


  return (
    <div className="App">
    <div className='container'>
      <div className='generator'>
         <h2 className='generator_header'>
          Password Generator
        </h2>
        <div className='genrator_password'>
          <h3>{passsword}</h3>
          <button onClick={handleCopyPassword} className='copy_btn'>
            <i className='far fa-clipboard'></i>
          </button>
        </div>
        <div className='form-group'>
          <label htmlFor='password-strength'>Password length</label>
          <input 
          defaultValue ={passswordLength}
          onChange={(e) => setPasswordLength(e.target.value)} 
          type='number' 
          id='password-strength'
          name='passsword-strength' 
          max={20} min={10}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='uppercase-letter'>UpperCase Letters</label>
          <input 
          checked={uppercaseletters} 
          onChange={(e) => setuppercase(e.target.checked)}
          type='checkbox' 
          id='uppercase' 
          name='uppercase' 
          max={20} min={10}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='lowercase'>LowerCase</label>
          <input 
          checked={lowercaseletters} 
          onChange={(e) => setlowercase(e.target.checked)}
          type='checkbox' 
          id='lowercase' 
          name='lowercase' 
          max={20} min={10}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='numbers'>Numbers</label>
          <input
          checked={numbers} 
          onChange={(e) => setnumbers(e.target.checked)} 
          type='checkbox' 
          id='numbers' 
          name='numbers' 
          max={20} min={10}></input>
        </div>
        <div className='form-group'>
          <label htmlFor='symbols'>Symbols</label>
          <input
          checked={symbols} 
          onChange={(e) => setsymbols(e.target.checked)} 
          type='checkbox' 
          id='symbols' 
          name='symbols' 
          max={20} min={10}></input>
        </div>
      </div>
  
      <button onClick={handleGeneratePassword} className='generator_btn'>
      Generate Password
      </button>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />

    </div>
      </div>
  );
}

export default App;
