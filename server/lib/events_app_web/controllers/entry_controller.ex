defmodule CompanyTestWeb.EntryController do
  require Logger
  use CompanyTestWeb, :controller

  alias CompanyTest.Entries
  alias CompanyTest.Entries.Entry
  alias CompanyTest.Notifications

  action_fallback CompanyTestWeb.FallbackController

  def index(conn, _params) do
    entries = Entries.list_entries()
    render(conn, "index.json", entries: entries)
  end

  def create(conn, %{"entry" => entry_params}) do
    Logger.debug "Hello this is the create: #{inspect(entry_params)}"
    Logger.debug "Now this is the id #{inspect(entry_params["company_id"])}"
    # Notifications.send_emails(entry_params["company_id"])

    with {:ok, %Entry{} = entry} <- Entries.create_entry(entry_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.entry_path(conn, :show, entry))
      |> render("show.json", entry: entry)
    end
  end

  def show(conn, %{"id" => id}) do
    entry = Entries.get_entry!(id)
    render(conn, "show.json", entry: entry)
  end

  def update(conn, %{"id" => id, "entry" => entry_params}) do
    entry = Entries.get_entry!(id)

    with {:ok, %Entry{} = entry} <- Entries.update_entry(entry, entry_params) do
      render(conn, "show.json", entry: entry)
    end
  end

  def delete(conn, %{"id" => id}) do
    entry = Entries.get_entry!(id)

    with {:ok, %Entry{}} <- Entries.delete_entry(entry) do
      send_resp(conn, :no_content, "")
    end
  end
end
