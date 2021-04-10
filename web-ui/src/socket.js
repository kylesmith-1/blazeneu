import {Socket} from "phoenix";

function sock() {

let socket = new Socket(
        "ws://localhost:4000/socket",
        { params: { token: "" } }
);
      
socket.connect();
let channel = socket.channel("example", {})
channel.join()
  .receive("ok", resp => { console.log("Joined to Example Channel!!", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

channel.push('example:broadcast', {message:"Hello Phoenix!"})

channel.on("example:alert", msg => {
    alert(msg["yes"])
   })

return (<h6>tbd</h6>);
}
export default sock;