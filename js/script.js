const questions = [
  {
    question: "After a busy week, what helps you recharge?",
    answers: [
      { text: "Spending time with friends or meeting new people", type: "social" },
      { text: "Quiet time on my own, doing something I love", type: "reflective" },
      { text: "A mix of social time and quiet time", type: "balanced" }
    ]
  },
  {
    question: "When you have a big decision to make, you usually…",
    answers: [
      { text: "Trust my feelings and what matters to me", type: "empathetic" },
      { text: "Compare the facts and think it through", type: "analytical" },
      { text: "Consider both logic and how people may feel", type: "balanced" }
    ]
  },
  {
    question: "Which sounds more like your ideal day?",
    answers: [
      { text: "A plan full of new places and spontaneous moments", type: "adventurous" },
      { text: "A comfortable routine with time for my interests", type: "steady" },
      { text: "A loose plan with room for surprises", type: "balanced" }
    ]
  },
  {
    question: "When a problem appears, your first instinct is to…",
    answers: [
      { text: "Come up with fresh ideas and possibilities", type: "creative" },
      { text: "Break it into steps and find a practical solution", type: "analytical" },
      { text: "Talk it out and get another perspective", type: "empathetic" }
    ]
  },
  {
    question: "In a group, you are often the person who…",
    answers: [
      { text: "Starts conversations and brings energy", type: "social" },
      { text: "Listens carefully and notices the little things", type: "reflective" },
      { text: "Helps everyone feel included", type: "empathetic" }
    ]
  },
  {
    question: "What motivates you most right now?",
    answers: [
      { text: "Learning something new and exploring possibilities", type: "creative" },
      { text: "Building skills and reaching clear goals", type: "steady" },
      { text: "Understanding myself and the people around me", type: "reflective" }
    ]
  }
];

const profiles = {
  social: {
    title: "The Spark",
    description: "You may feel energized by connection, shared experiences, and the excitement of exchanging ideas. Your warmth can help bring people together—while quiet moments can help you recharge, too.",
    traits: ["Connection", "Enthusiasm", "Expression"]
  },
  reflective: {
    title: "The Deep Thinker",
    description: "You may enjoy taking time to process ideas, notice details, and understand what matters to you. Your thoughtful perspective is valuable, and sharing it at your own pace can be a strength.",
    traits: ["Reflection", "Insight", "Independence"]
  },
  balanced: {
    title: "The Flexible Explorer",
    description: "You may adapt to different settings, enjoying connection at some times and space at others. You can make room for different perspectives and find a rhythm that suits the moment.",
    traits: ["Adaptability", "Balance", "Open-mindedness"]
  },
  empathetic: {
    title: "The Heart-Reader",
    description: "You may pay close attention to feelings, relationships, and what people need. Your consideration can make others feel understood; remember that your own needs deserve care, too.",
    traits: ["Empathy", "Care", "Understanding"]
  },
  analytical: {
    title: "The Thoughtful Solver",
    description: "You may like to understand how things work, weigh information, and find clear solutions. Your careful approach can be helpful, especially when you leave a little room for uncertainty and creativity.",
    traits: ["Reasoning", "Curiosity", "Clarity"]
  },
  adventurous: {
    title: "The Possibility Seeker",
    description: "You may enjoy change, new experiences, and seeing where curiosity leads. Your willingness to explore can open new doors, while a little planning can help turn ideas into experiences.",
    traits: ["Adventure", "Curiosity", "Openness"]
  },
  steady: {
    title: "The Grounded Builder",
    description: "You may feel comfortable when you can build steadily toward something meaningful. Your patience and follow-through can help you make progress, even when the steps are small.",
    traits: ["Consistency", "Patience", "Purpose"]
  },
  creative: {
    title: "The Imagination Weaver",
    description: "You may enjoy imagining alternatives, connecting ideas, and looking at situations from a fresh angle. Your creativity can help you see possibilities others might miss.",
    traits: ["Imagination", "Originality", "Possibility"]
  }
};

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);

const questionCount = document.getElementById("questionCount");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const backButton = document.getElementById("backButton");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const resultTraits = document.getElementById("resultTraits");

function renderQuestion() {
  const item = questions[currentQuestion];
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  questionCount.textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;
  progressText.textContent = `${progress}%`;
  progressBar.style.width = `${progress}%`;
  questionText.textContent = item.question;
  backButton.disabled = currentQuestion === 0;
  answersContainer.innerHTML = "";

  item.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.textContent = answer.text;
    button.type = "button";
    if (selectedAnswers[currentQuestion] === answer.type) button.classList.add("selected");
    button.addEventListener("click", () => {
      selectedAnswers[currentQuestion] = answer.type;
      if (currentQuestion < questions.length - 1) {
        currentQuestion += 1;
        renderQuestion();
      } else {
        showResults();
      }
    });
    answersContainer.appendChild(button);
  });
}

function showResults() {
  const counts = {};
  selectedAnswers.forEach((type) => {
    if (type) counts[type] = (counts[type] || 0) + 1;
  });
  const winner = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || "balanced";
  const profile = profiles[winner];
  resultTitle.textContent = profile.title;
  resultDescription.textContent = profile.description;
  resultTraits.innerHTML = "";
  profile.traits.forEach((trait) => {
    const chip = document.createElement("span");
    chip.textContent = trait;
    resultTraits.appendChild(chip);
  });
  document.getElementById("resultsCard").scrollIntoView({ behavior: "smooth", block: "center" });
}

backButton.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    renderQuestion();
  }
});

document.getElementById("retakeButton").addEventListener("click", () => {
  currentQuestion = 0;
  selectedAnswers = Array(questions.length).fill(null);
  resultTitle.textContent = "Your results are waiting.";
  resultDescription.textContent = "Complete the short quiz above to see a friendly snapshot based on your answers.";
  resultTraits.innerHTML = "<span>Self-awareness</span><span>Curiosity</span><span>Growth</span>";
  renderQuestion();
  document.getElementById("test").scrollIntoView({ behavior: "smooth" });
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

renderQuestion();
