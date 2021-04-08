defmodule CompanyTest.Notifications.Notification do
  use Ecto.Schema
  import Ecto.Changeset

  schema "notifications" do

    belongs_to :user, CompanyTest.Users.User
    belongs_to :company, CompanyTest.Companies.Company

    timestamps()
  end

  @doc false
  def changeset(notification, attrs) do
    notification
    |> cast(attrs, [:user_id, :company_id])
    |> validate_required([:user_id, :company_id])
  end
end
