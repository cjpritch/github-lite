// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_USER, QUERY_ME } from '../utils/queries';

// // returns a user's contact info: fullname and email
// const Contact = () => {
//   const { username: userParam } = useParams();
//   const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
//     variables: { username: userParam, fullname: userParam },
//   });
//   const user = data?.me || data?.user || {};

//   return (
//     <div class="border col-sm-3">
//       <div>
//         <div class="card mb-3">
//           <p class="card-header">Meet the Developer:</p>
//           <div class="card-body">
//             <p class="mb-0">
//               <p>{user.fullname}</p>
//             </p>
//             <p class="mb-0">
//               <p>{user.email}</p>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
