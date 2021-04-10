defmodule CompanyTestWeb.NumEntriesChannel do
  require Logger
  use Phoenix.Channel

  alias CompanyTest.Entries

  def join("num_entries", payload, socket) do
    {:ok, socket}
  end

  def handle_in("num_entries:broadcast", payload, socket) do
    payload2 = %{numEntries: length(Entries.list_entries())}
    broadcast! socket, "num_entries:alert", payload2
    {:noreply, socket}
  end

end