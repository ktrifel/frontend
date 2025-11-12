# === Build-Stage: Angular-Projekt im Container erzeugen & bauen ===
FROM node:22-alpine AS build
WORKDIR /app

# Angular CLI installieren
RUN npm install -g @angular/cli@17

# Neues Angular-Projekt "frontendapp" im Container erzeugen
# --skip-git: kein Git im Container
# --routing: Router aktiv
# --style=scss: SCSS-Styles
# --package-manager=npm: Standard npm
RUN ng new frontendapp --skip-git --routing --style=scss --package-manager=npm

# Ab hier im generierten Projekt arbeiten
WORKDIR /app/frontendapp

# Dependencies installieren und Production-Build erstellen
RUN npm install
RUN ng build --configuration production --output-path=dist/app

# === Runtime-Stage: NGINX als Webserver ===
FROM nginx:alpine

# SPA-Routing für Angular (falls Datei existiert, sonst Standard-Nginx verwenden)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Gebaute App deployen
COPY --from=build /app/frontendapp/dist/app /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]