---
title: "Empower your application with Langchain, Langraph and Bedrock - Part 1: Exploring AI Tools"
author: Vinicios Neves
date: 2024-10-09
description: Learn how to integrate AI into your applications with LangChain, simplifying interactions with large language models (LLMs).
thumbnail: ./assets/thumbnail.jpg
tags: python, langchain, ai, javascript
cta_prefix: AI is reshaping the future of app development. Join us as we explore the tools that make integrating AI easier for developers.
---

*This article is one of a multi-part series, which covers the use of Langchain, Langraph, and Bedrock for working with LLMs. Here are the other parts in the series:*

1. Part 1: Exploring AI Tools 👈🏼 **You are here**
2. [Part 2: Managing Complex AI Interactions with LangGraph](/articles/empower-your-application-with-langchain-langraph-and-bedrock-part-2)
3. [Part 3: Leveraging Bedrock for Knowledge Base Management](/articles/empower-your-application-with-langchain-langraph-and-bedrock-part-3)

Hello there! 👋

By now, it’s pretty clear that adding AI to our systems is more of a “when” than an “if.” But it’s not just about slapping on some API calls and calling it done. There’s a lot more going on under the hood. In this article, I’m going to share how I, as a full stack dev, started weaving AI into my projects using tools like LangChain, LangGraph, and Bedrock.

We’ll get into the real challenges of working with large language models (LLMs), how to manage more complex workflows with multi-agent systems, and why tools like Retrieval-Augmented Generation (RAG) are key to pulling accurate answers from specific knowledge bases like documents or internal files. I’ll also walk you through practical examples in Python and JavaScript, showing you how to wrap AI interactions and manage data retrieval effectively.

So, if you’re ready to see how AI can level up your project—whether it’s for a simple chatbot or something more ambitious, like an app that suggests recipes based on what’s in your fridge—this article’s for you.

Grab a coffee, let’s dive in!

## Exploring the AI Landscape: Models, APIs, and Vendors

When I first started diving into AI, one thing quickly became clear: there are a wide range of models out there, both open and closed-source. Then you have the challenge of integrating them through various APIs, each with its own quirks and limitations. Not to mention the vast ecosystem of packages designed to help you work with specific models or vendors.

It was during this search that I stumbled upon [**LangChain**](https://www.langchain.com/). For someone like me, coming from a full stack development background, LangChain stood out as a way to simplify working with large language models (LLMs) without needing to reinvent the wheel.

## LangChain: A Unified Approach to LLMs

LangChain is available in both [**JavaScript**](https://js.langchain.com/docs/introduction/) and [**Python**](https://python.langchain.com/v0.2/docs/introduction/), giving developers flexibility depending on their preferred stack. However, it’s important to note that while both versions provide robust functionality, there’s some difference in **feature parity**. Python, having been deeply rooted in the AI research community, is often a step ahead in terms of available features. Its history in AI and machine learning frameworks, like TensorFlow and PyTorch, has positioned Python as the go-to language for many cutting-edge AI tools, and this applies to LangChain as well.

That said, **JavaScript** has been catching up quickly, thanks to a growing number of contributors in the community. Given the widespread use of JavaScript in web development, the momentum behind LangChain’s JavaScript version is strong. In some cases, it may even pull ahead as more developers build upon it, especially in areas that align with real-time web and serverless architecture needs.

For developers like us, who are always curious and eager to experiment with new tools, **LangChain** provides a way to easily tinker with models and rapidly prototype solutions. Whether you’re working with **Node.js** in a web-heavy project or sticking with **Python** for more research-oriented tasks, LangChain abstracts much of the complexity involved in interacting with LLMs. It enables you to integrate AI into your existing systems without having to reinvent the wheel, making it a valuable tool no matter which language you’re using.

## Let’s Get Practical: A Simple Chat API with LangChain

Let me show you an example of how easy it is to use LangChain to encapsulate a simple chat interaction, with no history or complex state to manage, using FastAPI in Python and Express in Node.js.

### Python (FastAPI + LangChain)

```py
from fastapi import FastAPI
from pedantic import BaseModel
from langchain_openai import OpenAI

app = FastAPI()

class ChatRequest(BaseModel):
    prompt: str

llm = OpenAI(model="text-davinci-003", api_key="your-openai-api-key")

@app.post("/chat")
async def chat(request: ChatRequest):
    response = llm.invoke(request.prompt)
    return {"response": response}
```

With just a few lines, you have a basic FastAPI server that takes in a prompt, sends it to the LLM (in this case, OpenAI’s GPT-3), and returns the response.

### JavaScript (Express + LangChain.js)

```javascript
const express = require('express');
const { OpenAI } = require('langchain');

const app = express();
app.use(express.json());

const llm = new OpenAI({ modelName: 'text-davinci-003', apiKey: 'your-openai-api-key' });

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  const response = await llm.invoke(prompt);
  res.json({ response });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In the JavaScript example using Express, we achieve the same result by taking a prompt, sending it to OpenAI’s LLM, and returning the response—this time using LangChain.js. Here, we are specifically using the *text-davinci-003* model, which is a well-known **GPT-3** variant developed by OpenAI.

> **text-davinci-003** is one of the most advanced GPT-3 models available in OpenAI’s suite of language models. It’s part of the GPT-3 family but is tuned to provide higher-quality and more detailed responses compared to earlier versions like text-curie or text-babbage. With its advanced capabilities, it excels at understanding complex instructions, handling nuanced tasks, and generating more coherent and contextually aware output.

## Conclusion: Why LangChain?

What’s great about LangChain is how it simplifies the interaction with LLMs across different languages. Whether you’re a Python enthusiast or love working with JavaScript, LangChain handles all the complex communication with the LLM, leaving you to focus on building the rest of your app.

If you’re a fullstack developer, you don’t need to go deep into the internals of AI models to start leveraging their power. LangChain wraps all of that for you, allowing you to integrate AI as just another tool in your development arsenal.

That’s how I started adding AI to my projects. It wasn’t about becoming an AI expert, but about expanding my toolset as a fullstack developer. Whether it’s FastAPI or Express, LangChain makes adding AI simpler and more approachable.

## Ready for more?

In the next part, we’re diving deeper into AI workflows with **LangGraph**. You’ll learn how to manage complex multi-agent systems and take your AI interactions to the next level.

[Check out Part 2: Managing Complex AI Interactions with LangGraph](/articles/empower-your-application-with-langchain-langraph-and-bedrock-part-2)