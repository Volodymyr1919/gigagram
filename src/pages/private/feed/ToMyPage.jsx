// import * as React               from "react";
// import Avatar                   from "@mui/material/Avatar";
// import { useState, useEffect }  from "react";

// export default function ToMyPage() {
//   const [me, setMe] = useState("");

//   useEffect(() => {
//     function getMe() {
//       fetch("http://65.109.13.139:9191/me", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": localStorage.getItem("token"),
//         },
//       })
//         .then((data) => {
//           return data.json();
//         })
//         .then((data) => {
//           setMe(data);
//         });
//     }
//     getMe();
//   }, []);

//     return(
//         <>
//             <Avatar
//               className="me__avatar"
//               src={me.avatar}
//               alt="my avatar"
//               sx={{ width: 90, height: 90 }}
//             />
//             <p className="me__username">{me.username}</p>
//         </>
//     );
// }