# === Build-Stage: Angular bauen ===
FROM node:22-alpine AS build
WORKDIR /app

# Dependencies
COPY package*.json ./
RUN npm install -g @angular/cli@17 && npm ci

# Quellcode kopieren + Production-Build
COPY . .
RUN ng build --configuration production

# Build-Ergebnis auf /out normalisieren
# => findet dist/<project>/browser oder dist/app
RUN set -eux; \
    publish="$(find dist -type d -name browser -maxdepth 2 | head -n1 || true)"; \
    mkdir -p /out; \
    if [ -n "$publish" ] && [ -d "$publish" ]; then \
        cp -r "$publish"/* /out/; \
    elif [ -d dist/app ]; then \
        cp -r dist/app/* /out/; \
    else \
        # Fallback: best guess
        cp -r dist/* /out/ 2>/dev/null || true; \
    fi; \
    ls -la /out

# === Runtime-Stage: NGINX liefert /out aus ===
FROM nginx:alpine

# SPA-Routing (Deep Links)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Gebaute App deployen
COPY --from=build /out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
