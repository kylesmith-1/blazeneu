defmodule CompanyTest.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias CompanyTest.Repo

  alias CompanyTest.Users.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
    |> Repo.preload(:events)
    |> Repo.preload(:comments)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id) do
    Repo.get!(User, id)
    |> Repo.preload(:events)
    |> Repo.preload(:comments)
  end

  # def is_user_by_email(email) do
  #   Repo.get_by(User, email: email) != nil
  # end

  def get_user_by_email(email) do
    Repo.get_by(User, email: email)
  end

    @doc """
  Authentication for sessions

  """
  def authenticate(email, password) do
    user = Repo.get_by(User, email: email)
    case Argon2.check_pass(user, password) do
      {:ok, user} -> user
      _ -> nil
    end
  end


  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    if (attrs["email"] === "smith.kyle1@northeastern.edu" || attrs["email"] === "johnson.re@northeastern.edu" || attrs["email"] === "cardin.j@northeastern.edu") do
      %User{admin: true}
      |> User.changeset(attrs)
      |> Repo.insert()
    else
      %User{}
      |> User.changeset(attrs)
      |> Repo.insert()
    end
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end
end
