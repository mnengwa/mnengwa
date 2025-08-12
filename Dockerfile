# Use Bun v1.2.17 as base image
FROM oven/bun:1.2.17-alpine AS base
WORKDIR /oven

# Install dependencies into temp directory
# Caches them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/development
COPY package.json bun.lock /temp/development/
RUN cd /temp/development && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/production
COPY package.json bun.lock /temp/production/
RUN cd /temp/production && bun install --frozen-lockfile --production

# Copy node_modules from temp directory
# Copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/development/node_modules node_modules
COPY . .

# [optional] tests & build
ENV NODE_ENV=production
RUN bun run test
RUN bun run build

# Copy production dependencies and built files into final image
FROM base AS release
# COPY --from=install /temp/production/node_modules node_modules
COPY --from=prerelease /oven/out ./out
COPY --from=prerelease /oven/package.json .

# Change working directory to out
WORKDIR /oven/out

# Run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "main.js" ]
