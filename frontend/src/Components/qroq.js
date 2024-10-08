const Groq = require("groq-sdk");

const groq = new Groq({apiKey:"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"}); 

async function main() {
  const chatCompletion = await getGroqChatCompletion();
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama3-8b-8192",
  });
}

if (require.main === module) {
    main();
  }