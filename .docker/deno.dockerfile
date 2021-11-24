FROM debian:stable-slim

RUN apt update -y
RUN apt install bash curl unzip -y

RUN curl curl -fsSL https://deno.land/x/install/install.sh | sh
RUN export DENO_INSTALL="/root/.local"
RUN export PATH="$DENO_INSTALL/bin:$PATH"

# Install velociraptor script runner
RUN deno install -qAn vr https://deno.land/x/velociraptor@1.3.0/cli.ts

ARG DENO_HOSTNAME
ENV DENO_HOSTNAME=${DENO_HOSTNAME}

WORKDIR /app

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache src/main.ts


