import React from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const RuleScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2 style={{fontSize:60}}><Typewriter words={["📖 Game Rules"]} typeSpeed={100} /></h2>
  
      <ol style={{ textAlign: "left", display: "inline-block", fontSize: "17px" }}>
        <li>
          <Typewriter words={["Aim at targets"]} typeSpeed={100} />
        </li>
        <li>
          <Typewriter words={["Each target has a point"]} typeSpeed={100} />
        </li>
        <li>
          <Typewriter words={["Click to shoot"]} typeSpeed={100} />
        </li>
        <li>
          <Typewriter words={["Score as many points as you can in 1 minute!"]} typeSpeed={100} />
        </li>
      </ol>
      <h3 style={{ fontSize: "40px" }}>
        <Typewriter words={["🎯 Target Points:"]} typeSpeed={100} />
      </h3>

      <ol style={{ textAlign: "left", display: "block", fontSize: "17px", listStyle: "decimal" }}>
        <li>
          <Typewriter words={["🐻 Bear Doll - 50 pts"]} typeSpeed={100} />
        </li>
        <li>
          <Typewriter words={["🎈 Yo-yo - 10 pts"]} typeSpeed={100} />
        </li>
        <li>
          <Typewriter words={["🍬 Candy - 5 pts"]} typeSpeed={100} />
        </li>
        <li>
          <Typewriter words={["🍟 Chips - 20 pts"]} typeSpeed={100} />
        </li>
        <li>
          <Typewriter words={["❓ Mystery Box - 0~40 pts"]} typeSpeed={100} />
        </li>
        <li>
          <Typewriter words={["☕ Coffee - 30 pts"]} typeSpeed={100} />
        </li>
      </ol>

      <button onClick={() => navigate("/")}>← Back to Home</button>
    </div>
  );
};

export default RuleScreen;
