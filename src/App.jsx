import { useCallback, useEffect, useRef, useState } from "react"


function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [specialChars, setSpecialChars] = useState(false)
  const [password, setPassword] = useState("")

  //to copy the password we use the useRef hook.
  const passwordRef = useRef(null)



  //to use useCallback uncomment this code and the "passwordGenerator() callback in the useEffect block."
  // const passwordGenerator = useCallback(() => {
  //   let pass = ""
  //   let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  //   //check the condition for numbers to be included
  //   if(numAllowed) str += "0123456789"
  //   if(specialChars) str += "!@#$%^&*()_+-=[]{}|;:',.<>/?"

  //   //acces the elements on randomly generated indexes
  //   for(let i = 0; i < length; i++) {
  //     const char = Math.floor(Math.random()*str.length+1)
  //     pass += str.charAt(char)
  //   }

  //   setPassword(pass)

  // }, [length, numAllowed, specialChars, setPassword])


  //with only using useEffect
  
  const copyPasswordToClipboard = useCallback(() => {
    
    //alert("Password Copied TO Clipboard Successfully!")
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  },[password])
  
  useEffect(() => {

    //uncomment the below line to run the code with useCallback.
    // passwordGenerator()
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    //check the condition for numbers to be included
    if(numAllowed) str += "0123456789"
    if(specialChars) str += "!@#$%^&*()_+-=[]{}|;:',.<>/?"

    //acces the elements on randomly generated indexes
    for(let i = 0; i < length; i++) {
      const char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, specialChars, setPassword])

  return (
    <>  
      <div className="w-full max-w-md px-4 py-3 mx-auto my-8 text-center text-orange-500 align-middle bg-gray-700 rounded-lg shadow-md mt-50%">
        <h1 className="my-3 font-extrabold text-center text-white font-stretch-95%">Password Generator</h1>
        <div className="flex mb-4 overflow-hidden rounded-lg shadow">
          <input 
          type="text"
          value={password}
          className="w-full px-3 py-1 bg-white outline-none"
          placeholder="Password"
          readOnly
          ref={passwordRef}
           />
           <button
           className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:cursor-pointer hover:bg-blue-300 transition-colors"
           onClick={copyPasswordToClipboard()}
           >Copy</button>
        </div>

        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1">
            <input 
            type="range"
            min={8}
            max={32}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
             type="checkbox"
             defaultChecked={numAllowed}
             className="ml-2"
             id="numInput"
             onChange={ () => {
              setNumAllowed((prevCondition) => !prevCondition);
             }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
             type="checkbox"
             defaultChecked={specialChars}
             className="ml-2"
             id="numInput"
             onChange={ () => {
              setSpecialChars((prevCondition) => !prevCondition);
             }}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>   
    </>
  )
}

export default App
