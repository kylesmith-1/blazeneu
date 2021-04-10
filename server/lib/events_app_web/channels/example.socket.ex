defmodule CompanyTestWeb.ExampleChannel do
  require Logger
  use Phoenix.Channel
  def join("example", payload, socket) do
    {:ok, socket}
  end

  def handle_in("example:broadcast", payload, socket) do
    Logger.info ":: Example:Broadcast receive a message!::"
    broadcast! socket, "example:alert", payload
    {:noreply, %{yes: 1}, socket}
  end

end