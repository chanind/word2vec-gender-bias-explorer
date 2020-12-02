FROM python:3.9-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

COPY ./requirements.txt .
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc build-essential wget \
    && rm -rf /var/lib/apt/lists/* \
    && pip install -r requirements.txt \
    && apt-get purge -y --auto-remove gcc build-essential

COPY ./download_data.py .
RUN python download_data.py
RUN wget https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz \
    && gunzip GoogleNews-vectors-negative300.bin

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY ./app /app

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app