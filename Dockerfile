# === Build-Stage: Angular aus lokalem Workspace bauen ===
FROM node:22-alpine AS build
WORKDIR /app

# 1) Dependencies installieren (Cache-freundlich)
COPY package*.json ./
RUN npm install -g @angular/cli@17 && npm ci

# 2) Projekt kopieren und Production-Build erstellen
COPY . .
RUN ng build --configuration production

# 3) Build-Ergebnis auf EINEN Ordner normalisieren (dist/app ODER dist/<proj>/browser)
RUN set -eux; \
    mkdir -p /normalized; \
    if [ -d "dist/app" ]; then \
        cp -r dist/app/* /normalized/; \
    elif [ -d "$(find dist -type d -name browser -maxdepth 2 | head -n1)" ]; then \
        cp -r $(find dist -type d -name browser -maxdepth 2 | head -n1)/* /normalized/; \
    else \
        cp -r dist/*/* /normalized/ 2>/dev/null || cp -r dist/* /normalized/ || true; \
    fi

# === Runtime-Stage: NGINX als Webserver ===
FROM nginx:alpine

# SPA-Routing (Deep Links)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Gebaute App deployen (immer aus /normalized)
COPY --from=build /normalized /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
