CURR_PATH = $(shell pwd)
APP_NAME = $(shell echo "vuejs-composition-api")
MAIN_SERVICE_NAME = $(shell echo "app")
DOCKER_COMPOSE_DEV = $(shell echo "docker-compose.dev.yml")
DOCKER_COMPOSE_CI = $(shell echo "docker-compose.CI.yml")

###############################################################################
####                        Development Environment                        ####
###############################################################################
.PHONY: build-dev-env run-dev-env run-unit-tests down-dev-env

# Build dev instance on your local machine
build-dev-env:  
	@docker-compose \
 		--file $(DOCKER_COMPOSE_DEV) \
 		--project-name $(APP_NAME) \
 		build
	@echo "[DEV-INFO] DEV instances were successfully built!"

# Run DEV instance
run-dev-env:
	@docker-compose \
		--file $(DOCKER_COMPOSE_DEV) up \
		--detach \
		$(MAIN_SERVICE_NAME)
	@echo "[DEV-INFO] DEV instance(s) were successfully started!"

# Run unit tests on DEV instance
run-unit-tests:
	@docker-compose \
		--file $(DOCKER_COMPOSE_DEV) run \
		--rm \
		--user root \
		$(MAIN_SERVICE_NAME) \
		sh -c "yarn test:unit"
	@echo "[DEV-INFO] Unit Tests on DEV instance(s) were successfully run!"

# Stop and clear DEV instance
down-dev-env:
	@docker-compose \
		--file $(DOCKER_COMPOSE_DEV) \
 		down --remove-orphans
	@echo "[DEV-INFO] DEV instances were successfully stopped."


###############################################################################
####                   Constant Integration Environment                    ####
###############################################################################
.PHONY: build-ci-env run-ci-unit-tests run-ci-lint-check

# Build CI instance
build-ci-env:  
	@docker-compose \
 		--file $(DOCKER_COMPOSE_CI) \
 		--project-name $(APP_NAME) \
 		build

# Run unit tests on CI instance
run-ci-unit-tests:
	@docker-compose \
		--file $(DOCKER_COMPOSE_CI) run \
		--rm \
		--user root \
		$(MAIN_SERVICE_NAME) \
		sh -c "yarn test:unit"

# Run lint check on CI instance
run-ci-lint-check:
	@docker-compose \
		--file $(DOCKER_COMPOSE_CI) run \
		--rm \
		--user root \
		$(MAIN_SERVICE_NAME) \
		sh -c "yarn lint"