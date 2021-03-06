FROM node:14
ENV NODE_ENV=production
WORKDIR /app
COPY dist ./dist
COPY index.js .
EXPOSE 3000
CMD [ "node", "index.js" ]