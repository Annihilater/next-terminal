<<<<<<< HEAD
FROM dushixiang/guacamole-server:1.5.2
=======
FROM dushixiang/guacamole-server:1.4.0
>>>>>>> a088c805435ef66473494ece77c9bc914cade24d

LABEL MAINTAINER="helloworld1024@foxmail.com"

COPY ./guacd/fonts/Menlo-Regular.ttf /usr/share/fonts/
COPY ./guacd/fonts/SourceHanSansCN-Regular.otf /usr/share/fonts/

user root

RUN mkfontscale && mkfontdir && fc-cache
