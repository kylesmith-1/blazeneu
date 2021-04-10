#!/bin/bash

export MIX_ENV=prod
# Common port range for this is 4000-10,000
# Valid port range for a user app to listen
# on is something like 1025-32767
export PORT=4809
export SECRET_KEY_BASE=ZrDxnPdDNugjZ7nJUViLoeTyQvQPKhX/QGCPcZdNvW7zRfzQz/kdUM3K7HrrD37/
export DATABASE_URL=ecto://blazeneu:atlan1989@localhost/events_app
export SEND_GRID_API_KEY=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

mix deps.get --only prod
mix compile

CFGD=$(readlink -f /home/events-spa/.config/events)

if [ ! -d "$CFGD" ]; then
    mkdir -p "$CFGD"
fi

if [ ! -e "$CFGD/base" ]; then
    mix phx.gen.secret > "$CFGD/base"
fi

mix ecto.create
mix ecto.migrate

SECRET_KEY_BASE=$(cat "$CFGD/base")
export SECRET_KEY_BASE


mix release
