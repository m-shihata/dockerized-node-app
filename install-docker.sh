#!/bin/bash

# install-docker.sh
# Script to install Docker and Docker Compose on Ubuntu 20.04
# Ensure this script is run with a non-root user with sudo privileges.

echo "Updating package database..."
sudo apt update

echo "Installing prerequisite packages..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

echo "Adding Docker GPG key..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

echo "Adding Docker repository to APT sources..."
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

echo "Updating package database with Docker packages..."
sudo apt update

echo "Installing Docker CE..."
sudo apt install -y docker-ce


echo "Adding user to Docker group to avoid using sudo for Docker commands..."
sudo usermod -aG docker ${USER}

echo "Installing Docker Compose..."
DOCKER_COMPOSE_VERSION="1.28.5"
sudo curl -L "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

echo "Setting executable permissions for Docker Compose..."
sudo chmod +x /usr/local/bin/docker-compose

echo "Verifying Docker and Docker Compose installation..."
docker --version
docker-compose --version

echo "Installation complete! Docker and Docker Compose are now ready to use."
echo "NOTE: You will need to log out and log back in to apply Docker group changes."
