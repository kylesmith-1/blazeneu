#!/bin/bash

export MIX_ENV=prod
export PORT=4808

export DATABASE_URL=ecto://blazeneu:atlan1989@localhost/events_app
export SECRET_KEY_BASE=ZrDxnPdDNugjZ7nJUViLoeTyQvQPKhX/QGCPcZdNvW7zRfzQz/kdUM3K7HrrD37/
export SEND_GRID_API_KEY=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

CFGD=$(readlink -f ~/.config/events)

if [ ! -e "$CFGD/base" ]; then
    echo "run deploy first"
    exit 1
fi

export DATABASE_URL=ecto://blazeneu:atlan1989@localhost/events_app

#SECRET_KEY_BASE=$(cat "$CFGD/base")
#export SECRET_KEY_BASE

_build/prod/rel/events_app/bin/events_app start
