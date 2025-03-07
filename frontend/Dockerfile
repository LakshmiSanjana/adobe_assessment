# Use an official Nginx image to serve the frontend
FROM nginx:alpine

# Copy the frontend files into the Nginx container
COPY . /usr/share/nginx/html

ARG HOST
ENV HOST=${HOST}

# Expose port 80 for the frontend
EXPOSE 80

# Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
