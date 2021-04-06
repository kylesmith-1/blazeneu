defmodule CompanyTest.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string

    belongs_to :company, CompanyTest.Companies.Company
    belongs_to :user, CompanyTest.Users.User

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :company_id, :user_id])
    |> validate_required([:body,  :company_id, :user_id])
  end
end
