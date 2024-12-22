FROM node:20-slim

# Install required dependencies
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    gradle \
    android-sdk \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV ANDROID_HOME=/usr/lib/android-sdk
ENV PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Install NativeScript CLI
RUN npm install -g nativescript

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port for development
EXPOSE 3000

# Command to run the development server
CMD ["ns", "preview"]