CURR_PATH = $(shell pwd)
APP_DIR = $(shell echo "app")
APP_NAME = $(shell echo "vuejs-composition-api")

.PHONY: build-dev-env run-dev-env run-unit-tests down-dev-env

# Build dev instance on your local machine
build-dev-env:  
	@docker-compose \
 		--file docker-compose.yml \
 		--project-name $(APP_NAME) \
 		build
	@echo "[DEV-INFO] DEV instances were successfully built!"

# Run DEV instance
run-dev-env:
	@docker-compose \
		--file docker-compose.yml up \
		--detach \
		app
	@echo "[DEV-INFO] DEV instance(s) were successfully started!"

# Run unit tests on DEV instance
run-unit-tests:
	@docker-compose \
		--file docker-compose.yml run \
		--rm \
		--user root \
		app \
		sh -c "yarn test:unit"
	@echo "[DEV-INFO] Unit Tests on DEV instance(s) were successfully run!"

# Stop and clear DEV instance
down-dev-env:
	@docker-compose \
		--file docker-compose.yml \
 		down --remove-orphans
	@echo "[DEV-INFO] DEV instances were successfully stopped."
