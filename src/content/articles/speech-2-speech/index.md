---
title: AI in action - crafting a real-time speech-to-speech translation app
author: Patricia Silva
date: 2024-10-03
description: Build a real-time speech-to-speech translation app with OpenAI, AssemblyAI, ElevenLabs and LangChain for natural language processing.
thumbnail: ./assets/thumbnail.jpg
tags: python, langchain, openai, assemblyai, elevenlabs
cta_prefix: At ustwo, we're exploring how AI can be used to create and elevate great product experiences that help humans to connect.
---

Just like when we go to the supermarket to select ingredients for a recipe, we can also choose digital "ingredients" to build our solutions. In this article, I’d like to explore and break down the complexity of these applications.

How easy is it to create a "speech-to-speech" solution that captures speech, processes it and translates it into another language in real-time?

Using AI-based services, it’s surprisingly accessible and easy to create such a solution quickly. For this solution, I am using [OpenAI](https://openai.com/) for natural language processing, [AssemblyAI](https://www.assemblyai.com/) for speech recognition, [ElevenLabs](https://elevenlabs.io/) for speech synthesis and [LangChain](https://www.langchain.com/) for workflow management, which have been game-changers.

Here is a small experiment in which I’m speaking in English, and the app pronounces it in French or Portuguese:

#### Turning English into French:

<video controls style="width: 100%">

  <source src="https://assets.ustwo.com/engineering/speech-2-speech/Paty-French.mp4" type="video/mp4">
      Your browser does not support the video tag. Description: This video shows a person speaking in English and her voice being translated to French.
</video>

#### From English to Portuguese:

<video controls style="width: 100%">

  <source src="https://assets.ustwo.com/engineering/speech-2-speech/Paty-Portuguese.mp4" type="video/mp4">
      Your browser does not support the video tag. Description: This video shows a person speaking in English and her voice being translated to Portuguese.
</video>

The future of language learning could lie in synthetic conversations with AI tutors. As this experiment shows, speech-to-speech applications hold great promise for real-world use. Imagine being able to translate any language in real time during live conversations. Whether you're travelling abroad or attending a global conference, this technology could instantly break down language barriers. Additionally, AI-powered voice-command systems could detect spoken commands in any language and translate them into actions, paving the way for truly global, voice-controlled applications. This could redefine how we interact across languages, making communication seamless and accessible to everyone. The potential is enormous!

Here is our list of ingredients, along with what each one is responsible for:

- **OpenAI:** translates text between different languages.
- **AssemblyAI:** converts spoken words into written text (transcription).
- **ElevenLabs:** turns text back into natural-sounding speech (speech synthesis).
- **LangChain:** simplifies building AI applications by managing workflows and integrating various language model services.

Remember, to use these tools, you'll need to generate API keys, which give you access to their services. Some of these services may have paid plans, so be mindful of usage limits and costs. To manage costs in sandbox and development environments, consider starting with lower-tier models or services.

As an additional piece of advice, the API's keys are stored in the .env file to ensure their safety. In a production environment, be sure to use environment variables or secret managers to manage your keys securely.

## Let's go through each step

The following code snippets are part of a Python script that must be run from the command line.

### Speech-to-text

This part of the code handles the transcription, which is turning speech into text. AssemblyAI’s `RealtimeTranscriber` listens to the audio input (from a microphone, in this case) and produces text. As you speak, AssemblyAI sends back chunks of the transcription. These are useful for real-time feedback but aren’t final.

Once the full sentence is captured, the `RealtimeFinalTranscript` triggers the next step — translation. This ensures that only complete sentences are translated and spoken back.

```python
    def on_transcript_data(transcript: aai.RealtimeTranscript):
    if not transcript.text:
        return

    if isinstance(transcript, aai.RealtimeFinalTranscript):
        print(transcript.text)
        print("Translating...")
        translation = translate(transcript.text)
        print(f"Translation: {translation}")
        generate_audio(translation)
```

### Translation

Here, we start to involve OpenAI's language model. It translates the text (captured from speech) into the target language, English to Portuguese or any other language. In this case, the default is set to Portuguese, but it can be customised.

```python
    def translate(sentence: str, language: str = "Portuguese") -> str:
    data_input = {
        "language": language,
        "sentence": sentence
    }
    return translation_chain.invoke(data_input)
```

We use a prompt template to be used in the translation process.

```python
translation_template = """
Please translate the following sentence into {language}. Return ONLY the translated sentence with no additional text or commentary.

Sentence: {sentence}
"""
```

### Text-to-speech

Once the translation is ready, the text is passed to ElevenLabs to be spoken aloud. The `generate_audio` function takes the translated text and converts it into speech. The `voice="Patty"` line selects my personalised voice. This service synthesises the translation into a natural-sounding voice, and we can even create personalised voices. I made my voice, and it's super interesting to hear my voice in different languages.

Setting up your own personal voice takes little time. ElevenLabs can generate a personalised voice with just 30 seconds of audio samples. But if you want more precision in the voice synthesis, you could provide a longer sample of around 10 minutes or so for even better results.

At the time of this article's publication, I am using the ElevenLabs model `eleven_turbo_v2_5`, which is very performant and of the highest quality.

```python
def generate_audio(text: str):
    audio = elevenlabs_client.generate(
        text=text,
        voice="Patty",
        model="eleven_turbo_v2_5"
    )
    play(audio)
```

### Real-time streaming

This part sets up the live transcription. The transcriber continuously listens to the microphone input and calls various functions:

```python
transcriber = aai.RealtimeTranscriber(
    on_data=on_transcript_data,
    on_error=on_transcription_error,
    sample_rate=44_100,
    on_open=on_session_open,
    on_close=on_session_close
)
```

- **on_data:** handles what to do when transcription data is received (this includes translating and generating audio).
- **on_error:** handles errors (useful for debugging).
- **on_open/on_close:** manage session events, such as when the transcription starts and ends.

The transcriber’s sample rate is set to `44,100 Hz`, ensuring high-quality audio input for smooth transcription.

Now, connect to the transcription service:

```python
transcriber.connect()
```

And then, start streaming audio from the microphone:

```python
microphone_stream = aai.extras.MicrophoneStream()
transcriber.stream(microphone_stream)
```

The `MicrophoneStream()` function records your speech and transmits it to AssemblyAI for live transcription.

## Workflow management

LangChain plays an important role in managing the workflow between various AI services in this solution, coordinating tasks efficiently and ensuring seamless data transfer between these services easily.

For instance, in our application, we need to transcribe spoken words, translate the transcribed text and then convert the translated text back into speech. Using LangChain allows us to create a structured workflow that connects these tasks easily.

### Building the translation chain

To leverage LangChain to manage the translation process, we started to set up the OpenAI language model with the necessary parameters, such as temperature and model type.

```python
llm = ChatOpenAI(
    temperature=0.0,
    model="gpt-4o-mini",
    api_key=os.getenv("OPENAI_API_KEY")
)
```

LangChain facilitates the creation of a translation chain that organises the data flow. It connects the input (language and sentence) to the language model through the defined prompt template and outputs the final translated text.

```python
translation_chain = (
    {
        "language": RunnablePassthrough(),
        "sentence": RunnablePassthrough()
    }
    | translation_prompt
    | llm
    | output_parser
)
```

By integrating LangChain into our workflow, we not only streamline the process of managing multiple AI services but also enhance the overall performance and reliability of the application.

## All together now

The components work together to create a seamless loop process:

1. Your speech is captured via the microphone.
2. AssemblyAI transcribes it in real time.
3. OpenAI translates the text into the target language.
4. ElevenLabs converts the translated text into speech, which is then played back.

And that’s how the magic happens! 🪄🪄🪄

A perfect example of this kind of solution is OpenAI, which introduced an "advanced voice mode" that enhances this process further by adding a more natural and dynamic voice experience. This new feature is a fantastic addition to any app that integrates AI services, making it even easier to create immersive, real-time voice applications. Imagine combining this with the setup we've just described — the possibilities for creating intuitive, voice-driven solutions are truly exciting. Learn more about how this feature works [here](https://help.openai.com/en/articles/8400625-voice-mode-faq).

### Full code version

The complete example of this experimentation is available here:
<a href="./gists/source_py.txt" target="_blank">speech-to-speech-langchain</a>

## Conclusion

I hope you enjoyed this journey of experimenting with different flavours of AI services. As you can see, we can easily and quickly create interesting solutions. Of course, the costs associated with subscriptions should be considered for large-scale products, and knowing the different tools at hand is what allows us to create amazing solutions. Trying out different approaches encourages us to question whether there are alternative methods, thus opening up new possibilities and paths.

Have fun! 🙂🤟
