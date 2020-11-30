FROM python:3.9-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

COPY ./requirements.txt .
RUN pip install -r requirements.txt

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY ./app /app

RUN apt-get update
RUN apt-get install -y ca-certificates
# download model from gensim
RUN mkdir ~/gensim-data
# for some reason this won't download properly on its own, so just doing it explicitly here
RUN wget -O ~/gensim-data/information.json https://raw.githubusercontent.com/RaRe-Technologies/gensim-data/master/list.json
RUN python /app/download_data.py

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app