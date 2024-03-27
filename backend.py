import openai
import os
# Set your API key
openai.api_key = os.getenv("OPENAI_API_KEY")
# Initialize the conversation with a system message
messages = [{"role": "system", "content": "You are an intelligent software engineering assistant."}]

while True:
    message = input("User : ")
    if message:
        messages.append({"role": "user", "content": message})
        try:
            chat = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
            reply = chat.choices[0].message.content
            print(f"ChatGPT: {reply}")
            messages.append({"role": "assistant", "content": reply})
        except openai.error.RateLimitError as e:
            print("Rate limit exceeded. Please try again later.")
            break
        except Exception as e:
            print("An error occurred:", e)
            break
