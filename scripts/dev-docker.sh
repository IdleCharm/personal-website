#!/usr/bin/env bash
set -euo pipefail

# ANSI color codes
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_DIR="${ROOT_DIR}/../personal-api"

echo -e "\n${BOLD}${BLUE}================================================================${NC}"
echo -e "${BOLD}${BLUE}   PERSONAL WEBSITE & API — DOCKER DEVELOPMENT ORCHESTRATOR   ${NC}"
echo -e "${BOLD}${BLUE}================================================================${NC}\n"

# Check if secret manager CLI (op) is available and active for local secret resolution
USE_SECRET_RUNNER=false
if command -v op >/dev/null 2>&1; then
  if op whoami >/dev/null 2>&1 || op account get >/dev/null 2>&1; then
    USE_SECRET_RUNNER=true
  fi
fi

# 1. Start personal-api
if [ -d "$API_DIR" ]; then
  echo -e "${BOLD}${CYAN}📦 [1/2] Building and restarting personal-api (Port 3030)...${NC}"
  cd "$API_DIR"
  if [ "$USE_SECRET_RUNNER" = true ] && [ -f ".env" ]; then
    op run --env-file=.env -- docker compose up -d --build --remove-orphans
  else
    docker compose up -d --build --remove-orphans
  fi
else
  echo -e "${RED}✗ Error: personal-api directory not found at ${API_DIR}${NC}"
  exit 1
fi

# 2. Start personal-website
echo -e "\n${BOLD}${CYAN}🌐 [2/2] Building and restarting personal-website (Port 8080)...${NC}"
cd "$ROOT_DIR"
if [ "$USE_SECRET_RUNNER" = true ] && [ -f ".env" ]; then
  op run --env-file=.env -- docker compose up -d --build --remove-orphans
else
  docker compose up -d --build --remove-orphans
fi

echo -e "\n${BOLD}${GREEN}================================================================${NC}"
echo -e "${BOLD}${GREEN}   ✅ All local Docker services built and running successfully!  ${NC}"
echo -e "${BOLD}${GREEN}================================================================${NC}\n"

docker ps --filter "name=personal" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo -e "\n${BOLD}Access Points:${NC}"
echo -e "  • Frontend Web App:  ${CYAN}http://localhost:8080${NC}"
echo -e "  • Backend Rust API:  ${CYAN}http://localhost:3030${NC}"
echo -e "  • API Healthcheck:   ${CYAN}http://localhost:3030/health${NC}"
echo -e "  • Nginx API Proxy:   ${CYAN}http://localhost:8080/api/contact${NC}\n"
echo -e "Commands:"
echo -e "  • View container logs: ${YELLOW}npm run logs:docker${NC}"
echo -e "  • Stop all containers: ${YELLOW}npm run down:docker${NC}\n"
