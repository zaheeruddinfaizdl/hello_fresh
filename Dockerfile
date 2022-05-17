FROM node:12-slim as fe-stage
WORKDIR /fe

COPY fe/package.json /fe/package.json
COPY fe/package-lock.json /fe/package-lock.json

RUN npm install
COPY fe /fe
RUN npm run prod-build
COPY . /fe

FROM python:3.8-slim
WORKDIR /be
RUN pip3 install gunicorn

COPY be/requirements.txt /be/requirements.txt
RUN pip3 install -r requirements.txt

COPY --from=fe-stage /fe /fe
COPY be/ /be/
# RUN python3 setup.py install

EXPOSE 5000
CMD ["./init_prod.sh"]


