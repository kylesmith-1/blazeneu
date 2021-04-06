defmodule CompanyTest.Entries.Entry do
  use Ecto.Schema
  import Ecto.Changeset

  schema "entries" do
    field :additional_notes, :string
    field :continuous_drug_testing, :boolean, default: false
    field :drug_test, :boolean, default: false
    field :verified, :boolean, default: false

    belongs_to :company, CompanyTest.Companies.Company
    belongs_to :user, CompanyTest.Users.User

    timestamps()
  end

  @doc false
  def changeset(entry, attrs) do
    entry
    |> cast(attrs, [:drug_test, :continuous_drug_testing, :additional_notes, :verified, :company_id, :user_id])
    |> validate_required([:drug_test, :verified, :company_id, :user_id])
  end
end
