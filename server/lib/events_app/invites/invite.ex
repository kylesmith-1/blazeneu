defmodule CompanyTest.Invites.Invite do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invites" do
    field :email, :string
    field :response, :string


    belongs_to :event, CompanyTest.Events.Event
    belongs_to :user, CompanyTest.Users.User

    timestamps()
  end

  @doc false
  def changeset(invite, attrs) do
    invite
    |> cast(attrs, [:email, :response, :event_id, :user_id])
    |> validate_required([:email, :response, :event_id])
  end
end
