FROM ubuntu:18.04

# Add wait-for-it
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /bin/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

# Add S6 supervisor (for graceful stop)
ADD https://github.com/just-containers/s6-overlay/releases/download/v1.21.1.1/s6-overlay-amd64.tar.gz /tmp/
RUN tar xzf /tmp/s6-overlay-amd64.tar.gz -C /
ENTRYPOINT ["/init"]
CMD []

# Disable frontend dialogs
ENV DEBIAN_FRONTEND noninteractive
# ENV PHP_VERSION 7.3
# Add ppa, curl and syslogd
# RUN apt-get update && apt-get install -y software-properties-common curl inetutils-syslogd && \
#     apt-add-repository ppa:nginx/stable -y && \
#     LC_ALL=C.UTF-8 apt-add-repository ppa:ondrej/php -y && \
#     apt-get update && apt-get install -y \
#     php${PHP_VERSION}-fpm \
#     php${PHP_VERSION}-curl \
#     php${PHP_VERSION}-cli \
#     php${PHP_VERSION}-intl \
#     php${PHP_VERSION}-json \
#     php${PHP_VERSION}-pgsql \
#     php${PHP_VERSION}-gd \
#     php-gettext \
#     php${PHP_VERSION}-xml \
#     php${PHP_VERSION}-bcmath \
#     php${PHP_VERSION}-mbstring \
#     php-ast \
#     php${PHP_VERSION}-zip \
#     php${PHP_VERSION}-sqlite3 \
#     php${PHP_VERSION}-apcu \
#     zip \
#     unzip \
#     nginx && \
#     apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/* && \
#     mkdir -p /run/php && chmod -R 755 /run/php && \
#     sed -i 's|.*listen =.*|listen=9000|g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf && \
#     sed -i 's|.*error_log =.*|error_log=/proc/self/fd/2|g' /etc/php/${PHP_VERSION}/fpm/php-fpm.conf && \
#     sed -i 's|.*access.log =.*|access.log=/proc/self/fd/2|g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf && \
#     sed -i 's|.*user =.*|user=root|g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf && \
#     sed -i 's|.*group =.*|group=root|g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf && \
#     sed -i 's|.*access.format =.*|access.format=\"%R - %u %t \\"%m %r%Q%q\\" %s %f %{mili}d %{kilo}M %C%%\"|g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf && \
#     sed -i -e "s/;catch_workers_output\s*=\s*yes/catch_workers_output = yes/g" /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf && \
#     sed -i 's#.*variables_order.*#variables_order=EGPCS#g' /etc/php/${PHP_VERSION}/fpm/php.ini && \
#     sed -i 's#.*date.timezone.*#date.timezone=UTC#g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf && \
#     sed -i 's#.*clear_env.*#clear_env=no#g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf

RUN apt-get update && apt-get install -y software-properties-common curl inetutils-syslogd && \
    apt-add-repository ppa:nginx/stable -y && \
    LC_ALL=C.UTF-8 apt-add-repository ppa:ondrej/php -y && \
    apt-get update && apt-get install -y \
    zip \
    unzip \
    nginx && \
    apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# COPY ./composer.json /var/www/api/composer.json
# COPY ./composer.lock /var/www/api/composer.lock

# Setup composer
# RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
#     && php composer-setup.php --filename=composer --install-dir=/bin \
#     && php -r "unlink('composer-setup.php');"

# Install php dependencies
# RUN cd /var/www/api && composer install --no-dev --optimize-autoloader
# Change workdir
WORKDIR /var/www/web
# Copy NGINX service script
COPY ./docker/web/start-nginx.sh /etc/services.d/nginx/run
RUN chmod 755 /etc/services.d/nginx/run

# Copy PHP-FPM service script
# COPY ./docker/dev/api/start-fpm.sh /etc/services.d/php_fpm/run
# RUN chmod 755 /etc/services.d/php_fpm/run

# Nginx settings
COPY ./docker/web/nginx.conf /etc/nginx/nginx.conf
# Copy env file
# COPY ./.env.development ./.env
# Permissions
# RUN chown -R www-data:www-data storage
# RUN sed -i 's|.*php_flag\[display_errors\] =.*|php_flag\[display_errors\]=on|g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf
# RUN sed -i 's|.*php_flag\[display_startup_errors\] =.*|php_flag\[display_startup_errors\]=on|g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf
# RUN sed -i 's|.*display_errors =.*|display_errors = On|g' /etc/php/${PHP_VERSION}/fpm/php.ini
# RUN sed -i 's|.*display_startup_errors =.*|display_startup_errors = On|g' /etc/php/${PHP_VERSION}/fpm/php.ini
# RUN sed -i 's|.*error_reporting =.*|error_reporting = E_ALL|g' /etc/php/${PHP_VERSION}/fpm/php.ini
# RUN echo 'php_flag[display_startup_errors]=on' >> /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf
# RUN sed -i 's|.*max_execution_time =.*|max_execution_time = 180|g' /etc/php/${PHP_VERSION}/cli/php.ini
# RUN sed -i 's|.*max_input_time =.*|max_input_time = 180|g' /etc/php/${PHP_VERSION}/cli/php.ini
# RUN sed -i 's|.*request_terminate_timeout =.*|request_terminate_timeout = 180|g' /etc/php/${PHP_VERSION}/fpm/pool.d/www.conf
# Nginx settings
RUN sed -i 's|.*keepalive_timeout.*|keepalive_timeout 180;|g' /etc/nginx/nginx.conf
RUN sed -i 's|.*fastcgi_read_timeout.*|fastcgi_read_timeout 180;|g' /etc/nginx/nginx.conf