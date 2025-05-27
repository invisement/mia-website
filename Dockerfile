FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno task build

# If your prod task requires dependencies to be installed, uncomment and modify the following line:
# RUN deno cache --lock=deno.lock server.ts

CMD ["deno", "task", "prod"]
