# -- download Google word vectors data --
FROM alpine:3.13.5 AS downloader
RUN apk update && apk upgrade && apk add wget gzip
# Create data download directory
WORKDIR /data
RUN wget -q https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz \
    && gunzip GoogleNews-vectors-negative300.bin

# -- install python deps --
FROM python:3.9-slim as base
COPY ./requirements.txt .
RUN apt-get update && apt-get install -y --no-install-recommends gcc build-essential libgomp1 \
    && rm -rf /var/lib/apt/lists/* \
    && pip install -r requirements.txt \
    && apt-get purge -y --auto-remove gcc build-essential
RUN python -m spacy download en_core_web_md

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY ./app /app

# -- precalculate biases --
FROM base as precalculator
COPY --from=downloader /data /data
RUN python precalculate_biases.py

# -- build final image with precalculated biases --
FROM base as release
COPY --from=precalculator /data/biases.json /data/biases.json
ENV USE_PRECALCULATED_BIASES=TRUE
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app