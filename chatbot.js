//Define dataset variable
let dataset = {};
let testSentences = [];
let unansweredDataset = [];

// Load dataset from a JSON file
function loadDataset() {
  fetch("dataset.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load dataset. Network response was not ok.");
      }
      return response.json();
    })
    .then(data => {
      dataset = data;
      console.log("Dataset loaded successfully:", dataset);

      //function to calculate perplexity after loading the dataset
      calculatePerplexity();
    })
    .catch(error => {
      console.error("Failed to load dataset:", error);
    });
}

function saveDataset(file_path, data) {
  const json = JSON.stringify(data);
  const fs = require("fs"); 

  fs.writeFile(file_path, json, "utf8", (error) => {
    if (error) {
      console.error("Failed to save dataset:", error);
    } else {
      console.log("Dataset saved successfully.");
    }
  });
}

// function t0 rain the chatbot by adding a user query and response to the dataset
function trainChatbot(user_query, response) {
  dataset[user_query] = response;
}

// Generate a response based on user query
function generateResponse(user_query) {
  const alternativeResponses = [
    "Ombili, ashike katuna eyamukulo lyepulo ndika manga.",
    "Ombili, oshoka eyamukulo ka li po manga, uuyelele opo tawu kongwa",
    "Eyamukulo lyepulo lyoye katu li na manga ashike otwe li koneka, otatu kongo uuyelele kombinga yalyo.",
    "Uuyele mboka kandi wu na natango, ashike otandi vulu ndiku kwathele palwe.",
    "Gandja uuyele wagwana opo tu ku pe eyamukulo lyomondjila.",
    "Endulula mo ishewe mepulo lyoye"
  ];

  const lowercaseUserQuery = user_query.toLowerCase().replace(/[^a-z]/g, '');

  for (const query in dataset) {
    const lowercaseQuery = query.toLowerCase().replace(/[^a-z]/g, '');
    if (lowercaseQuery === lowercaseUserQuery) {
      return dataset[query];
    }
  }

  //function to save unanswered user query and response to the unanswered dataset
  unansweredDataset.push({ user_query, response });

  return alternativeResponses[Math.floor(Math.random() * alternativeResponses.length)];
}

// function to handle training by the user
function trainUserChatbot() {
  const user_query = prompt("Enter the user query:");
  const response = prompt("Enter the response:");

  if (user_query && response) {
    trainChatbot(user_query, response);
    console.log("Chatbot trained successfully!");
  } else {
    console.log("Invalid user query or response. Training aborted.");
  }
}

// Function to handle button click event
function submitQuery() {
  const user_query = entry.value.trim();

  if (user_query === "") {
    console.log("Empty user query. Please enter a valid query.");
    return;
  }

  const response = generateResponse(user_query);

  // Display the user query and response in the chat history
  chat_history.innerHTML += "User: " + user_query + "\n";
  chat_history.innerHTML += "Chatbot: " + response + "\n\n";

  // clear the input field
  entry.value = "";
}

// Getting elements from the DOM
const chat_history = document.getElementById("chat-history");
const entry = document.getElementById("entry");
const button = document.getElementById("button");
const train_button = document.getElementById("train-button");
const user_query = document.getElementById("user-query");
const response = document.getElementById("#response");


function calculatePerplexity() {
  let perplexitySum = 0;
  testSentences.forEach(sentence => {
    const tokenizedSentence = tokenizer.tokenize(sentence);
    const perplexity = languageModel.perplexity(tokenizedSentence);
    perplexitySum += perplexity;
  });

  const averagePerplexity = perplexitySum / testSentences.length;
  console.log('Perplexity:', averagePerplexity);
}


document.body.style.backgroundColor = "#0C8DD1";


loadDataset();

// Adding event listeners to the buttons
button.addEventListener("click", submitQuery);
train_button.addEventListener("click", trainUserChatbot);

function saveUnansweredDataset() {
  saveDataset("unanswered.json", unansweredDataset);}