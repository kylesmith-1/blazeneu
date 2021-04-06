defmodule CompanyTest.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :email, :string
    field :admin, :boolean
    field :password_hash, :string

    has_many :events, CompanyTest.Events.Event
    has_many :comments, CompanyTest.Comments.Comment

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    attrs = if attrs["password"] != "" do
      Map.put(attrs, "password_hash", Argon2.hash_pwd_salt(attrs["password"]))
    else
      attrs
    end

    user
    |> cast(attrs, [:name, :email, :admin, :password_hash])
    |> validate_required([:name, :email, :password_hash])
  end
end
