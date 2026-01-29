    # =========================
    # Build / Development stage
    # =========================
    FROM node:18-alpine AS development

    # Install pnpm
    RUN npm install -g pnpm

    WORKDIR /usr/src/app

    # Copy root dependency files
    COPY package.json pnpm-lock.yaml ./

    # Install all dependencies
    RUN pnpm install

    # Copy full monorepo
    COPY . .

    # Build only the orders app
    RUN pnpm run build orders


    # =========================
    # Production stage
    # =========================
    FROM node:18-alpine AS production

    # Install pnpm
    RUN npm install -g pnpm

    WORKDIR /usr/src/app

    # Copy only prod dependency files
    COPY package.json pnpm-lock.yaml ./

    # Install production dependencies only
    RUN pnpm install --prod

    # Copy compiled output from build stage
    COPY --from=development /usr/src/app/dist ./dist

    # Start orders service
    CMD ["node", "dist/apps/orders/main.js"]
