import React, { useEffect, useState } from "react";
import api from "./services";
import "./App.css";

function App() {
  const [goal, setGoal] = useState<string[][]>([]);

  useEffect(() => {
    api
      .get("map/ab71f6c0-60e0-44a2-80eb-6f91f84ebef6/goal")
      .then((response) => {
        setGoal(response.data.goal);
      });
  }, []);

  const sendPolyanet = (row: number, column: number) => {
    return api
      .post("polyanets", {
        candidateId: "ab71f6c0-60e0-44a2-80eb-6f91f84ebef6",
        row: row,
        column: column,
      })
      .then((response) => {
        console.log("SUCESSO");
      });
  };

  const sendSoloon = (row: number, column: number, text: string) => {
    const color = text.replace(/_SOLOON/g, "");
    return api
      .post("soloons", {
        candidateId: "ab71f6c0-60e0-44a2-80eb-6f91f84ebef6",
        row: row,
        column: column,
        color: color.toLowerCase(),
      })
      .then((response) => {
        console.log("SUCESSO");
      });
  };

  const sendCometh = (row: number, column: number, text: string) => {
    const direction = text.replace(/_COMETH/g, "");
    return api
      .post("comeths", {
        candidateId: "ab71f6c0-60e0-44a2-80eb-6f91f84ebef6",
        row: row,
        column: column,
        direction: direction.toLowerCase(),
      })
      .then((response) => {
        console.log("SUCESSO");
      });
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const mountMegaverse = async (i = 0, j = 0) => {
    if (i >= goal.length) return;
    let countMs = 250;
    const element = goal[i][j];
    switch (element) {
      case "POLYANET":
        await sendPolyanet(i, j);
        break;
      case "WHITE_SOLOON":
        await sendSoloon(i, j, element);
        break;
      case "BLUE_SOLOON":
        await sendSoloon(i, j, element);
        break;
      case "RED_SOLOON":
        await sendSoloon(i, j, element);
        break;
      case "PURPLE_SOLOON":
        await sendSoloon(i, j, element);
        break;
      case "UP_COMETH":
        await sendCometh(i, j, element);
        break;
      case "LEFT_COMETH":
        await sendCometh(i, j, element);
        break;
      case "RIGHT_COMETH":
        await sendCometh(i, j, element);
        break;
      case "DOWN_COMETH":
        await sendCometh(i, j, element);
        break;
      default:
        console.log(`LINHA: ${i} COLUNA: ${j}`);
        break;
    }

    j++;
    if (j >= goal[i].length) {
      i++;
      j = 0;
    }
    if (element !== "space") {
      await delay(countMs);
    }
    await mountMegaverse(i, j);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="h1-style">CROSSMINT CODING CHALLENGE</h1>
        <button 
          onClick={() => mountMegaverse()} 
          style={{
            border: '1px solid #000000',
            width: '400px',
            height: '70px',
            fontSize: '24px',
            borderRadius: '12px',
            cursor: 'pointer'
          }}
        >
          <span style={{
            color: '#000000'
          }}>Generete Megaverse</span>
        </button>
      </header>
    </div>
  );
}

export default App;
