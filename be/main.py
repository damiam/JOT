import requests
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate


load_dotenv()
app = Flask(__name__)


def create_cover_letter(cv, user_language: str):
    llm = ChatOpenAI(temperature=0, model_name='gpt-4-0125-preview', model_kwargs={"response_format": {"type": "json_object"}})
    
    template = ''' write a small one paragraph cover letter for a mc donalds manager job opening in json format like {{output: cover-letter}} '''

    prompt = PromptTemplate(
        template=template,
        input_variables=['cv', 'user_lang']
    )
    
    qa_chain = LLMChain(prompt=prompt, llm=llm, verbose=False)
    
    answer = qa_chain.invoke({
        'cv': cv,
        'user_lang': user_language,
    })
    return answer

    
@app.route('/search', methods=['POST'])
def query_search():
    query = request.json.get('query')
    if not query:
        return jsonify({'error': 'query is required'}), 401
    
    url = "https://jsearch.p.rapidapi.com/search"

    querystring = {"query": query, "page": "1", "num_pages": "1"}

    headers = {
        "X-RapidAPI-Key": os.environ['RAPID_API_KEY'],
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    response = response.json()
    
    return jsonify({'response': response['data']}), 200


@app.route('/cover-letter', methods=['POST'])
def cover_letter_endpoint():
    cv = request.json.get('cv')
    user_language= request.json.get('language')
    if not cv or not user_language:
        return jsonify({'error': 'parameters are required'}), 401
    answer = create_cover_letter(cv, user_language)
    
    return jsonify({'response': answer['text']}), 200


if __name__ == '__main__':
    app.run(port=8069, debug=True)
