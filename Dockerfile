FROM node:12-alpine

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

# Using docker cache for dependencies
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

# Copy source files
COPY . .
CMD ["npm", "start", "--", "REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL"]