FROM node:20-alpine
WORKDIR /srv
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev
COPY index.js ./
ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["node", "index.js"]


