// import Home from "./pages/Home";

// export default function App() {
//   return <Home />;
// }

import { useState } from "react";
import Home from "./pages/Home";
import SplashScreen from "./SplashScreen";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return splashDone
    ? <Home />
    : <SplashScreen onComplete={() => setSplashDone(true)} />;
}