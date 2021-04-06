defmodule CompanyTest.Repo.Migrations.CreateEntries do
  use Ecto.Migration

  def change do
    create table(:entries) do
      add :drug_test, :boolean, default: false, null: false
      add :continuous_drug_testing, :boolean, default: false, null: false
      add :additional_notes, :text
      add :verified, :boolean, default: false, null: false
      
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :company_id, references(:companies, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:entries, [:user_id])
    create index(:entries, [:company_id])
  end
end
