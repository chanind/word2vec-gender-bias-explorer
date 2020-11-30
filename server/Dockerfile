FROM tiangolo/uwsgi-nginx-flask:python3.8
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY ./app /app
RUN apt-get update
RUN apt-get install -y ca-certificates
# download model from gensim
RUN mkdir ~/gensim-data
# for some reason this won't download properly on its own, so just doing it explicitly here
RUN wget -O ~/gensim-data/information.json https://raw.githubusercontent.com/RaRe-Technologies/gensim-data/master/list.json
RUN python /app/download_data.py