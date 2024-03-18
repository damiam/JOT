import requests
import os
import tempfile
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
import PyPDF2


load_dotenv()
app = Flask(__name__)


def create_cover_letter(cv, job_description: str, user_language: str):
    # cv_content = cv.read()

    # with tempfile.NamedTemporaryFile(delete=True) as temp_file:
        # temp_file.write(cv_content)
        # temp_file.flush()
    print(type(cv), flush=True)
    pdf_loader = PyPDF2.PdfReader(cv)
    pdf_text = '\n'.join([page.extract_text(0) for page in pdf_loader.pages])
    
    # return pdf_text
    
    llm = ChatOpenAI(temperature=0, model_name='gpt-4-0125-preview') # model_kwargs={"response_format": {"type": "json_object"}}
    
    template = '''Your job is to write professional cover letters. You will have the job description and the curriculm. You will need to write the letter in {user_language}.\nJOB DESCRIPTION\n\n{job}\nCURRICULUM\n\n{cv}\nCOVER LETTER in {user_language}\n\n'''

    prompt = PromptTemplate(
        template=template,
        input_variables=['cv', 'job', 'user_language']
    )
    
    qa_chain = LLMChain(prompt=prompt, llm=llm, verbose=False)
    
    answer = qa_chain.invoke({
        'cv': pdf_text,
        'job': job_description,
        'user_language': user_language,
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
    cv = request.files.get('cv')
    
    user_language = request.form.get('language')
    
    job_description = request.form.get('job_description')
    if cv.filename == '' or not user_language:
        return jsonify({'error': 'parameters are required'}), 401
    
    answer = create_cover_letter(cv, job_description, user_language)
    
    return jsonify({'response': answer['text']}), 200


if __name__ == '__main__':
    app.run(port=8069, debug=True)
