FROM debian:stable-slim

RUN apt update -y
RUN apt install bash curl unzip -y

RUN curl -fsSL https://deno.land/x/install/install.sh | DENO_INSTALL=/usr/local sh -s v1.2.0
RUN export DENO_INSTALL="/root/.local"
RUN export PATH="$DENO_INSTALL/bin:$PATH"

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache src/main.ts


