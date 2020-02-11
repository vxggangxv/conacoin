# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi

# Uncomment the following line if you don't like systemctl's auto-paging feature:
# export SYSTEMD_PAGER=

# User specific aliases and functions

#########################################################################
#                                                                       #
# PORT, NVM_DIR 환경 변수는 절대 수정하지 마세요.                       #
# 수정할 경우 정상 동작하지 않습니다.                                   #
# 기본 WORK_DIR 는 /web 입니다.                                         #
# 프로젝트 경로 (ex: /web/myapp)로 변경 할 수 있습니다                  #
#                                                                       #
#########################################################################

export PORT=8080

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

export WORK_DIR="/web/conacoin"
export NODE_ENV="NODE_ENV test is working"