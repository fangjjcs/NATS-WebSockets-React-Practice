import './App.css';
import { connect, StringCodec } from "../node_modules/nats.ws/lib/src/mod.js";
import { useEffect, useState } from 'react';
import Messages from './components/Messages';

function App() {

  const sc = StringCodec();
  const [ nc, setConnection ] = useState(null);
  const [ error, setError ] = useState("");
  const [ messages, setMessages ] = useState([]);
  const [ natsMsg, setNatsMsg] = useState(null);
  let key = 0;
  
  const addMessage = (err ,msg) => {
    key++;
    const { subject, reply } = msg;
    const data = sc.decode(msg.data);
    const newMsg = {subject, reply, data, key, time: new Date().toUTCString()};
    setNatsMsg(newMsg);
  }
  
  useEffect( () => {
    if(nc === null) {
      console.log("connecting...")
      connect({servers:['ws://127.0.0.1:9090/'], waitOnFirstConnect: true})
      .then( (nc) => {
        setConnection(nc);
        nc.subscribe(">", { callback: addMessage})
      })
      .catch( (err) => {
        setError("Connection Error");
        console.error(err);
      })
    }
  },[])

  useEffect( () => {
    let isUpdate = false;
    if(natsMsg) {
      const updatedMessages = messages.map( msg => {
        if(msg.subject === natsMsg.subject) {
          isUpdate = true;
          return natsMsg
        } else {
          return msg
        }
      })
      if(isUpdate){
        setMessages(updatedMessages)
      } else {
        setMessages(messages => [...messages, natsMsg]);
      }
    }
  }, [natsMsg])

  return (
    <div className="App">
      <header className="App-header">
          <p>NATS Websocket and React Practice</p>
          <div className={`conn-state ${error?"conn-state-err": null}`}>{nc ? "Connected Successfully" : "Not Yet Connected"}</div>
          {error && <p className="conn-state-err">{error}</p>}
          {messages.length>0 && <Messages messages={messages}/>}
      </header>
    </div>
  );
}

export default App;
