defmodule CompanyTest.Notifications do
  require Logger
  @moduledoc """
  The Notifications context.
  """

  import Ecto.Query, warn: false
  alias CompanyTest.Repo

  alias CompanyTest.Notifications.Notification

  alias CompanyTest.Users
  alias CompanyTest.Companies

  @doc """
  Returns the list of notifications.

  ## Examples

      iex> list_notifications()
      [%Notification{}, ...]

  """
  def list_notifications do
    Repo.all(Notification)
  end

  @doc """
  Gets a single notification.

  Raises `Ecto.NoResultsError` if the Notification does not exist.

  ## Examples

      iex> get_notification!(123)
      %Notification{}

      iex> get_notification!(456)
      ** (Ecto.NoResultsError)

  """
  def get_notification!(id), do: Repo.get!(Notification, id)

  @doc """
  Creates a notification.

  ## Examples

      iex> create_notification(%{field: value})
      {:ok, %Notification{}}

      iex> create_notification(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_notification(attrs \\ %{}) do
    %Notification{}
    |> Notification.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a notification.

  ## Examples

      iex> update_notification(notification, %{field: new_value})
      {:ok, %Notification{}}

      iex> update_notification(notification, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_notification(%Notification{} = notification, attrs) do
    notification
    |> Notification.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a notification.

  ## Examples

      iex> delete_notification(notification)
      {:ok, %Notification{}}

      iex> delete_notification(notification)
      {:error, %Ecto.Changeset{}}

  """
  def delete_notification(%Notification{} = notification) do
    Repo.delete(notification)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking notification changes.

  ## Examples

      iex> change_notification(notification)
      %Ecto.Changeset{data: %Notification{}}

  """
  def change_notification(%Notification{} = notification, attrs \\ %{}) do
    Notification.changeset(notification, attrs)
  end

# Try curl with auth key
# then implement that here, should be able to find company!


  def send_emails(comp_id) do
    Logger.debug "Notifs this is the id #{inspect(comp_id)}"
    allNotifs = list_notifications()
    Logger.debug "All notifs: #{inspect(allNotifs)}"
    oneNotif = get_notification!(1).user_id
    Logger.debug "First notif user_id: #{inspect(oneNotif)}"
    Logger.debug "Type dealt with: #{inspect(IEx.Info.info(allNotifs))}"
    for notif <- allNotifs do
      usr = Users.get_user!(notif.user_id)
      cmpny = Companies.get_company!(notif.company_id)
      if (cmpny.id == comp_id) do
        email = usr.email
        company_name = cmpny.name
        
      end
      
      Logger.debug "Iterated email: #{inspect(email)}"
    end
  end
end
