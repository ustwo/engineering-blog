---
name: sandbox
---

## Header [h2]

Echo Three to Echo Seven. Han, old buddy, do you read me? Loud and clear, kid. What's up? Well, I finished my circle. I don't pick up any life readings. There isn't enough life on this ice cube to fill a space cruiser. The sensors are placed. I'm going back.

### Bog standard image [h3]

Oh, I don't even know what I'm doing here. We're wasting our time. I cannot teach him. The boy has no patience. He will learn patience. Hmmm. Much anger in him, like his father. Attention! This is Lando Calrissian. The Empire has takes control of the city. I advise everyone to leave before more Imperial troops arrive. This way. Don't blame me. I'm an interpreter. I'm not supposed to know a power socket from a computer terminal.

![Example image alt text](./articles/getting-started-with-visionos/assets/thumbnail.jpg)

### Image with captions [h3]

What do you mean, nobody knows? Well, uh, you see. Deck Officer. Deck Officer! Excuse me, sir. Might I inqu-. Yes, sir? Do you know where Commander Skywalker is? I haven't seen him. It's possible he came in through the south entrance. It's possible? Why don't you go find out? It's getting dark out there.

Obi-Wan never told you what happened to your father. He told me enough! He told me you killed him. [Spoiler alert] No. I am your father.

![caption:This is an image with captions using figure and figcaption](./articles/getting-started-with-visionos/assets/thumbnail.jpg)

#### Lists [h4]

Get a shuttle ready. I shall assume full responsibility for losing them, and apologize to Lord Vader. Meanwhile, continue to scan the area. Yes, Captain Needa. Use the Force. Yes.

- Right. I'll see you shortly.    
- There's a meteorite that hit the ground near here.
- I want to check it out.
- It won't take long.
- Hey, steady girl.
- You smell something?
- Rwwwoaar

## How about some code

Hmph. Adventure. Heh! Excitement. Heh! A Jedi craves not these things. You are reckless! So was I, if you'll remember.

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

Captain Solo, this time you have gone too far. No, I will not be quiet, Chewbacca. Why doesn't anyone listen to me? The fleet is beginning to break up. Go back and stand by the manual release for the landing claw.

#### Header [h4]

Bounty hunters.

#### Header [h4]

We don't need that scum.

## A table you say?

<table>
  <tr>
    <th></th>
    <th>London</th>
    <th>Frankfurt</th>
    <th>W' D.C</th>
    <th>San Fran</th>
    <th>Tokyo</th>
    <th>Sydney</th>
  </tr>
  <tr class="tableTrShade fontWeightBold">
    <td>Netlify</td>
    <td>340ms</td>
    <td>201ms</td>
    <td>377ms</td>
    <td>428ms</td>
    <td>1.62s</td>
    <td>1.65s</td>
  </tr>
  <tr>
    <td>Oslo</td>
    <td>248ms</td>
    <td>256ms</td>
    <td>915ms</td>
    <td>1.56s</td>
    <td>2.56s</td>
    <td>2.76s</td>
  </tr>
  <tr class="tableTrShade fontWeightBold">
    <td>Green Net.</td>
    <td style="color:green">248ms</td>
    <td style="color:green">256ms</td>
    <td style="color:green">214ms</td>
    <td style="color:orange">524ms</td>
    <td style="color:green">1.35s</td>
    <td style="color:red">2.57s</td>
  </tr>
</table>






