api-up:
	docker run -d -p 3000:3000 walmart-api

api-ini:
	make api-install
	make api-up

api-reset:
	make api-down
	make api-up

api-down:
	docker rm -f walmart-api

api-install:
	docker build -t api-mobile-visitor .