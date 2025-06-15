// import React from 'react';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import Homepage from './Components/HomePage';

// const App = () => {
//     return (
//         <div>
//             <Login />
//             <Signup />
//             <Homepage />
//             {}

//         </div>
//     );
// };

//  export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './Components/Login';
// import Signup from './Components/Signup';
// import HomePage from './Components/HomePage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Signup" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
  // import Login from './Components/Login';
  // import Signup from './Components/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} /> */}
    </Routes>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './Components/Login';
// import Signup from './Components/Signup'; 
// import HomePage from './Components/HomePage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;