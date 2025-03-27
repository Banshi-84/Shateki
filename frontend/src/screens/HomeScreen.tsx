import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: "url('/assets/carnival.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "90vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <h1 style={{ color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.7)"}}>
      <Typewriter
          words={["Shateki Game"]}
          typeSpeed={100}
          cursor
        />
      </h1>
      <motion.button onClick={() => navigate("/game")} 
      style={{
          margin: "10px",
          padding: "10px 20px",
          fontSize: "18px",
          backgroundColor: "#ff4500",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        animate={{
          scale: [1, 1.2, 1], 
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}>
        Play
      </motion.button>
      <button onClick={() => navigate("/record")} style={{ margin: "10px" }}>
        Record
      </button>
      <button onClick={() => navigate("/rule")} style={{ margin: "10px" }}>
        Rule
      </button>
    </div>
  );
};

export default HomeScreen;
