defmodule CompanyTest.Events.Event do
  use Ecto.Schema
  import Ecto.Changeset

  schema "events" do
    field :date, :string
    field :body, :string
    field :event_title, :string


    belongs_to :user, CompanyTest.Users.User
    has_many :comments, CompanyTest.Comments.Comment
    has_many :invites, CompanyTest.Invites.Invite

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, [:event_title, :date, :body, :user_id])
    |> validate_required([:event_title, :date, :body, :user_id])
  end
end
