# Frontend only. The GCP backend is specified in docs/architettura.md.
FROM nginxinc/nginx-unprivileged:stable-alpine
COPY infra/nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html manifest.json /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY vendor /usr/share/nginx/html/vendor
COPY assets /usr/share/nginx/html/assets
COPY docs /usr/share/nginx/html/docs
EXPOSE 8080
