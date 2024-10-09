---
title: "Empower your application with Langchain, Langraph and Bedrock - Part 2: Managing Complex AI Interactions with LangGraph"
author: Vinicios Neves
date: 2024-10-09
description: Discover how LangGraph enables multi-step and multi-agent workflows for more sophisticated AI applications.
thumbnail: ./assets/thumbnail.jpg
tags: python, langchain, langgraph, ai
cta_prefix: Take your AI interactions to the next level with LangGraph, a powerful tool for managing complex workflows in AI-driven apps.
---

## Table of Contents

1. [Empower your application with Langchain, Langraph and Bedrock - Part 1: Exploring AI Tools](/articles/empower-your-application-with-langchain-langraph-and-bedrock-part-1)
2. [Empower your application with Langchain, Langraph and Bedrock - Part 2: Managing Complex AI Interactions with LangGraph](/articles/empower-your-application-with-langchain-langraph-and-bedrock-part-2)
3. [Empower your application with Langchain, Langraph and Bedrock - Part 3: Leveraging Bedrock for Knowledge Base Management](/articles/empower-your-application-with-langchain-langraph-and-bedrock-part-3)

Now, let’s shift gears and talk about more complex scenarios—moving beyond basic chat interfaces. Imagine this: an app that offers you recipe suggestions based on a photo you take of your fridge or pantry. Seems futuristic, right? But this type of application is [already within reach](https://www.linkedin.com/posts/ustwo-_sproutiful-ustwoai-guthealth-activity-7239277625494405120-OJd1/), and it’s a great example of how we can push the boundaries of AI-driven experiences.

This isn’t just a simple Q\&A chatbot anymore. Here, we’re dealing with image recognition, context understanding, and potentially multiple steps in the interaction. The app needs to understand what’s in the photo, possibly ask follow-up questions to clarify details (Is that fresh basil or spinach? Are those eggs still good?), and ultimately provide a tailored recipe recommendation.


## Multi-Agent Systems and State Management

For these types of complex applications, it’s not enough to rely on a single interaction or basic state management. We need to handle multi-agent systems or more advanced state management strategies. In this case, the AI needs to be able to ask questions for clarification, follow up, and ensure it has the right information to make its suggestions.

For example:

**Step 1:** The user takes a photo of their fridge.  
**Step 2:** The AI agent analyses the image and identifies potential ingredients: “I see eggs, milk, cheese, and some herbs.”  
**Step 3:** The AI may not be 100% sure, so it asks a clarifying question: “Are those fresh or dried herbs? Can you confirm?”  
**Step 4:** Based on the answer, the AI refines its understanding and offers recipes that match the confirmed ingredients.

The interaction becomes more sophisticated, where the agent doesn’t just respond, but also seeks clarification when needed. This shift moves us from simple question-answer exchanges to a more dynamic, **multi-modal** interaction—one where the agent can process different types of input and adapt its responses accordingly.

For example, in a scenario where the AI is identifying ingredients from a photo of your fridge, it might not stop at merely describing what’s visible. If there’s ambiguity—like whether a green bunch is parsley or cilantro—the agent can ask follow-up questions or request more information. **o1** and similar models aim to push this even further by handling **multi-modal inputs**, meaning the agent isn’t restricted to text but can also interpret images, audio, and perhaps even video in real time.

With this, the AI moves from passive response generation to **active engagement**, clarifying uncertainties, refining its understanding, and even prompting the user to provide missing information. It’s no longer just a tool answering queries—it’s an intelligent system that collaborates with you to arrive at the most accurate and relevant response.

As these multimodal capabilities evolve, we can expect AI interactions to become more intuitive and contextually aware, significantly improving user experience, especially in complex tasks that involve a mix of visual and textual inputs.

### Scaling Complex Interactions with LangGraph

Handling these types of multi-step, multi-agent interactions can quickly become overwhelming if you’re trying to manage everything manually. This is where LangGraph comes into play. LangGraph provides powerful tools to manage not just the basic interactions, but the complex states, multiple agents, and intricate flows that are often necessary in more advanced applications.

**LangGraph** is essentially an extension of the LangChain concept, but built specifically for scenarios that require more control, more complexity, and better state management. It’s designed to handle interactions that go beyond simple text and can manage multiple models, agents, or even vendor switching in real-time.

### How LangGraph Helps with Complex Applications

When building applications like the recipe suggestion app, you’re not just relying on one single model to handle everything. You’re dealing with a stack of components:

* **Image recognition:** A model needs to process the photo, identify objects, and return a list of ingredients.  
* **Questioning and clarification:** The agent might need to ask follow-up questions to refine its understanding.  
* **Recipe generation:** Based on the confirmed ingredients, another model or system could be used to generate recipe suggestions.  
* **State management:** Throughout all of this, the system needs to keep track of what it already knows, what it’s uncertain about, and how the user’s responses refine the final outcome.

LangGraph helps with all of this by providing a structured way to manage these interactions. Instead of manually orchestrating every step, you can design a graph-based flow where different models and agents handle specific parts of the interaction.

**Example: Recipe App with LangGraph**

Here’s a simplified flow of how [LangGraph](https://blog.langchain.dev/langgraph-multi-agent-workflows/) could help manage such a complex interaction.

1. **User submits a photo:** The AI agent analyses the photo using an image recognition model (for example, Hugging Face’s Vision Transformer or a custom model).  
2. **Agent clarifies:** The agent may not be confident about certain items (e.g., “Is that parsley or cilantro?”) and can ask the user for confirmation using a multi-agent system.  
3. **Final confirmation:** Once the ingredients are clarified, the AI system generates a list of recipes using a language model like GPT-3 or a custom recipe database.  
4. **State management:** LangGraph ensures that throughout this multi-step process, all state information (such as confirmed ingredients, clarifications, etc.) is retained and used to refine future interactions.

This flow can be as complex as needed, and LangGraph ensures the system can handle it by managing states, transitions between agents, and orchestrating how models interact with each other.

Something like:

```python
from langchain_core.messages import BaseMessage, HumanMessage, ToolMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langgraph.graph import END, StateGraph, START
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import ToolNode

@tool
def image_recognition_tool(image_path: str):
    """Analyze the image and return identified ingredients."""
    # Simulating image recognition process
    ingredients = ["milk", "eggs", "herbs"]  # Replace with actual ML model logic
    return f"Identified ingredients: {', '.join(ingredients)}. FINAL ANSWER"

# Tool for clarification
@tool
def clarification_tool(ingredients: str):
    """Clarify uncertain items like herbs."""
    # Simulating a clarification process
    if "herbs" in ingredients:
        return "Is that fresh parsley or cilantro? Please clarify."
    return "No clarification needed. FINAL ANSWER"

# Tool for recipe generation (e.g., GPT-3)
@tool
def recipe_generation_tool(confirmed_ingredients: str):
    """Generate a recipe based on confirmed ingredients."""
    # Simulating recipe generation
    return f"Recipe generated for ingredients: {confirmed_ingredients}. FINAL ANSWER"

# Define the state to manage messages and sender
class AgentState(TypedDict):
    messages: Sequence[BaseMessage]
    sender: str

# Helper function to create agent nodes
def create_agent_node(agent, state, name):
    result = agent.invoke(state)
    if isinstance(result, ToolMessage):
        pass
    else:
        result = AIMessage(**result.dict(exclude={"type", "name"}), name=name)
    return {
        "messages": [result],
        "sender": name,
    }

# Initialize LLM (e.g., GPT-4) for agents
llm = ChatOpenAI(model="gpt-4")

# Create Agents for Image Recognition, Clarification, and Recipe Generation
def create_agent(llm, tools, system_message: str):
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are an AI assistant collaborating with other assistants. "
                "Your task is to process the image, clarify ingredients, and generate a recipe."
                " If your result is final, prefix it with 'FINAL ANSWER'."
                " Available tools: {tool_names}. {system_message}",
            ),
            MessagesPlaceholder(variable_name="messages"),
        ]
    )
    prompt = prompt.partial(system_message=system_message)
    prompt = prompt.partial(tool_names=", ".join([tool.name for tool in tools]))
    return prompt | llm.bind_tools(tools)

# Define agent nodes with their respective tools
image_recognition_agent = create_agent(llm, [image_recognition_tool], system_message="Analyze the photo to identify ingredients.")
clarification_agent = create_agent(llm, [clarification_tool], system_message="Ask for clarification if needed.")
recipe_agent = create_agent(llm, [recipe_generation_tool], system_message="Generate a recipe from the confirmed ingredients.")

image_recognition_node = functools.partial(create_agent_node, agent=image_recognition_agent, name="ImageRecognition")
clarification_node = functools.partial(create_agent_node, agent=clarification_agent, name="Clarification")
recipe_node = functools.partial(create_agent_node, agent=recipe_agent, name="RecipeGeneration")

# Define Tool Node for executing tools
tools = [image_recognition_tool, clarification_tool, recipe_generation_tool]
tool_node = ToolNode(tools)

# Define Edge Logic for transitioning between steps
def router(state):
    messages = state["messages"]
    last_message = messages[-1]
    if last_message.tool_calls:
        return "call_tool"
    if "FINAL ANSWER" in last_message.content:
        return END
    return "continue"

# Define the Graph Workflow
workflow = StateGraph(AgentState)
workflow.add_node("ImageRecognition", image_recognition_node)
workflow.add_node("Clarification", clarification_node)
workflow.add_node("RecipeGeneration", recipe_node)
workflow.add_node("call_tool", tool_node)

workflow.add_conditional_edges(
    "ImageRecognition", router, {"continue": "Clarification", "call_tool": "call_tool", END: END}
)
workflow.add_conditional_edges(
    "Clarification", router, {"continue": "RecipeGeneration", "call_tool": "call_tool", END: END}
)
workflow.add_conditional_edges(
    "RecipeGeneration", router, {"continue": "ImageRecognition", "call_tool": "call_tool", END: END}
)
workflow.add_conditional_edges(
    "call_tool", lambda x: x["sender"], {"ImageRecognition": "ImageRecognition", "Clarification": "Clarification", "RecipeGeneration": "RecipeGeneration"}
)
workflow.add_edge(START, "ImageRecognition")

# Compile the graph
graph = workflow.compile()

# Example invocation: User submits a photo of their fridge
events = graph.stream(
    {
        "messages": [
            HumanMessage(
                content="Here is a photo of my fridge. Can you suggest a recipe based on the ingredients?"
            )
        ],
    },
    {"recursion_limit": 150},
)

# Output the events (final recipe)
for event in events:
    print(event)
    print("----")
```

### Scaling These Applications

Scaling these kinds of applications can get tricky fast. Handling multiple agents, models, and states means there’s a lot of complexity under the hood. But that’s where LangGraph’s real power comes in. It provides:

* **Built-in support for multi-agent systems:** You can have different agents handling different parts of the interaction (e.g., one for image recognition, another for recipe suggestions).  
* **Advanced state management:** Keeping track of every interaction, follow-up question, and user input becomes easier with LangGraph’s structure.  
* **Vendor-agnostic capabilities:** LangGraph can work with multiple vendors, allowing you to switch between different image recognition models or recipe databases seamlessly.

LangGraph acts as the glue that binds all these pieces together, giving you the ability to scale complex applications without having to build and manage every component yourself.

### Bringing It All Together

Building more powerful applications with AI is more than just deploying a chatbot. Whether it’s offering personalised recipes based on a photo or handling any other multi-step, complex task, you need systems that can scale and manage complexity. LangGraph provides a way to structure and manage these applications, allowing you to focus on building features without getting bogged down in the technical details.

As a full stack dev, this means I can integrate more powerful AI-driven features into my projects without needing to worry about scaling the complexity. Whether it’s managing multiple agents, complex state, or switching vendors, LangGraph handles the hard parts, so I can focus on delivering value to the user.

## Not Just the Model: Controlling the Scope of AI with Knowledge Bases

There are many cases where we can’t rely solely on the general knowledge embedded within an AI model. Sometimes, we need the AI to generate responses based on a specific knowledge base—think company documentation, specific files, or other proprietary data. In these situations, we need to limit or augment the scope of the AI to ensure that its responses are accurate and grounded in the right context.

To achieve this, we can use LangChain to generate embeddings. If you’re new to the concept of embeddings, here’s what you need to know: embeddings are a way to represent text as numbers, or vectors, that can be processed by a machine. These vectors allow us to measure the semantic similarity between pieces of text. For example, two paragraphs that convey the same idea but use different words will still have similar embeddings, making it easier for the model to retrieve relevant information.

Once we generate these embeddings, we store them in a vector database, using tools like FAISS or PGVector. These databases allow us to perform fast and efficient searches based on similarity to the user’s query.

At this point, we can manually control the retrieval of relevant documents based on user input through a retriever, which will search the knowledge base for the most relevant pieces of information. Then, using a system like Retrieval-Augmented Generation (RAG), the AI can generate responses based on those documents. Something like this:

```py
from fastapi import FastAPI
from langchain.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langserve import add_routes
import uvicorn
import os
from langchain_community.document_loaders import CSVLoader
from langchain_text_splitters import CharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.globals import set_debug

load_dotenv()
set_debug(True)

openai_api_key = os.environ["LANGCHAIN_API_KEY"]

app = FastAPI(
    title="AI Assistant with FAISS",
    version="1.0",
    description="API Server that combines AI with a FAISS-based retriever."
)

model = ChatOpenAI(api_key=openai_api_key, temperature=0, streaming=True, model="gpt-4")

loader = CSVLoader("content.csv")
documents = loader.load()

text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(documents)

embeddings = OpenAIEmbeddings()

db = FAISS.from_documents(docs, embeddings)

retriever = db.as_retriever()

chain = ConversationalRetrievalChain.from_llm(model, retriever)

add_routes(
    app,
    chain,
    path="/chat" 
)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
```

In this code:

* We load documents, split them into smaller chunks, and generate embeddings, which are stored in FAISS (a vector database) for fast semantic search.  
* We create a **retriever** to search for the most relevant documents based on user input.  
* The **ConversationalRetrievalChain** combines the retrieval process with the OpenAI model to generate responses grounded in the retrieved documents.

One key part of the example is add\_routes, which comes from the LangServe package. This function automatically integrates LangChain-powered AI workflows into a FastAPI app by creating the necessary routes. It simplifies the process of turning your AI logic into a fully functional API.

### Why Retrieval-Augmented Generation (RAG)?

It’s important to note that in **Retrieval-Augmented Generation**, the AI doesn’t generate answers purely from its built-in knowledge. Instead, it retrieves relevant information from the documents you provide and uses that as context to generate its responses. This approach makes the model’s answers much more **reliable and relevant** to specific use cases.

Concepts like **embeddings**, **chunk size**, and **chunk overlap** are crucial here because they affect how the documents are split, stored, and retrieved. Proper handling of these details ensures that the AI has enough context to generate accurate and meaningful answers.

## Conclusion: Scaling AI Interactions with LangGraph

As we’ve seen, integrating AI into more complex workflows is not just about adding a simple chatbot. LangGraph provides the necessary infrastructure to handle multi-agent systems, state management, and complex interaction flows, making AI-driven applications far more robust and scalable. Whether you’re working with image recognition, follow-up clarifications, or multiple models, LangGraph simplifies these tasks and keeps the complexity under control.

In the next and final part of this series, we’ll explore how Amazon Bedrock further streamlines AI development by managing document-based knowledge retrieval for context-aware applications. Stay tuned!

## Almost there!

Next, we’ll explore how **Amazon Bedrock** simplifies knowledge base management for AI-driven applications. Get ready to see how Bedrock handles document retrieval with ease.

[Don’t miss Part 3: Leveraging Bedrock for Knowledge Base Management](/articles/empower-your-application-with-langchain-langraph-and-bedrock-part-3)