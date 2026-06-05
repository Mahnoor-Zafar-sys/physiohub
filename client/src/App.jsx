// import Home from "./pages/Home";

// export default function App() {
//   return <Home />;
// }







// import { useState } from "react";
// import Home from "./pages/Home";
// // import About from "./pages/About";
// import SplashScreen from "./SplashScreen";

// export default function App() {
//   const [splashDone, setSplashDone] = useState(false);
//   const [currentPage, setCurrentPage] = useState("home");

//   if (!splashDone) {
//     return <SplashScreen onComplete={() => setSplashDone(true)} />;
//   }

//   return currentPage === "about"
//     ? <About onNavigate={setCurrentPage} />
//     : <Home onNavigate={setCurrentPage} />;
// }


// import { useState } from "react";
// import Home from "./pages/Home";
// // import About from "./pages/About";
// import OnlineConsultation from "./components/OnlineConsultation"; // ◄ Path yahan change kiya hai
// import SplashScreen from "./SplashScreen";

// export default function App() {
//   const [splashDone, setSplashDone] = useState(false);
//   const [currentPage, setCurrentPage] = useState("home");

//   if (!splashDone) {
//     return <SplashScreen onComplete={() => setSplashDone(true)} />;
//   }

//   // State-based Conditional Rendering Switch
//   switch (currentPage) {
//     case "online-consultation":
//       return <OnlineConsultation onNavigate={setCurrentPage} />;
//     case "about":
//       // return <About onNavigate={setCurrentPage} />;
//       return <Home onNavigate={setCurrentPage} />; 
//     case "home":
//     default:
//       return <Home onNavigate={setCurrentPage} />;
//   }
// }



import { useState } from "react";
import Home from "./pages/Home";
import AboutPremium from "./pages/About"; 
import OnlineConsultation from "./components/OnlineConsultation"; 
import SplashScreen from "./SplashScreen";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  if (!splashDone) {
    return <SplashScreen onComplete={() => setSplashDone(true)} />;
  }

  // Pure Conditional Rendering - No overlapping possible
  if (currentPage === "about") {
    return <AboutPremium onNavigate={setCurrentPage} />;
  }

  if (currentPage === "online-consultation") {
    return <OnlineConsultation onNavigate={setCurrentPage} />;
  }

  return <Home onNavigate={setCurrentPage} />;
}




















// import { useState } from "react";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import SplashScreen from "./SplashScreen";

// export default function App() {
//   const [splashDone, setSplashDone] = useState(false);

//   return splashDone
//     ? <Home />
//     : <SplashScreen onComplete={() => setSplashDone(true)} />;
// }