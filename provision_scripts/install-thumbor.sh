#!/usr/bin/env bash

sudo apt-get update
sudo apt-get -y install \
python-pip \
python2.7-dev \
libssl-dev \
libcurl4-openssl-dev \
python-numpy \
python-opencv \
libopencv-dev \
libjpeg-dev \
libpng-dev \
libx264-dev \
libass-dev \
libvpx3 \
libvpx-dev \
libwebp-dev \
webp \
gifsicle

sudo -H pip install thumbor tc_aws botocore==1.3.7

sudo useradd thumbor

read -r -d '' SERVICE << SERVICE
[Unit]
Description=Photo thumbnail service

[Service]
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=thumbor
User=thumbor
Group=thumbor
ExecStart=/usr/local/bin/thumbor -c /etc/thumbor.conf

[Install]
WantedBy=multi-user.target
SERVICE

sudo mv /tmp/thumbor.conf /etc/thumbor.conf

echo "$SERVICE" | sudo tee /etc/systemd/system/thumbor.service
sudo systemctl enable thumbor
