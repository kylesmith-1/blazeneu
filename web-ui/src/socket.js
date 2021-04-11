import {Socket} from "phoenix";

let socket = new Socket(
    "/socket",
    { params: { token: "" } }
);


let state = {
    numEntries: 0,
};

let callback = null;

// The server sent us a new state.
function state_update(st) {
  state = st;
  if (callback) {
    callback(st);
  }
}

export function ch_join(cb) {
    callback = cb;
    callback(state);
}

      
socket.connect();
let channel = socket.channel("num_entries", {})
channel.join()
  .receive("ok", resp => { console.log("Joined to Num Entries Channel!!", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.push('num_entries:broadcast', {message:"Initiating"})

let num = 0;

channel.on("num_entries:alert", msg => {
    state_update({numEntries: msg["numEntries"]})
   })
