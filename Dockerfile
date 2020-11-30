FROM python:3

WORKDIR /

COPY /build/ ${WORKDIR}

ADD serve_spa.py ${WORKDIR}

CMD [ "python", "./serve_spa.py" ]
