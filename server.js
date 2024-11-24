const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3080 });

let clients = [];
let currentQuestionIndex = 0;

const questionsPool = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: "Paris",
  },
  {
    question: "Who won the Ballon d'Or 2024?",
    choices: ["Kylian Mbappé", "Rodri", "Harry Kane", "Vinicius Júnior"],
    answer: "Rodri",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "What is 5 + 7?",
    choices: ["10", "11", "12", "13"],
    answer: "12",
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["Shakespeare", "Dickens", "Hemingway", "Orwell"],
    answer: "Shakespeare",
  },

  {
    question: "Which player has won the most Ballon d'Or awards?",
    choices: ["Michel Platini", "Cristiano Ronaldo", "Lionel Messi", "Johan Cruyff"],
    answer: "Lionel Messi",
  },
  {
    question: "Which team won the FIFA World Cup in 2018?",
    choices: ["Croatia", "France", "Brazil", "Germany"],
    answer: "France",
  },
  {
    question: "Who is the all-time top scorer in the Champions League?",
    choices: ["Robert Lewandowski", "Lionel Messi", "Cristiano Ronaldo", "Karim Benzema"],
    answer: "Cristiano Ronaldo",
  },
  {
    question: "Which club is nicknamed 'The Reds'?",
    choices: ["Liverpool", "Manchester United", "Arsenal", "Chelsea"],
    answer: "Liverpool",
  },
  {
    question: "In which year was the first FIFA World Cup held?",
    choices: ["1970", "1950", "1966", "1930"],
    answer: "1930",
  },
  {
    question: "Which language is primarily used for client-side web development?",
    choices: ["Ruby", "Python", "C++", "JavaScrip"],
    answer: "JavaScript",
  },
  {
    question: "Which programming language is often used for Artificial Intelligence?",
    choices: ["PHP", "Java", "Python", "C#"],
    answer: "Python",
  },
  {
    question: "Which programming language was created by James Gosling in 1995?",
    choices: ["Swift", "C#", "Ruby", "Java"],
    answer: "Java",
  },
  {
    question: "Which programming language is commonly used to create iOS apps?",
    choices: ["Kotlin", "Swift", "C++", "Java"],
    answer: "Swift",
  },
  {
    question: "Which language is used with the React framework?",
    choices: ["JavaScript", "PHP", "Python", "Ruby"],
    answer: "JavaScript",
  },
    

];

// Function to send all questions to clients
function sendAllQuestions() {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: "allQuestions",
        questions: questionsPool,
      }));
    }
  });
}

wss.on("connection", (ws) => {
  console.log("New client connected.");
  clients.push(ws);

  // Send all questions to the client upon connection
  sendAllQuestions();

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "submitAnswer") {
      console.log(`Answer received: ${data.answer}`);
      // Handle answer submission logic here
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected.");
    clients = clients.filter((client) => client !== ws);
  });
});

console.log("WebSocket server running on ws://localhost:3080");
