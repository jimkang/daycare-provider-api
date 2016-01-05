HOMEDIR = $(shell pwd)

test:
	node tests/basictests.js

start:
	node daycare-provider-api.js

create-docker-machine:
	docker-machine create --driver virtualbox dev

stop-docker-machine:
	docker-machine stop dev

start-docker-machine:
	docker-machine start dev

# connect-to-docker-machine:
	# eval "$(docker-machine env dev)"

build-docker-image:
	docker build -t jkang/daycare-provider-api .

push-docker-image: build-docker-image
	docker push jkang/daycare-provider-api

# /tmp mapping is only for development.
run-daycare-provider-api:
	docker rm -f daycare-provider-api || \
		echo "daycare-provider-api did not need removal."
	docker run \
		-d \
		--restart=always \
		--name daycare-provider-api \
		-v $(HOMEDIR)/config:/usr/src/app/config \
		-v /tmp:/usr/src/app/data \
		-p 49160:8080 \
		jkang/daycare-provider-api \
		node daycare-provider-api.js

pushall: push-docker-image
	git push origin master

data/providers.db: data/geocodedproviders.json
	node build-db.js data/geocodedproviders.json
