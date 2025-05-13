FROM node:22-slim

# install clasp 3.x globally
RUN npm install -g @google/clasp

# set working directory
WORKDIR /workspace

# add user node to prevent permission issues
USER node

# Command to run when starting the container
CMD ["sleep", "infinity"]
